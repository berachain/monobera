import { Button } from "@bera/ui/button";
import useSWRInfinite from "swr/infinite";

import { getAbsoluteUrl } from "~/utils/vercel-utils";
import { PoolCard } from "./PoolCard";

const DEFAULT_SIZE = 3;

export const TrendingPools = () => {
  const {
    data: allData,
    size: allDataSize,
    setSize: setAllDataSize,
    isLoading: isAllDataLoading,
  } = useSWRInfinite(
    (index) => ["trending", index],
    async (key: any[]) => {
      const page = key[1] + 1;
      try {
        const res = await fetch(
          `${getAbsoluteUrl()}/pool/api?page=${page}&perPage=${DEFAULT_SIZE}&hasBgtRewards=true`,
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
  console.log(data);

  return (
    <div className="mt-[72px] w-full flex-col items-center justify-center">
      <div className="w-full text-center ">
        <p className="text-5xl font-extrabold">🚀 Trending Pools</p>
        <p className="text-lg font-semibold text-muted-foreground">
          Leverage our boosted yields to increase your rewards
        </p>
        <div className="mt-12 flex w-full flex-col items-center justify-center gap-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {data.map((pool: any) => {
              return <PoolCard pool={pool} key={pool?.pool + "trend"} addLp />;
            })}
          </div>
          <Button
            onClick={() => setAllDataSize(allDataSize + 1)}
            disabled={isAllDataLoadingMore || isAllDataReachingEnd}
            variant="outline"
          >
            {isAllDataLoadingMore
              ? "Loading..."
              : isAllDataReachingEnd
              ? "No more new pools"
              : "View More"}
          </Button>
        </div>
      </div>
    </div>
  );
};
