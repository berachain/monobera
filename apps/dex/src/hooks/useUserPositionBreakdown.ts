import { POLLING } from "@bera/shared-ui/src/utils";
import useSWR from "swr";
import { type PoolV2 } from "~/app/pools/fetchPools";
import useSWRImmutable from "swr/immutable";
import { useBeraJs } from "@bera/berajs";
import { chainId, crocIndexerEndpoint } from "@bera/config";
import { toHex } from "viem";

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

export const useUserPositionBreakdown = (pool: PoolV2 | undefined) => {
  const { account } = useBeraJs();
  const hexChainId = toHex(chainId);
  const QUERY_KEY = [account, pool, hexChainId];
  useSWRImmutable(QUERY_KEY, async () => {
    if (!account || !pool) {
      return undefined;
    }
    try {
      const response = await fetch(
        `${crocIndexerEndpoint}/user_positions?chainId=${hexChainId}&user=${account}`,
      );
      const positions = await response.json();
      console.log({ positions, pool });

      const userPoolPosition: AmbientPosition | undefined = positions.data.find(
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
  });

  const usePositionBreakdown = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    usePosition,
  };
};
