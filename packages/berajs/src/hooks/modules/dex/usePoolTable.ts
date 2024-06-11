import { useState } from "react";
import { chainId, crocIndexerEndpoint, multicallAddress } from "@bera/config";
import { useInfiniteQuery } from "@tanstack/react-query";

import type { PoolV2 } from "~/types";
import { formatPoolData, getBeraLpAddress } from "~/utils";
import { usePublicClient } from "wagmi";
import { useBeraJs } from "~/contexts";
import { erc20Abi } from "viem";

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
      : "tvl";
  const sortOrder =
    sorting[0] !== undefined && sorting[0].desc !== undefined
      ? sorting[0].desc === true
        ? "desc"
        : "asc"
      : "desc";

  const { data, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery<any, any, { pages: any[] }>({
      queryKey: [
        "projects",
        sortOption,
        sortOrder,
        keyword,
        publicClient,
      ],
      queryFn: async ({ pageParam = 1, queryKey }: any) => {
        try {
          const res = await fetch(
            `${crocIndexerEndpoint}/v2/pool_stats?chainId=0x${chainId.toString(
              16,
            )}&sortBy=${queryKey[1]}.${
              queryKey[2]
            }&page=${pageParam}&size=${DEFAULT_SIZE}&keyword=${queryKey[3]}`,
          );

          const response = await res.json();
          const data = response.data.pools.map((r: any) =>
            formatPoolData(r),
          ) as PoolV2[];

          return {
            data,
            totalCount: response.data.totalCount,
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

  let concatData: PoolV2[] = [];
  let totalCount = undefined;

  data?.pages?.forEach((page: { data: PoolV2[]; totalCount: number }) => {
    if (!page.data) return;
    concatData = concatData.concat(page.data);
    totalCount = page.totalCount;
  });

  if (account && publicClient && data) {
    const call: Call[] = concatData.map((item: PoolV2) => ({
      address: getBeraLpAddress(item.base, item.quote) as `0x${string}`,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [account],
    }));

    publicClient.multicall({
      contracts: call,
      multicallAddress: multicallAddress,
    }).then(result => {
      concatData = concatData.map((item: PoolV2, index: number) => {
        return {
          ...item,
          isDeposited:
            result[index].result &&
            result[index].status === "success" &&
            result[index].result !== 0n,
        };
      }) as PoolV2[];
    });

  }

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      setKeyword(search);
    }
  };

  const isReachingEnd = totalCount ? concatData.length >= totalCount : true;

  return {
    data: concatData,
    totalCount,
    fetchNextPage,
    isReachingEnd,
    search,
    setSearch,
    isLoadingMore: isFetching || isFetchingNextPage,
    handleEnter,
    keyword,
    setKeyword,
  };
};
