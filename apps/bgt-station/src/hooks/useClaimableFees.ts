import { useBeraJs } from "@bera/berajs";
import { getUserVaultsReward } from "@bera/berajs/actions";
import { POLLING } from "@bera/shared-ui";
import { usePublicClient } from "wagmi";
import useSWR from "swr";
import { bgtStaker } from "@bera/config";
import { formatUnits } from "viem";

export const useClaimableFees = (): any => {
  const { account } = useBeraJs();
  const publicClient = usePublicClient();
  const QUERY_KEY = ["useClaimableFees", account, publicClient];
  const swrResponse = useSWR<string | undefined>(
    QUERY_KEY,
    async () => {
      if (!account) return undefined;
      const vaultReward = await getUserVaultsReward({
        account,
        vaultAddress: bgtStaker,
        publicClient,
      });
      return formatUnits(vaultReward, 18);
    },
    {
      refreshInterval: POLLING.SLOW * 2,
    },
  );
  return {
    ...swrResponse,
    refresh: () => swrResponse?.mutate?.(),
  };
};
