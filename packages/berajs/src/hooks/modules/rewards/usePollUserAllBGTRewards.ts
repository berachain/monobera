import useSWR from "swr";
import { usePublicClient } from "wagmi";

import { getAbsoluteUrl } from "~/utils/vercel-utils";
import { BGT_AGGREGATOR } from "~/config";
import { useBeraJs } from "~/contexts";
import { usePollUserPendingBgtRewards } from "../dex";

export const usePollUserAllBGTRewards = () => {
  const { usePoolsPendingBgtRewards } = usePollUserPendingBgtRewards(
    `${getAbsoluteUrl()}/api/getPools/api`,
  );
  const userPools = usePoolsPendingBgtRewards() ?? [];
  const addresses = userPools.map((pool: any) => pool.pool);
  const publicClient = usePublicClient();
  const { account } = useBeraJs();
  const QUERY_KEY = [account, "getAllRewards", ...addresses];
  return useSWR(
    QUERY_KEY,
    async () => {
      try {
        const result = await publicClient.readContract({
          abi: BGT_AGGREGATOR,
          address: "0x328f967af323E1654a7b64E279516819C5FF8471",
          functionName: "getAllRewards",
          args: [account, addresses],
        });
        return result;
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    {},
  );
};
