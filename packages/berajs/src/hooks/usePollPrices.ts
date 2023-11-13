import { dexUrl } from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { getAddress } from "viem";

// import { getAbsoluteUrl } from "~/utils/vercel-utils";

export const usePollPrices = () => {
  const QUERY_KEY = ["prices"];
  const { mutate } = useSWRConfig();
  const swrHook = useSWR(
    QUERY_KEY,
    async () => {
      // const absoluteUrl = getAbsoluteUrl();
      const res = await fetch(`${dexUrl}/api/getPrices/api`, {
        method: "GET",
        headers: {
          "x-vercel-protection-bypass": "MYVNWvYrBejFJnJqGyFNSM9OYua9wqE9",
        },
      });
      const data = await res.json();
      Object.keys(data).forEach((key) => {
        mutate([...QUERY_KEY, getAddress(key)], data[key]);
      });
      return data;
    },
    {
      refreshInterval: 5 * 60 * 1000, // 2 mins
    },
  );

  const usePrices = () => {
    return useSWRImmutable(QUERY_KEY);
  };

  const usePrice = (tokenAddress: string) => {
    return useSWRImmutable([...QUERY_KEY, getAddress(tokenAddress)]);
  };

  return {
    ...swrHook,
    refetch: () => void mutate(QUERY_KEY),
    usePrices,
    usePrice,
  };
};
