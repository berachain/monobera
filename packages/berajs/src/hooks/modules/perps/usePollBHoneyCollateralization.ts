import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { type Address } from "viem";
import { usePublicClient } from "wagmi";

import { BTOKEN_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { usePollBHoneySupply } from "./usePollBHoneySupply";
import { usePollHoneyVaultBalance } from "./usePollHoneyVaultBalance";

export const usePollBHoneyCollateralization = () => {
  const { useFormattedHoneyVaultBalance } = usePollHoneyVaultBalance();

  const { useFormattedBHoneySupply } = usePollBHoneySupply();
  const honeyLocked = useFormattedHoneyVaultBalance();
  const bHoneySupply = useFormattedBHoneySupply();
  const method = "bhoney_collateralization";
  const QUERY_KEY = [method, honeyLocked, bHoneySupply];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        if (honeyLocked !== 0 && bHoneySupply !== 0) {
          return Math.floor(honeyLocked / bHoneySupply) * 100 ?? 0;
        }
        return 0;
      } catch (e) {
        console.error(e);
        return 0;
      }
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useBHoneyCollateralization = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    useBHoneyCollateralization,
    isLoading,
  };
};
