import { useEffect, useState } from "react";
import { useBeraJs, useUserPools } from "@bera/berajs";
import { ConnectWalletBear, DataTable, NotFoundBear } from "@bera/shared-ui";

import { my_columns } from "~/components/pools-table-columns";
import { getPoolUrl } from "../../fetchPools";
import TableViewLoading from "./table-view-loading";

export default function MyPool({ keyword }: { keyword: string }) {
  const { isReady } = useBeraJs();
  const { isLoading, data } = useUserPools({ keyword });

  const [hasLoaded, setHasLoaded] = useState<any>(false);
  const [userPools, setUserPools] = useState<any>(undefined);
  useEffect(() => {
    if (data) {
      setHasLoaded(true);
      setUserPools(data);
    }
  }, [data]);

  return (
    <>
      {" "}
      {!isReady ? (
        <ConnectWalletBear
          message="You need to connect your wallet to see deposited pools and
        rewards"
        />
      ) : isLoading && !hasLoaded ? (
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <TableViewLoading />
        </div>
      ) : userPools === undefined || userPools?.length === 0 ? (
        <NotFoundBear title="You currently are not staked in any pools." />
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <DataTable
            data={userPools}
            columns={my_columns}
            title={`My Pools (${userPools?.length ?? "0"})`}
            onRowClick={(row: any) => {
              if (!row?.original) return;
              window.open(getPoolUrl(row.original, true), "_self");
            }}
          />
        </div>
      )}
    </>
  );
}
