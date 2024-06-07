import React, { useMemo } from "react";
import { TransactionActionType, useUserVaults } from "@bera/berajs";
import { DataTable, useTxn } from "@bera/shared-ui";

import { getUserBgtColumns } from "~/columns/user-bgt-columns";

export default function UserGaugeWeightTable({
  myGauge = false,
  keywords = "",
}: {
  myGauge?: boolean;
  keywords?: string;
}) {
  const {
    data: userVaultInfo,
    isLoading: isUserVaultInfoLoading,
    isValidating: isUserVaultInfoValidating,
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

  const data = useMemo(() => {
    const vaults = userVaultInfo?.vaults ?? [];
    return vaults.filter((vaultInfo: any) => {
      if (keywords === "") return true;
      if (vaultInfo.name.includes(keywords)) return true;
      if (vaultInfo.product.includes(keywords)) return true;
      if (vaultInfo.vaultAddress.includes(keywords)) return true;
      return false;
    });
  }, [userVaultInfo, keywords]);

  return (
    <div className="w-full ">
      {ModalPortal}

      <DataTable
        columns={getUserBgtColumns({
          isLoading: isClaimingRewardsLoading,
          write,
        })}
        data={data}
        className="min-w-[1100px] shadow"
        validating={isUserVaultInfoValidating}
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
