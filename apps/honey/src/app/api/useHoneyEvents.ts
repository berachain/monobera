import useSWRInfinite from "swr/infinite";

import { getAbsoluteUrl } from "~/utils/vercel-utils";

const DEFAULT_SIZE = 10;

export const useHoneyEvents = () => {
  const {
    data: allData,
    size: allDataSize,
    setSize: setAllDataSize,
    isLoading: isAllDataLoading,
  } = useSWRInfinite(
    (index) => ["allHoneyData", index],
    async (key: any[]) => {
      const page = key[1] ?? 0 + 1;
      try {
        const res = await fetch(
          `${getAbsoluteUrl()}/api?page=${page}&perPage=${DEFAULT_SIZE}&mint=true&burn=true`,
        );
        const jsonRes = await res.json();
        return jsonRes;
      } catch (e) {
        console.error(e);
      }
    },
  );

  const {
    data: mintData,
    size: mintDataSize,
    setSize: setMintDataSize,
    isLoading: isMintDataLoading,
  } = useSWRInfinite(
    (index) => ["mintData", index],
    async (key: any[]) => {
      const page = key[1] ?? 0 + 1;
      try {
        const res = await fetch(
          `${getAbsoluteUrl()}/api?page=${page}&perPage=${DEFAULT_SIZE}&mint=true&burn=false`,
        );
        const jsonRes = await res.json();
        return jsonRes;
      } catch (e) {
        console.error(e);
      }
    },
  );

  const {
    data: burnData,
    size: burnDataSize,
    setSize: setBurnDataSize,
    isLoading: isBurnDataLoading,
  } = useSWRInfinite(
    (index) => ["burnData", index],
    async (key: any[]) => {
      const page = key[1] ?? 0 + 1;
      try {
        const res = await fetch(
          `${getAbsoluteUrl()}/api?page=${page}&perPage=${DEFAULT_SIZE}&mint=false&burn=true`,
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
  const isMintDataLoadingMore =
    isMintDataLoading ||
    (mintDataSize > 0 &&
      mintData &&
      typeof mintData[mintDataSize - 1] === "undefined");
  const isBurnDataLoadingMore =
    isBurnDataLoading ||
    (burnDataSize > 0 &&
      burnData &&
      typeof burnData[burnDataSize - 1] === "undefined");

  const isAllDataEmpty = allData?.[0]?.length === 0;
  const isSwapDataEmpty = mintData?.[0]?.length === 0;
  const isBurnDataEmpty = burnData?.[0]?.length === 0;

  const isAllDataReachingEnd =
    isAllDataEmpty ||
    (allData && allData[allData.length - 1]?.length < DEFAULT_SIZE);
  const isMintDataReachingEnd =
    isSwapDataEmpty ||
    (mintData && mintData[mintData.length - 1]?.length < DEFAULT_SIZE);
  const isBurnDataReachingEnd =
    isBurnDataEmpty ||
    (burnData && burnData[burnData.length - 1]?.length < DEFAULT_SIZE);

  return {
    allData: allData ? [].concat(...allData) : [],
    allDataSize,
    setAllDataSize,
    isAllDataLoadingMore,
    isAllDataReachingEnd,
    mintData: mintData ? [].concat(...mintData) : [],
    mintDataSize,
    setMintDataSize,
    isMintDataLoadingMore,
    isMintDataReachingEnd,
    burnData: burnData ? [].concat(...burnData) : [],
    burnDataSize,
    setBurnDataSize,
    isBurnDataLoadingMore,
    isBurnDataReachingEnd,
  };
};
