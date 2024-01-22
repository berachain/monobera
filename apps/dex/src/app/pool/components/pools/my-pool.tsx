import { useMemo } from "react";
import { type Pool } from "@bera/bera-router";
import { useBeraJs, usePollBgtRewards } from "@bera/berajs";
import { ConnectWalletBear, DataTable, NotFoundBear } from "@bera/shared-ui";

import { my_columns } from "~/components/pools-table-columns";
import { usePollUsersPools } from "~/hooks/usePollUsersPools";
import { PoolCard } from "./PoolCard";
import CardViewLoading from "./card-view-loading";
import TableViewLoading from "./table-view-loading";

export default function MyPool({
  isList,
  allPoolShowed,
}: {
  isList: boolean;
  allPoolShowed: boolean;
}) {
  const { isReady } = useBeraJs();

  const { data: myPools = [], isLoading: isMyPoolsLoading } =
    usePollUsersPools();
  const receivers = myPools?.map((pool: Pool) => pool.pool) || [];
  const { useBgtRewards } = usePollBgtRewards(receivers);
  const { data: bgtRewards } = useBgtRewards();

  const userPools = useMemo(() => {
    return (
      myPools
        .sort((a: any, b: any) => b.userBalance - a.userBalance)
        .filter((pool: any) => allPoolShowed || pool.userBalance > 0)
        .map((pool: any) => ({
          ...pool,
          bgtRewards:
            bgtRewards && bgtRewards[pool.pool] ? bgtRewards[pool.pool] : "0",
        })) ?? []
    );
  }, [myPools, bgtRewards, allPoolShowed]);

  return (
    <>
      {" "}
      {!isReady ? (
        <ConnectWalletBear
          message="You need to connect your wallet to see deposited pools and
        rewards"
        />
      ) : isMyPoolsLoading ? (
        <div className="flex w-full flex-col items-center justify-center gap-4">
          {isList ? <TableViewLoading /> : <CardViewLoading />}
        </div>
      ) : myPools === undefined || myPools.length === 0 ? (
        <NotFoundBear title="No Pools found." />
      ) : isList ? (
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <DataTable
            data={userPools}
            columns={my_columns}
            title={`My Pools (${myPools.length})`}
            onRowClick={(row) =>
              window.open(`/pool/${row.original.pool}`, "_self")
            }
          />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {userPools.map((pool: any) => {
              return (
                <PoolCard
                  pool={pool}
                  key={"search" + pool?.pool}
                  isUserData={true}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
