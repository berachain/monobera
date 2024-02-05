import { useState } from "react";
import useSWRInfinite from "swr/infinite";

import { type PoolV2, fetchPools } from "./fetchPools";

const DEFAULT_SIZE = 8;

export const usePoolTable = () => {
  const [search, setSearch] = useState("");
  const [hasBgtRewards, setHasBgtRewards] = useState(false);
  const [isNewPool, setIsNewPool] = useState(false);
  const [isHotPool, setIsHotPool] = useState(false);
  const [isList, setIsList] = useState(true);
  const [keyword, setKeyword] = useState("");
  const {
    data: allData,
    size: allDataSize,
    setSize: setAllDataSize,
    isLoading: isAllDataLoading,
  } = useSWRInfinite(
    (index) => ["search", index, hasBgtRewards, isHotPool, isNewPool, keyword],
    async (key: any[]) => {
      const page = key[1];
      try {
        // const res = await fetch(
        //   `${getAbsoluteUrl()}/api/getFilteredPools/api?page=${page}&perPage=${DEFAULT_SIZE}&hasBgtRewards=${hasBgtRewards}&hotPools=${isHotPool}&newPools=${isNewPool}&search=${search}&tvl=true&volume=false&bgtRewards=false`,
        //   {
        //     method: "GET",
        //     headers: {
        //       "x-vercel-protection-bypass": process.env
        //         .VERCEL_AUTOMATION_BYPASS_SECRET as string,
        //     },
        //   },
        // );
        const newPools = await fetchPools(page, DEFAULT_SIZE);

        // const jsonRes = await res.json();
        return newPools ?? [];
      } catch (e) {
        console.error(e);
        return [];
      }
    },
  );

  const isAllDataLoadingMore =
    isAllDataLoading ||
    (allDataSize > 0 &&
      allData &&
      typeof allData[allDataSize - 1] === "undefined");

  const isAllDataEmpty = allData?.[0]?.length === 0;

  const isAllDataReachingEnd =
    isAllDataEmpty ||
    (allData && (allData[allData.length - 1]?.length ?? 0) < DEFAULT_SIZE);

  const data = allData ? ([] as PoolV2[]).concat(...allData) : [];

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      setKeyword(search);
    }
  };
  return {
    data: data,
    isFirstLoad: isAllDataEmpty,
    allDataSize,
    setAllDataSize,
    isAllDataLoadingMore,
    isAllDataEmpty,
    isAllDataReachingEnd,
    search,
    setSearch,
    hasBgtRewards,
    setHasBgtRewards,
    isNewPool,
    setIsNewPool,
    isHotPool,
    setIsHotPool,
    isList,
    setIsList,
    handleEnter,
    setKeyword,
  };
};
