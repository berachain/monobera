import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatEther, type Address } from "viem";
import { usePublicClient } from "wagmi";

import POLLING from "~/config/constants/polling";

export const usePollBeraBalance = ({
  address,
}: {
  address: string | undefined;
}) => {
  const publicClient = usePublicClient();
  const QUERY_KEY = [address, "beraBalance"];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (address) {
        try {
          const balance = await publicClient.getBalance({
            address: address as Address,
          });
          return Number(formatEther(balance));
        } catch (e) {
          console.error(e);
          return 0;
        }
      }

      return 0;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );
  const useBalance = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    isLoading,
    useBalance,
  };
};
