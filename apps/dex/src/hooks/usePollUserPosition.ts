import { POLLING } from "@bera/shared-ui/src/utils";
import useSWR, { mutate } from "swr";
import { type PoolV2 } from "~/app/pools/fetchPools";
import useSWRImmutable from "swr/immutable";
import { getCrocErc20LpAddress, useBeraConfig, useBeraJs } from "@bera/berajs";
import { client, getTokenHoneyPrices } from "@bera/graphql";
import { chainId, crocIndexerEndpoint } from "@bera/config";
import { toHex } from "viem";
import { useCrocPoolSpotPrice } from "./useCrocPoolSpotPrice";
import { formatUnits } from "viem";
import { getAddress, parseUnits } from "viem";
import { type IUserPosition } from "./usePollUserDeposited";
import { erc20ABI, usePublicClient } from "wagmi";
import BigNumber from "bignumber.js";

interface AmbientPosition {
  ambientLiq: string;
  aprContributedLiq: string;
  aprDuration: number;
  aprEst: number;
  aprPostLiq: string;
  askTick: number;
  base: string;
  bidTick: number;
  chainId: string;
  concLiq: number;
  firstMintTx: string;
  isBid: boolean;
  lastMintTx: string;
  latestUpdateTime: number;
  liqRefreshTime: number;
  poolIdx: number;
  positionId: string;
  positionType: string;
  quote: string;
  rewardLiq: number;
  timeFirstMint: number;
  user: string;
}

export interface IUserAmbientPositon extends AmbientPosition {
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
      if (!account || !pool || !spotPrice) {
        return undefined;
      }
      try {
        const tokenHoneyPricesResult = client
          .query({
            query: getTokenHoneyPrices,
            variables: {
              id: [pool.base, pool.quote],
            },
          })
          .then((res) => {
            console.log(res);
            return res.data?.tokenHoneyPrices.reduce(
              (allPrices: any, price: any) => ({
                ...allPrices,
                [getAddress(price.id)]: price.price,
              }),
              {},
            );
          });

        const positionsResponse = fetch(
          `${crocIndexerEndpoint}/user_positions?chainId=${hexChainId}&user=${account}`,
        );

        const lpBalanceCall = publicClient.readContract({
          address: getCrocErc20LpAddress(pool.base, pool.quote) as any,
          abi: erc20ABI,
          functionName: "balanceOf",
          args: [account],
        });

        const [tokenHoneyPrices, positionsResult, lpBalance] =
          await Promise.all([
            tokenHoneyPricesResult,
            positionsResponse,
            lpBalanceCall,
          ]);

        const positions = await positionsResult.json();

        const userPoolPosition: AmbientPosition | undefined =
          positions.data.find(
            (pos: any) =>
              pos.base === pool.base &&
              pos.quote === pool.quote &&
              pos.chainId === hexChainId,
          );

        if (!userPoolPosition) {
          return undefined;
        }

        const sqrtPrice = new BigNumber(Math.sqrt(spotPrice));

        const liq = new BigNumber(lpBalance.toString());

        const baseAmount = liq.times(sqrtPrice);
        const quoteAmount = liq.div(sqrtPrice);

        const formattedBaseAmount = baseAmount.div(10 ** 18).toString();
        const formattedQuoteAmount = quoteAmount.div(10 ** 18).toString();

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
          ...userPoolPosition,
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
