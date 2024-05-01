import { useState } from "react";
import { chainId, crocIndexerEndpoint } from "@bera/config";
import { useInfiniteQuery } from "@tanstack/react-query";

import { PoolV2 } from "~/types";
import { formatPoolData } from "~/utils";

const DEFAULT_SIZE = 8;

export const usePoolTable = (sorting: any) => {
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

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
      queryKey: ["projects", sortOption, sortOrder, keyword],
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
          return {
            data: response.data.pools.map((r: any) =>
              formatPoolData(r),
            ) as any[],
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
      staleTime: 1000 * 60 * 5, // 5 mins
    });

  let concatData: PoolV2[] = [];
  let totalCount = undefined;

  data?.pages?.forEach((page: { data: PoolV2[]; totalCount: number }) => {
    if (!page.data) return;
    concatData = concatData.concat(page.data);
    totalCount = page.totalCount;
  });

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
