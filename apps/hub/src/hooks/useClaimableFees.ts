import { useBeraJs } from "@bera/berajs";
import { getUserVaultsReward } from "@bera/berajs/actions";
import { bgtStaker } from "@bera/config";
import { POLLING } from "@bera/shared-ui";
import useSWR from "swr";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

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
