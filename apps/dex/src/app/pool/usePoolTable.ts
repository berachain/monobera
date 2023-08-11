import { useState } from "react";
import { type Pool } from "@bera/bera-router";
import { usePollUserDepositedPools } from "@bera/berajs";
import useSWRInfinite from "swr/infinite";

import { getAbsoluteUrl } from "~/utils/vercel-utils";

const DEFAULT_SIZE = 6;

export const usePoolTable = () => {
  const [search, setSearch] = useState("");
  const [hasBgtRewards, setHasBgtRewards] = useState(false);
  const [isNewPool, setIsNewPool] = useState(false);
  const [isHotPool, setIsHotPool] = useState(true);
  const [isList, setIsList] = useState(false);
  const {
    data: allData,
    size: allDataSize,
    setSize: setAllDataSize,
    isLoading: isAllDataLoading,
  } = useSWRInfinite(
    (index) => ["search", index, search, hasBgtRewards, isHotPool, isNewPool],
    async (key: any[]) => {
      const page = key[1] + 1;
      try {
        const res = await fetch(
          `${getAbsoluteUrl()}/pool/api?page=${page}&perPage=${DEFAULT_SIZE}&hasBgtRewards=${hasBgtRewards}&hotPools=${isHotPool}&newPools=${isNewPool}`,
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

  const { useUserDepositedPools } = usePollUserDepositedPools(
    `${getAbsoluteUrl()}/pool/api`,
  );
  const userPools = useUserDepositedPools();

  return {
    data: data?.filter((pool: Pool) => {
      return search === ""
        ? true
        : pool.poolName.toLowerCase().includes(search.toLowerCase()) ||
            (pool.poolShareDenomHex &&
              pool.poolShareDenomHex
                .toLowerCase()
                .includes(search.toLowerCase()));
    }),
    userPools: userPools?.filter((pool: Pool) => {
      return search === ""
        ? true
        : pool.poolName.toLowerCase().includes(search.toLowerCase()) ||
            (pool.poolShareDenomHex &&
              pool.poolShareDenomHex
                .toLowerCase()
                .includes(search.toLowerCase()));
    }),
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
  };
};
