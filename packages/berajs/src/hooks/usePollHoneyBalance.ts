import useSWR from "swr";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import { getHoneyBalance } from "~/actions/dex/getHoneyBalance";
import POLLING from "~/enum/polling";
import {
  DefaultHookProps,
  DefaultHookReturnType,
  TokenBalance,
} from "~/types/global";
import { useBeraJs } from "../contexts";

export interface PollHoneyBalanceRequest
  extends DefaultHookProps<{ erc20HoneyAddress: Address }> {}

export const usePollHoneyBalance = ({
  args: { erc20HoneyAddress },
  opts,
}: PollHoneyBalanceRequest): DefaultHookReturnType<
  TokenBalance | undefined
> => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();
  const QUERY_KEY = [account, "honeyBalance"];
  const swrResponse = useSWR<TokenBalance | undefined>(
    QUERY_KEY,
    async () => {
      if (!publicClient || !account) return undefined;

      return getHoneyBalance({
        publicClient,
        args: { account, erc20HoneyAddress },
      });
    },
    { ...opts, refreshInterval: opts?.refreshInterval ?? POLLING.NORMAL },
  );
  return swrResponse;
};
