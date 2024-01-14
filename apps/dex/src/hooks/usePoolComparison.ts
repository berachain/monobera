import { subgraphUrl } from "@bera/config";
import { getPoolNameTokensInfo } from "@bera/graphql";
import useSWR from "swr";

const fetcher = async (query: string) => {
  try {
    const response = await fetch(subgraphUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    if (response.ok && !data.errors) {
      return data.data.pools;
    } else {
      throw new Error(
        data.errors ? data.errors[0].message : "Error fetching data",
      );
    }
  } catch (error) {
    console.error("fetching error", error);
    throw error;
  }
};

export const usePoolComparison = () => {
  const { data, error } = useSWR(getPoolNameTokensInfo, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    pools: data,
    isLoading: !error && !data,
    isError: error,
  };
};
