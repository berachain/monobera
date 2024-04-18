import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import { getBeraBalance } from "~/actions/dex/getBeraBalance";
import POLLING from "~/enum/polling";
import { DefaultHookTypes } from "~/types/global";

export interface IUsePollBeraBalanceRequest extends DefaultHookTypes {
  args?: {
    address: Address | undefined;
  };
}

export interface IUsePollBeraBalanceResponse {
  isLoading: boolean;
  isValidating: boolean;
  useBalance: () => string | number;
}

export const usePollBeraBalance = ({
  args: { address } = { address: undefined },
  opts: { refreshInterval } = {
    refreshInterval: POLLING.FAST,
  },
}: IUsePollBeraBalanceRequest): IUsePollBeraBalanceResponse => {
  const publicClient = usePublicClient();
  const QUERY_KEY = [address, "beraBalance"];
  const { isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      return await getBeraBalance({ address, publicClient });
    },
    {
      refreshInterval,
    },
  );
  const useBalance = (): string | number => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    isLoading,
    isValidating,
    useBalance,
  };
};
