import { ethToBera } from "@bera/berajs";
import {
  client,
  getAllLiquidityChanged,
  getTypedLiquidityChanged,
  type LiquidityChanged,
} from "@bera/graphql";
import useSWRInfinite from "swr/infinite";
import { type Address } from "wagmi";

const DEFAULT_SIZE = 10;

export const usePoolEvents = (address: Address) => {
  const {
    data: allData,
    size: allDataSize,
    setSize: setAllDataSize,
    isLoading: isAllDataLoading,
  } = useSWRInfinite(
    (index) => ["allData", index, client],
    async (key: any[]) => {
      try {
        const page = key[1] + 1;
        const allLiquidityChanged: LiquidityChanged[] = await client
          .query({
            query: getAllLiquidityChanged,
            variables: {
              page: page,
              limit: DEFAULT_SIZE,
              poolDenom: ethToBera(address),
            },
          })
          .then((res: any) => {
            return res.data.liquidityChangeds;
          });

        return allLiquidityChanged;
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
    (index) => ["swapData", index],
    async (key: any[]) => {
      try {
        const page = key[1] + 1;
        const swapData: LiquidityChanged[] = await client
          .query({
            query: getTypedLiquidityChanged,
            variables: {
              page: page,
              limit: DEFAULT_SIZE,
              poolDenom: ethToBera(address),
              type: ["SWAP"],
            },
          })
          .then((res: any) => {
            return res.data.liquidityChangeds;
          });

        return swapData;
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
    (index) => ["provisionData", index],
    async (key: any[]) => {
      try {
        const page = key[1] + 1;
        const swapData: LiquidityChanged[] = await client
          .query({
            query: getTypedLiquidityChanged,
            variables: {
              page: page,
              limit: DEFAULT_SIZE,
              poolDenom: ethToBera(address),
              type: ["ADD", "REMOVE"],
            },
          })
          .then((res: any) => {
            return res.data.liquidityChangeds;
          });

        return swapData;
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
      ? ([] as LiquidityChanged[]).concat(...(allData as any))
      : [],
    allDataSize,
    setAllDataSize,
    isAllDataLoadingMore,
    isAllDataReachingEnd,
    swapData: swapData
      ? ([] as LiquidityChanged[]).concat(...(swapData as any))
      : [],
    swapDataSize,
    setSwapDataSize,
    isSwapDataLoadingMore,
    isSwapDataReachingEnd,
    provisionData: provisionData
      ? ([] as LiquidityChanged[]).concat(...(provisionData as any))
      : [],
    provisionDataSize,
    setProvisionDataSize,
    isProvisionDataLoadingMore,
    isProvisionDataReachingEnd,
  };
};
