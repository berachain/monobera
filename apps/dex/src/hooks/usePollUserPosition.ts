import { POLLING } from "@bera/shared-ui/src/utils";
import useSWR, { mutate } from "swr";
import { type PoolV2 } from "~/app/pools/fetchPools";
import useSWRImmutable from "swr/immutable";
import { useBeraJs } from "@bera/berajs";
import { chainId, crocIndexerEndpoint } from "@bera/config";
import { toHex } from "viem";
import { useCrocPoolSpotPrice } from "./useCrocPoolSpotPrice";
import { formatUnits } from "viem";

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
  baseAmount: bigint;
  quoteAmount: bigint;
  formattedBaseAmount: string;
  formattedQuoteAmount: string;
}
export const usePollUserPosition = (pool: PoolV2 | undefined) => {
  const { account } = useBeraJs();
  const hexChainId = toHex(chainId);
  const QUERY_KEY = [account, pool, hexChainId];
  useSWR(
    QUERY_KEY,
    async () => {
      if (!account || !pool) {
        return undefined;
      }
      try {
        const response = await fetch(
          `${crocIndexerEndpoint}/user_positions?chainId=${hexChainId}&user=${account}`,
        );
        const positions = await response.json();
        console.log({ positions, pool });

        const userPoolPosition: AmbientPosition | undefined =
          positions.data.find(
            (pos: any) =>
              pos.base === pool.base &&
              pos.quote === pool.quote &&
              pos.chainId === hexChainId,
          );

        return userPoolPosition;
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
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const usePositionBreakdown = () => {
    const { usePoolSpotPrice } = useCrocPoolSpotPrice(pool);
    const spotPrice = usePoolSpotPrice();
    const { data: position = undefined } = useSWRImmutable<
      AmbientPosition | undefined
    >(QUERY_KEY);
    const POSITION_QUERY_KEY = [position, spotPrice, ...QUERY_KEY];
    return useSWRImmutable<IUserPosition | undefined>(
      POSITION_QUERY_KEY,
      () => {
        if (!position || !spotPrice) {
          return undefined;
        }

        const sqrtPrice = Math.sqrt(spotPrice);

        // get pool price non display
        const liq = Number(position.ambientLiq);

        const baseAmount = BigInt(liq * sqrtPrice);
        const quoteAmount = BigInt(liq / sqrtPrice);

        const baseInfo = pool?.baseInfo;
        const quoteInfo = pool?.quoteInfo;
        return {
          baseAmount,
          quoteAmount,
          formattedBaseAmount: formatUnits(
            baseAmount,
            baseInfo?.decimals ?? 18,
          ),
          formattedQuoteAmount: formatUnits(
            quoteAmount,
            quoteInfo?.decimals ?? 18,
          ),
        };
      },
    );
  };
  return {
    usePosition,
    usePositionBreakdown,
    refresh: () => void mutate(QUERY_KEY),
  };
};
