import { subgraphUrl } from "@bera/config";
import { getUniquePoolById } from "@bera/graphql";
import useSWR from "swr";

export const useFindPool = ({
  swapFee,
  tokenWeights,
}: {
  swapFee: string;
  tokenWeights: any[];
}) => {
  const id = getPoolId(swapFee, tokenWeights);
  const QUERY_KEY = ["useFindPool", id];

  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        const response = await fetch(subgraphUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ getUniquePoolById }),
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
    },
    {
      revalidateOnFocus: false,
    },
  );
};

const getPoolId = (swapFee: string, tokenWeights: any[]) => {
  const id = swapFee;
  tokenWeights
    .sort((a, b) => a.token.address.localeCompare(b.token.address))
    .map((token: any) => id.concat("-").concat(token.token.address));
};
