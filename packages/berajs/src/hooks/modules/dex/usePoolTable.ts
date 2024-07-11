import { useEffect, useState } from "react";
import { multicallAddress } from "@bera/config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { erc20Abi } from "viem";
import { usePublicClient } from "wagmi";

import { useBeraJs } from "~/contexts";
import type { PoolV2 } from "~/types";
import { mapPoolsToPoolsV2 } from "~/utils";
import { dexClient, getFilteredPools } from "@bera/graphql";

const DEFAULT_SIZE = 8;
interface Call {
  abi: typeof erc20Abi;
  address: `0x${string}`;
  functionName: string;
  args: any[];
}
export const usePoolTable = (sorting: any) => {
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const { account } = useBeraJs();
  const publicClient = usePublicClient();

  const sortOption =
    sorting[0] !== undefined && sorting[0].id !== undefined
      ? sorting[0].id
      : "tvlUsd";
  const sortOrder =
    sorting[0] !== undefined && sorting[0].desc !== undefined
      ? sorting[0].desc === true
        ? "desc"
        : "asc"
      : "desc";

  const { data, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery<any, any, { pages: any[] }>({
      queryKey: ["projects", sortOption, sortOrder, keyword, publicClient],
      queryFn: async ({ pageParam = 1, queryKey }: any) => {
        try {
          const res = await dexClient.query({
            query: getFilteredPools,
            variables: {
              keyword: queryKey[3],
              skip: (pageParam - 1) * DEFAULT_SIZE,
              first: DEFAULT_SIZE,
              order: queryKey[1],
              orderDirection: queryKey[2],
            },
          });

          const data = mapPoolsToPoolsV2(res.data.pools);
          return {
            data,
          };
        } catch (e) {
          console.error(e);
          return {};
        }
      },
      initialPageParam: 1,
      getNextPageParam: (_lastPage, pages) => {
        return pages.length + 1;
      },
      placeholderData: (prev) => prev,
      staleTime: 1000 * 60 * 5, // 5 mins
    });

  const [processedData, setProcessedData] = useState<PoolV2[]>([]);

  useEffect(() => {
    let concatData: PoolV2[] = [];

    data?.pages?.forEach((page: { data: PoolV2[]; totalCount: number }) => {
      if (!page.data) return;
      concatData = concatData.concat(page.data);
    });

    if (account && publicClient && data) {
      const validData = concatData.filter(
        (item: PoolV2) => item.base && item.quote,
      );
      const call: Call[] = validData.map((item: PoolV2) => ({
        address: item.shareAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account],
      }));

      publicClient
        .multicall({
          contracts: call,
          multicallAddress: multicallAddress,
        })
        .then((result) => {
          const newProcessedData = validData.map(
            (item: PoolV2, index: number) => {
              return {
                ...item,
                isDeposited:
                  result[index].result &&
                  result[index].status === "success" &&
                  result[index].result !== 0n,
              };
            },
          ) as PoolV2[];
          setProcessedData(newProcessedData);
        });
    } else {
      setProcessedData(concatData);
    }
  }, [data, account]);

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      setKeyword(search);
    }
  };

  return {
    data: processedData,
    fetchNextPage,
    search,
    setSearch,
    isLoadingMore: isFetching || isFetchingNextPage,
    handleEnter,
    keyword,
    setKeyword,
  };
};
