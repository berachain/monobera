import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import { SWRInfiniteKeyLoader } from 'swr/infinite'

import { fetchPools, formatPoolData, type PoolV2 } from "./fetchPools";
import { chainId, crocIndexerEndpoint } from "@bera/config";

const DEFAULT_SIZE = 8;

export const usePoolTable = (sorting: any) => {
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  const [oldData, setOldData] = useState<any>(undefined);

   
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

const getKey: SWRInfiniteKeyLoader = (index, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null // reached the end

  console.log('ngmi', index)
  if(index === undefined || index === null || Number.isNaN(index)) {
    return null
  }
  const i = index + 1;
  console.log('ngmi2', i)
  return  `${crocIndexerEndpoint}/v2/pool_stats?chainId=0x${chainId.toString(
    16,
  )}&sortBy=${sortOption}.${sortOrder}&page=${i}&size=${DEFAULT_SIZE}`
}
 

  const {
    data,
    size,
    setSize,
    isLoading,
  } = useSWRInfinite(
    getKey,
    (url: string) => {
      try {
        setOldData(data === undefined ? undefined : data ?? []);

        return fetch(url).then((res) => res.json()).then((res) => res.data.pools.map((r: any) => formatPoolData(r)))
      } catch (e) {
        console.error(e);
        return [];
      }
    },
    {
      // fallbackData: oldData,
      persistSize: true,
    },
  );

  console.log(data, "allData")
  console.log(size, "allDataSize")

  const isLoadingMore =
    isLoading ||
    (size > 0 &&
      data &&
      typeof data[size - 1] === "undefined");

  const isDataEmpty = data?.[0]?.length === 0;

  const isDataReachingEnd =
  isDataEmpty ||
    (data && (data[data.length - 1]?.length ?? 0) < DEFAULT_SIZE);

  const concatData = data ? ([] as PoolV2[]).concat(...data) : [];

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      setKeyword(search);
    }
  };
  return {
    data: concatData,
    isFirstLoad: isDataEmpty,
    size,
    setSize,
    isLoadingMore,
    isDataEmpty,
    isDataReachingEnd,
    search,
    setSearch,
    handleEnter,
    keyword,
    setKeyword,
  };
};
