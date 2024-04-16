import { PoolV2, getBeraLpAddress, useBeraJs } from "@bera/berajs";
import { chainId } from "@bera/config";
import { dexClient, getTokenHoneyPricesReq } from "@bera/graphql";
import { POLLING } from "@bera/shared-ui/src/utils";
import BigNumber from "bignumber.js";
import useSWR, { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { erc20Abi, getAddress, toHex } from "viem";
import { usePublicClient } from "wagmi";

import { useCrocPoolSpotPrice } from "./useCrocPoolSpotPrice";
import { type IUserPosition } from "./usePollUserDeposited";

interface IUserAmbientPositon {
  userPosition: IUserPosition | undefined;
}

export const usePollUserPosition = (pool: PoolV2 | undefined) => {
  const { account } = useBeraJs();
  const publicClient = usePublicClient();

  const hexChainId = toHex(chainId);
  const { usePoolSpotPrice } = useCrocPoolSpotPrice(pool);
  const spotPrice = usePoolSpotPrice();
  const QUERY_KEY = [account, pool, hexChainId, spotPrice];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (!account || !pool || !spotPrice) {
        return undefined;
      }
      try {
        const tokenHoneyPricesResult = dexClient
          .query({
            query: getTokenHoneyPricesReq,
            variables: {
              id: [pool.base, pool.quote],
            },
          })
          .then((res) => {
            if (process.env.NODE_ENV === "development") {
              console.log(res);
            }
            return res.data?.tokenHoneyPrices.reduce(
              (allPrices: any, price: any) => ({
                ...allPrices,
                [getAddress(price.id)]: price.price,
              }),
              {},
            );
          });

        const lpBalanceCall = publicClient.readContract({
          address: getBeraLpAddress({
            base: pool.base,
            quote: pool.quote,
          }) as any,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [account],
        });

        const [tokenHoneyPrices, lpBalance] = await Promise.all([
          tokenHoneyPricesResult,
          lpBalanceCall,
        ]);

        const sqrtPrice = new BigNumber(Math.sqrt(spotPrice));

        const liq = new BigNumber(lpBalance.toString());

        const baseAmount = liq.times(sqrtPrice);
        const quoteAmount = liq.div(sqrtPrice);

        const formattedBaseAmount = baseAmount
          .div(10 ** 18)
          .toString()
          .includes("e")
          ? "0"
          : baseAmount.div(10 ** 18).toString();
        const formattedQuoteAmount = quoteAmount
          .div(10 ** 18)
          .toString()
          .includes("e")
          ? "0"
          : quoteAmount.div(10 ** 18).toString();

        const estimatedHoneyValue =
          Number(tokenHoneyPrices[getAddress(pool.base)] ?? 0) *
            Number(formattedBaseAmount) +
          Number(tokenHoneyPrices[getAddress(pool.quote)] ?? 0) *
            Number(formattedQuoteAmount);

        const userPosition: IUserPosition = {
          baseAmount,
          quoteAmount,
          formattedBaseAmount,
          formattedQuoteAmount,
          estimatedHoneyValue,
          seeds: lpBalance,
        };
        return {
          userPosition,
        };
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const usePosition = () => {
    const { data = undefined } = useSWRImmutable<
      IUserAmbientPositon | undefined
    >(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    usePosition,
    refresh: () => void mutate(QUERY_KEY),
  };
};
