import useSWRInfinite from "swr/infinite";
import { type Address } from "wagmi";
import { getAbsoluteUrl } from "~/utils/vercel-utils";

const DEFAULT_SIZE = 10;

export const usePoolEvents = (address: Address) => {
    const { data: allData, size: allDataSize, setSize: setAllDataSize, isLoading: isAllDataLoading } = useSWRInfinite(
        (index) => ['allData',index],
        async (key: any[]) => {
          const page=key[1] + 1
          try {
            const res = await fetch(
                `${getAbsoluteUrl()}/pool/${address}/api?page=${page ?? 1}&perPage=${DEFAULT_SIZE}`,
              );
            const jsonRes = await res.json();
            return jsonRes
          } catch (e) {
            console.error(e);
          }
        }
      );

      const { data: swapData, size: swapDataSize, setSize: setSwapDataSize, isLoading: isSwapDataLoading } = useSWRInfinite(
        (index) => ['swapData',index],
        async (key: any[]) => {
            const page=key[1] + 1
          try {
            const res = await fetch(
                `${getAbsoluteUrl()}/pool/${address}/api?page=${page ?? 1}&perPage=${DEFAULT_SIZE}&swap`,
              );
            const jsonRes = await res.json();
            return jsonRes
          } catch (e) {
            console.error(e);
          }
        }
      );

      const { data: provisionData, size: provisionDataSize, setSize: setProvisionDataSize, isLoading: isProvisionDataLoading } = useSWRInfinite(
        (index) => ['provisionData',index],
        async (key: any[]) => {
            const page=key[1] + 1

          try {
            const res = await fetch(
                `${getAbsoluteUrl()}/pool/${address}/api?page=${page ?? 1}&perPage=${DEFAULT_SIZE}&provisions`,
              );
            const jsonRes = await res.json();
            return jsonRes
          } catch (e) {
            console.error(e);
          }
        }
      );

    const isAllDataLoadingMore = isAllDataLoading || (allDataSize > 0 && allData && typeof allData[allDataSize - 1] === "undefined");
    const isSwapDataLoadingMore = isSwapDataLoading || (swapDataSize > 0 && swapData && typeof swapData[swapDataSize - 1] === "undefined");
    const isProvisionDataLoadingMore = isProvisionDataLoading || (provisionDataSize > 0 && provisionData && typeof provisionData[provisionDataSize - 1] === "undefined");

    const isAllDataEmpty = allData?.[0]?.length === 0;
    const isSwapDataEmpty = swapData?.[0]?.length === 0;
    const isProvisionDataEmpty = provisionData?.[0]?.length === 0;

    const isAllDataReachingEnd = isAllDataEmpty || (allData && allData[allData.length - 1]?.length < DEFAULT_SIZE);
    const isSwapDataReachingEnd = isSwapDataEmpty || (swapData && swapData[swapData.length - 1]?.length < DEFAULT_SIZE);
    const isProvisionDataReachingEnd = isProvisionDataEmpty || (provisionData && provisionData[provisionData.length - 1]?.length < DEFAULT_SIZE);

    return {
        allData: allData ? [].concat(...allData) : [],
        allDataSize,
        setAllDataSize,
        isAllDataLoadingMore,
        isAllDataReachingEnd,
        swapData: swapData ? [].concat(...swapData) : [],
        swapDataSize,
        setSwapDataSize,
        isSwapDataLoadingMore,
        isSwapDataReachingEnd,
        provisionData:provisionData ? [].concat(...provisionData) : [],
        provisionDataSize,
        setProvisionDataSize,
        isProvisionDataLoadingMore,
        isProvisionDataReachingEnd
    }
}