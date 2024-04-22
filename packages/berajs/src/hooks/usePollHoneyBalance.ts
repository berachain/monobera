import useSWR from "swr";
import { Address, formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { getHoneyBalance } from "~/actions/dex/getHoneyBalance";
import POLLING from "~/enum/polling";
import { DefaultHookProps, DefaultHookReturnType } from "~/types/global";
import { useBeraJs } from "../contexts";

interface IPollHoneyBalance
  extends DefaultHookProps<{ erc20HoneyAddress: Address }, false> {}

export interface UsePollHoneyBalancesResponse {
  balance: bigint;
  formattedBalance: string;
}

export const usePollHoneyBalance = ({
  opts,
  args: { erc20HoneyAddress },
}: IPollHoneyBalance): DefaultHookReturnType<UsePollHoneyBalancesResponse> => {
  const publicClient = usePublicClient();
  const { isConnected, account } = useBeraJs();
  const QUERY_KEY = [account, isConnected, "honeyBalance"];
  const swrResponse = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (!isConnected || !account) return undefined;
      if (!erc20HoneyAddress) return undefined;
      return getHoneyBalance({
        publicClient,
        args: { account, erc20HoneyAddress },
      });
    },
    { ...opts, refreshInterval: opts?.refreshInterval ?? POLLING.FAST },
  );

  return {
    ...swrResponse,
    balance: swrResponse.data ?? 0n,
    formattedBalance: formatUnits(swrResponse.data ?? 0n, 18),
  };
};
