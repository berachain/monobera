import { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { getAddress } from "viem";

import { getAbsoluteUrl } from "~/utils/vercel-utils";

export const usePollPrices = () => {
  const QUERY_KEY = ["prices"];
  const { mutate } = useSWRConfig();
  const swrHook = useSWRImmutable(QUERY_KEY, async () => {
    const absoluteUrl = getAbsoluteUrl();
    const res = await fetch(`${absoluteUrl}/api/getPrices/api`, {
      method: "GET",
      headers: {
        "x-vercel-protection-bypass": process.env
          .VERCEL_AUTOMATION_BYPASS_SECRET as string,
      },
    });
    const data = await res.json();
    Object.keys(data).forEach((key) => {
      mutate([...QUERY_KEY, getAddress(key)], data[key]);
    });
    return data;
  });

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
