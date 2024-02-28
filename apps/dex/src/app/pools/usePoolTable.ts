import { useState } from "react";
import useSWRInfinite from "swr/infinite";

import { type PoolV2, fetchPools } from "./fetchPools";

const DEFAULT_SIZE = 8;

export const usePoolTable = (sorting: any) => {
  const [search, setSearch] = useState("");
  const [hasBgtRewards, setHasBgtRewards] = useState(false);
  const [isNewPool, setIsNewPool] = useState(false);
  const [isHotPool, setIsHotPool] = useState(false);
  const [isList, setIsList] = useState(true);
  const [keyword, setKeyword] = useState("");

  const [oldData, setOldData] = useState<any>(undefined);
  const {
    data: allData,
    size: allDataSize,
    setSize: setAllDataSize,
    isLoading: isAllDataLoading,
  } = useSWRInfinite(
    (index) => [
      "search",
      index,
      hasBgtRewards,
      isHotPool,
      isNewPool,
      keyword,
      sorting,
    ],
    async (key: any[]) => {
      const page = key[1];
      console.log("am searching");
      try {
        setOldData(allData === undefined ? undefined : allData ?? []);
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

        const newPools = await fetchPools(
          page,
          DEFAULT_SIZE,
          sortOption,
          sortOrder,
        );

        return newPools ?? [];
      } catch (e) {
        console.error(e);
        return [];
      }
    },
    {
      fallbackData: oldData,
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

  console.log("allData", allData);
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
