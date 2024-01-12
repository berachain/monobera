import { useState } from "react";
import { type Pool } from "@bera/bera-router";
import { usePollUserDepositedPools } from "@bera/berajs";
import useSWRInfinite from "swr/infinite";

import { getAbsoluteUrl } from "~/utils/vercel-utils";

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
    (index) => ["search", hasBgtRewards, isHotPool, isNewPool, keyword],
    async (key: any[]) => {
      const page = key[1] + 1;
      try {
        const res = await fetch(
          `${getAbsoluteUrl()}/api/getFilteredPools/api?page=${page}&perPage=${DEFAULT_SIZE}&hasBgtRewards=${hasBgtRewards}&hotPools=${isHotPool}&newPools=${isNewPool}&search=${search}&tvl=true&volume=false&bgtRewards=false`,
          {
            method: "GET",
            headers: {
              "x-vercel-protection-bypass": process.env
                .VERCEL_AUTOMATION_BYPASS_SECRET as string,
            },
          },
        );
        const jsonRes = await res.json();
        return jsonRes;
      } catch (e) {
        console.error(e);
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
    (allData && allData[allData.length - 1]?.length < DEFAULT_SIZE);

  const data = allData ? [].concat(...allData) : [];

  const { useUserDepositedPools, isLoading } = usePollUserDepositedPools(
    `${getAbsoluteUrl()}/api/getPools/api`,
  );
  const userPools = useUserDepositedPools();
  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      setKeyword(search);
    }
  };
  return {
    data: data,
    userPools: userPools
      ?.filter((pool: Pool) => {
        return search === ""
          ? true
          : pool.poolName.toLowerCase().includes(search.toLowerCase()) ||
              (pool.poolShareDenomHex &&
                pool.poolShareDenomHex
                  .toLowerCase()
                  .includes(search.toLowerCase()));
      })
      .filter(
        (pool: Pool) =>
          (hasBgtRewards ? pool.tags?.includes("bgtRewards") : true) &&
          (isHotPool ? pool.tags?.includes("hot") : true) &&
          (isNewPool ? pool.tags?.includes("new") : true),
      ),
    isUserPoolsLoading: isLoading,
    isFirstLoad: isLoading && isAllDataEmpty,
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
