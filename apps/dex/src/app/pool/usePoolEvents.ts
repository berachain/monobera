import { type PoolV2 } from "@bera/berajs";
import useSWRInfinite from "swr/infinite";

import { type IProvisions } from "~/hooks/usePoolRecentProvisions";
import { type ISwaps } from "~/hooks/usePoolRecentSwaps";

const DEFAULT_SIZE = 10;

export const usePoolEvents = ({
  pool,
  swaps,
  provisions,
  combinedEvents,
}: {
  pool: PoolV2 | undefined;
  swaps: ISwaps[] | undefined;
  provisions: IProvisions[] | undefined;
  combinedEvents: (ISwaps | IProvisions)[] | undefined;
}) => {
  const {
    data: allData,
    size: allDataSize,
    setSize: setAllDataSize,
    isLoading: isAllDataLoading,
  } = useSWRInfinite(
    (index) => ["allData", index, pool, combinedEvents],
    (key: any[]) => {
      try {
        const page = key[1];
        return combinedEvents?.slice(
          page * DEFAULT_SIZE,
          (page + 1) * DEFAULT_SIZE,
        );
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
  );

  const {
    data: swapData,
    size: swapDataSize,
    setSize: setSwapDataSize,
    isLoading: isSwapDataLoading,
  } = useSWRInfinite(
    (index) => ["swapData", index, swaps],
    (key: any[]) => {
      try {
        const page = key[1];
        return swaps?.slice(page * DEFAULT_SIZE, (page + 1) * DEFAULT_SIZE);
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
  );

  const {
    data: provisionData,
    size: provisionDataSize,
    setSize: setProvisionDataSize,
    isLoading: isProvisionDataLoading,
  } = useSWRInfinite(
    (index) => ["provisionData", index, provisions],
    (key: any[]) => {
      try {
        const page = key[1];
        return provisions?.slice(
          page * DEFAULT_SIZE,
          (page + 1) * DEFAULT_SIZE,
        );
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
  );

  const isAllDataLoadingMore =
    isAllDataLoading ||
    (allDataSize > 0 &&
      allData &&
      typeof allData[allDataSize - 1] === "undefined");
  const isSwapDataLoadingMore =
    isSwapDataLoading ||
    (swapDataSize > 0 &&
      swapData &&
      typeof swapData[swapDataSize - 1] === "undefined");
  const isProvisionDataLoadingMore =
    isProvisionDataLoading ||
    (provisionDataSize > 0 &&
      provisionData &&
      typeof provisionData[provisionDataSize - 1] === "undefined");

  const isAllDataEmpty = allData?.[0]?.length === 0;
  const isSwapDataEmpty = swapData?.[0]?.length === 0;
  const isProvisionDataEmpty = provisionData?.[0]?.length === 0;

  const isAllDataReachingEnd =
    isAllDataEmpty ||
    (allData && (allData[allData.length - 1]?.length ?? 0) < DEFAULT_SIZE);
  const isSwapDataReachingEnd =
    isSwapDataEmpty ||
    (swapData && (swapData[swapData.length - 1]?.length ?? 0) < DEFAULT_SIZE);
  const isProvisionDataReachingEnd =
    isProvisionDataEmpty ||
    (provisionData &&
      (provisionData[provisionData.length - 1]?.length ?? 0) < DEFAULT_SIZE);

  return {
    allData: allData
      ? ([] as (ISwaps | IProvisions)[]).concat(...(allData as any))
      : [],
    allDataSize,
    setAllDataSize,
    isAllDataLoadingMore,
    isAllDataReachingEnd,
    swapData: swapData ? ([] as ISwaps[]).concat(...(swapData as any)) : [],
    swapDataSize,
    setSwapDataSize,
    isSwapDataLoadingMore,
    isSwapDataReachingEnd,
    provisionData: provisionData
      ? ([] as IProvisions[]).concat(...(provisionData as any))
      : [],
    provisionDataSize,
    setProvisionDataSize,
    isProvisionDataLoadingMore,
    isProvisionDataReachingEnd,
  };
};
