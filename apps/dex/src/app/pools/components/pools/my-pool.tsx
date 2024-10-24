import { useEffect, useState } from "react";
import { useBeraJs, useUserPools, usePollGauges } from "@bera/berajs";
import { ConnectWalletBear, DataTable, NotFoundBear } from "@bera/shared-ui";

import { getUserPoolColumns } from "~/components/pools-table-columns";
import { getPoolUrl } from "../../fetchPools";
import TableViewLoading from "./table-view-loading";

export default function MyPool({ keyword }: { keyword: string }) {
  const { isReady } = useBeraJs();
  const { isLoading, data, refresh } = useUserPools({ keyword });

  const [hasLoaded, setHasLoaded] = useState<any>(false);
  const [userPools, setUserPools] = useState<any>(undefined);
  const { gaugeDictionary } = usePollGauges({
    pageSize: 9999,
  });
  const [sorting, setSorting] = useState<any>([
    {
      id: "estimatedHoneyValue",
      desc: true,
    },
  ]);

  const handleNewSort = (newSort: any) => {
    if (newSort === sorting) return;
    setSorting(newSort);
  };

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
            columns={getUserPoolColumns(refresh, gaugeDictionary)}
            title={`My Pools (${userPools?.length ?? "0"})`}
            onRowClick={(row: any) => {
              if (!row?.original) return;
              window.open(getPoolUrl(row.original, true), "_self");
            }}
            onCustomSortingChange={(a: any) => handleNewSort(a)}
            additionalTableProps={{ state: { sorting } }}
          />
        </div>
      )}
    </>
  );
}
