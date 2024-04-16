import { decodeCrocPrice } from "@bera/beracrocswap";
import { BEX_QUERY_ABI, getBeraLpAddress, useBeraJs } from "@bera/berajs";
import {
  chainId,
  crocIndexerEndpoint,
  crocQueryAddress,
  multicallAddress,
} from "@bera/config";
import {
  dexClient,
  getTokenHoneyPricesReq,
  searchFilteredPoolList,
} from "@bera/graphql";
import { useAnalytics } from "@bera/shared-ui";
import { BigNumber } from "bignumber.js";
import { BigNumber as EthersBigNumber } from "ethers";
import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { Address, erc20Abi, getAddress, toHex } from "viem";
import { usePublicClient } from "wagmi";

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

export interface IUserPosition {
  baseAmount: BigNumber;
  quoteAmount: BigNumber;
  formattedBaseAmount: string;
  formattedQuoteAmount: string;
  estimatedHoneyValue: number;
  seeds: bigint;
}

export interface IUserPool extends PoolV2 {
  userPosition: IUserPosition | undefined;
}
interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}
export const usePollUserDeposited = (
  { keyword }: { keyword: string } = { keyword: "" },
) => {
  const { account } = useBeraJs();
  const publicClient = usePublicClient();
  const { captureException } = useAnalytics();
  const hexChainId = toHex(chainId);
  const QUERY_KEY = ["pools", account, hexChainId, keyword];
  const { isLoading, isValidating, data } = useSWRImmutable(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (!account || !hexChainId) {
        return undefined;
      }
      try {
        const response = await fetch(
          `${crocIndexerEndpoint}/user_positions?chainId=${hexChainId}&user=${account}`,
        );
        const positions = await response.json();

        const baseTokenAddresses: string[] = [];
        const quoteTokenAddresses: string[] = [];

        for (const pool of positions.data) {
          baseTokenAddresses.push(pool.base);
          quoteTokenAddresses.push(pool.quote);
        }

        const uniqueTokenAddresses = Array.from(
          new Set([...baseTokenAddresses, ...quoteTokenAddresses]),
        );

        const tokenHoneyPricesResult = dexClient
          .query({
            query: getTokenHoneyPricesReq,
            variables: {
              id: uniqueTokenAddresses,
            },
          })
          .then((res: any) => {
            return res.data?.tokenHoneyPrices.reduce(
              (allPrices: any, price: any) => ({
                ...allPrices,
                [getAddress(price.id)]: price.price,
              }),
              {},
            );
          });

        const calls: Call[] = positions.data.map((pool: AmbientPosition) => {
          return {
            abi: BEX_QUERY_ABI,
            address: crocQueryAddress,
            functionName: "queryPrice",
            args: [pool.base, pool.quote, pool.poolIdx],
          };
        });

        // get price of all pools so that we can calculate estimated user postions
        const result = publicClient.multicall({
          contracts: calls,
          multicallAddress: multicallAddress,
        });

        const balanceCalls: Call[] = positions.data.map(
          (pool: AmbientPosition) => {
            return {
              abi: erc20Abi,
              address: getBeraLpAddress({
                base: pool.base as Address,
                quote: pool.quote as Address,
              }),
              functionName: "balanceOf",
              args: [account],
            };
          },
        );

        const balanceResult = publicClient.multicall({
          contracts: balanceCalls,
          multicallAddress: multicallAddress,
        });

        // // get pool objects for pools user deposited for
        const poolsResult = dexClient
          .query({
            query: searchFilteredPoolList,
            variables: {
              baseAssets: baseTokenAddresses,
              quoteAssets: quoteTokenAddresses,
              keyword,
            },
          })
          .then((res: any) => {
            if (res.error) {
              console.log(res.error);
              return undefined;
            }
            return res.data.pools;
          })
          .catch((e) => {
            captureException(e);
          });

        const [poolPrices, pools, tokenHoneyPrices, lpBalances] =
          await Promise.all([
            result,
            poolsResult,
            tokenHoneyPricesResult,
            balanceResult,
          ]);

        const userPositions: IUserPool[] = [];
        positions.data.forEach((position: AmbientPosition, i: number) => {
          const poolPrice = poolPrices[i]?.result;
          const pool: PoolV2 | undefined = pools.find((p: PoolV2) => {
            return (
              p.base.toLowerCase() === position.base.toLowerCase() &&
              p.quote.toLowerCase() === position.quote.toLowerCase()
            );
          });
          if (!pool || !poolPrice) {
            return;
          }
          const formattedPool = formatSubgraphPoolData(pool);
          const decodedSpotPrice = decodeCrocPrice(
            EthersBigNumber.from(poolPrice.toString()),
          );

          const sqrtPrice = Math.sqrt(decodedSpotPrice);
          const liq = new BigNumber((lpBalances[i]?.result as any).toString());

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
            seeds: BigInt(0),
          };

          userPositions.push({
            ...formattedPool,
            userPosition,
          });
        });
        return userPositions.filter(
          (p: IUserPool) =>
            p.userPosition?.formattedBaseAmount !== "0" &&
            p.userPosition?.formattedQuoteAmount !== "0",
        ) as IUserPool[];
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
  );

  const usePositions = () => {
    const { data = undefined } = useSWRImmutable<IUserPool[] | undefined>(
      QUERY_KEY,
    );
    return data;
  };

  const useIsPoolDeposited = (pool: PoolV2 | undefined) => {
    const { data = undefined } = useSWRImmutable<IUserPool[] | undefined>(
      QUERY_KEY,
    );
    if (!data || data.some((p) => !p) || !pool) {
      return false;
    }

    return data.some(
      (p: IUserPool) =>
        p.base.toLowerCase() === pool.base.toLowerCase() &&
        p.quote.toLowerCase() === pool.quote.toLowerCase() &&
        p.userPosition?.formattedBaseAmount !== "0" &&
        p.userPosition?.formattedQuoteAmount !== "0",
    );
  };
  return {
    usePositions,
    useIsPoolDeposited,
    isLoading: isLoading || isValidating,
    refresh: () => void mutate(QUERY_KEY),
    data,
  };
};
