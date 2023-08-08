import useSWRInfinite from "swr/infinite";
import { Address } from "wagmi";
import { getAbsoluteUrl } from "~/utils/vercel-utils";

const DEFAULT_SIZE = 10;

export const usePoolEvents = (address: Address) => {
    const { data: allData, size: allDataSize, setSize: setAllDataSize, isLoading: isAllDataLoading } = useSWRInfinite(
        (index) => ['allData',index + 1],
        async (key: any[]) => {
            const page=key[1]

          try {
            console.log('PROV12312312132432`41ISIONS',`${getAbsoluteUrl()}/pool/${address}/api?page=${page ?? 1}&perPage=${DEFAULT_SIZE}`)
            const res = await fetch(
                `${getAbsoluteUrl()}/pool/${address}/api?page=${page[0] ?? 1}&perPage=${DEFAULT_SIZE}`,
              );
            const jsonRes = await res.json();
            console.log('alldataResq', jsonRes)
            return jsonRes
          } catch (e) {
            console.error(e);
          }
        }
      );

      const { data: swapData, size: swapDataSize, setSize: setSwapDataSize, isLoading: isSwapDataLoading } = useSWRInfinite(
        (index) => ['swapData',index + 1],
        async (key: any[]) => {
            const page=key[1]
          try {
            console.log( 'PROVI22332SIONS',               `${getAbsoluteUrl()}/pool/${address}/api?page=${page ?? 1}&perPage=${DEFAULT_SIZE}&swap`            )
            const res = await fetch(
                `${getAbsoluteUrl()}/pool/${address}/api?page=${page[0] ?? 1}&perPage=${DEFAULT_SIZE}&swap`,
              );
            const jsonRes = await res.json();
            console.log('swapdataResq', jsonRes)
            return jsonRes
          } catch (e) {
            console.error(e);
          }
        }
      );

      const { data: provisionData, size: provisionDataSize, setSize: setProvisionDataSize, isLoading: isProvisionDataLoading } = useSWRInfinite(
        (index) => ['provisionData',index + 1],
        async (key: any[]) => {
            const page=key[1]

          try {
            console.log('PROVISIONS', `${getAbsoluteUrl()}/pool/${address}/api?page=${page ?? 1}&perPage=${DEFAULT_SIZE}&provisions`)
            const res = await fetch(
                `${getAbsoluteUrl()}/pool/${address}/api?page=${page[0] ?? 1}&perPage=${DEFAULT_SIZE}&provisions`,
              );
            const jsonRes = await res.json();
            console.log('provdataResq', jsonRes)
            return jsonRes
          } catch (e) {
            console.error(e);
          }
        }
      );

    console.log('allData', allData)
    return {
        allData: allData ? [].concat(...allData) : [],
        allDataSize,
        setAllDataSize,
        isAllDataLoading,
        swapData: swapData ? [].concat(...swapData) : [],
        swapDataSize,
        setSwapDataSize,
        isSwapDataLoading,
        provisionData:provisionData ? [].concat(...provisionData) : [],
        provisionDataSize,
        setProvisionDataSize,
        isProvisionDataLoading
    }
}