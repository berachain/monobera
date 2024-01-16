import {
  client,
  getMints,
  getMintsAndRedemptions,
  getRedemptions,
  type HoneyMint,
  type HoneyRedemption,
} from "@bera/graphql";
import useSWRInfinite from "swr/infinite";

const DEFAULT_SIZE = 10;

export const useHoneyEvents = () => {
  const {
    data: allData,
    size: allDataSize,
    setSize: setAllDataSize,
    isLoading: isAllDataLoadingMore,
  } = useSWRInfinite(
    (index) => ["allData", index],
    (key: any[]) => {
      const page = key[1];
      return client
        .query({
          query: getMintsAndRedemptions,
          variables: { page: page * DEFAULT_SIZE, limit: DEFAULT_SIZE },
        })
        .then((res: any) => [
          ...res.data.honeyMints,
          ...res.data.honeyRedemptions,
        ])
        .catch((e: any) => console.error(e));
    },
    { refreshInterval: 1800000 },
  );

  const {
    data: mintData,
    size: mintDataSize,
    setSize: setMintDataSize,
    isLoading: isMintDataLoading,
  } = useSWRInfinite(
    (index) => ["mintData", index],
    (key: any[]) => {
      const page = key[1];
      return client
        .query({
          query: getMints,
          variables: { page: page * DEFAULT_SIZE, limit: DEFAULT_SIZE },
        })
        .then((res: any) => res.data.honeyMints)
        .catch((e: any) => console.error(e));
    },
    { refreshInterval: 1800000 },
  );

  const {
    data: redemptionData,
    size: redemptionDataSize,
    setSize: setRedemptionDataSize,
    isLoading: isRedemptionDataLoading,
  } = useSWRInfinite(
    (index) => ["redeemData", index],
    async (key: any[]) => {
      const page = key[1];
      return client
        .query({
          query: getRedemptions,
          variables: { page: page * DEFAULT_SIZE, limit: DEFAULT_SIZE },
        })
        .then((res: any) => res.data.honeyRedemptions)
        .catch((e: any) => console.error(e));
    },
    { refreshInterval: 1800000 },
  );

  const isMintDataLoadingMore =
    isMintDataLoading ||
    (mintDataSize > 0 &&
      mintData &&
      typeof mintData[mintDataSize - 1] === "undefined");

  const isRedemptionDataLoadingMore =
    isRedemptionDataLoading ||
    (redemptionDataSize > 0 &&
      redemptionData &&
      typeof redemptionData[redemptionDataSize - 1] === "undefined");

  const isMintDataEmpty = mintData?.[0]?.length === 0;

  const isRedemptionDataEmpty = redemptionData?.[0]?.length === 0;

  const isMintDataReachingEnd =
    isMintDataEmpty ||
    (mintData && (mintData[mintData.length - 1]?.length ?? 0) < DEFAULT_SIZE);
  const isRedemptionDataReachingEnd =
    isRedemptionDataEmpty ||
    (redemptionData &&
      (redemptionData[redemptionData.length - 1]?.length ?? 0) < DEFAULT_SIZE);

  const isAllDataReachingEnd =
    isMintDataReachingEnd && isRedemptionDataReachingEnd;

  return {
    allData: allData
      ?.flat()
      .sort((a: any, b: any) => Number(b.timestamp) - Number(a.timestamp))
      .slice(0, allDataSize * DEFAULT_SIZE) as HoneyMint[] | HoneyRedemption[],
    allDataSize,
    setAllDataSize,
    isAllDataLoadingMore,
    isAllDataReachingEnd,

    mintData: mintData?.flat() as HoneyMint[],
    mintDataSize,
    setMintDataSize,
    isMintDataLoadingMore,
    isMintDataReachingEnd,

    redemptionData: redemptionData?.flat() as HoneyRedemption[],
    redemptionDataSize,
    setRedemptionDataSize,
    isRedemptionDataLoadingMore,
    isRedemptionDataReachingEnd,
  };
};
