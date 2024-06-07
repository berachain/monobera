import React from "react";
import { TransactionActionType, useUserVaults } from "@bera/berajs";
import { DataTable, useTxn } from "@bera/shared-ui";
import { getUserBgtColumns } from "~/columns/user-bgt-columns";
export default function UserGaugeWeightTable({
  myGauge = false,
}: {
  myGauge?: boolean;
}) {
  const {
    data: userVaultInfo,
    isLoading: isUserVaultInfoLoading,
    refresh,
  } = useUserVaults();

  const {
    write,
    isLoading: isClaimingRewardsLoading,
    ModalPortal,
  } = useTxn({
    message: "Claiming BGT Rewards",
    actionType: TransactionActionType.CLAIMING_REWARDS,
    onSuccess: () => {
      refresh();
    },
  });

  return (
    <div className="w-full ">
      {ModalPortal}

      <DataTable
        columns={getUserBgtColumns({
          isLoading: isClaimingRewardsLoading,
          write,
        })}
        data={userVaultInfo?.vaults ?? []}
        className="min-w-[1100px] shadow"
        loading={isUserVaultInfoLoading}
        onRowClick={(row: any) =>
          window.open(
            `/gauge/${row.original.vaultAddress}${myGauge ? "?my-gauge" : ""}`,
            "_self",
          )
        }
      />
    </div>
  );
}
