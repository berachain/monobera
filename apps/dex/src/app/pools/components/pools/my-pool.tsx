import { useEffect, useState } from "react";
import { useBeraJs } from "@bera/berajs";
import { ConnectWalletBear, DataTable, NotFoundBear } from "@bera/shared-ui";

import { my_columns } from "~/components/pools-table-columns";
import { usePollUserDeposited } from "~/hooks/usePollUserDeposited";
import { getPoolUrl } from "../../fetchPools";
import TableViewLoading from "./table-view-loading";

export default function MyPool({
  keyword,
}: {
  keyword: string;
}) {
  const { isReady } = useBeraJs();
  const { isLoading, data } = usePollUserDeposited({ keyword });

  const [userPools, setUserPools] = useState<any>(undefined);
  useEffect(() => {
    if (data) {
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
      ) : isLoading && (userPools === undefined || userPools.length === 0) ? (
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <TableViewLoading />
        </div>
      ) : (userPools === undefined || userPools.length === 0) && !isLoading ? (
        <NotFoundBear title="No Pools found." />
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <DataTable
            data={userPools}
            columns={my_columns}
            title={`My Pools (${userPools?.length ?? "0"})`}
            onRowClick={(row: any) => {
              window.open(getPoolUrl(row.original, true), "_self");
            }}
          />
        </div>
      )}
    </>
  );
}
