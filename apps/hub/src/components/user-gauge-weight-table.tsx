import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  TransactionActionType,
  useUserVaults,
  type UserVault,
} from "@bera/berajs";
import { DataTable, getRewardsVaultUrl, useTxn } from "@bera/shared-ui";

import { getUserBgtColumns } from "~/columns/user-bgt-columns";

export default function UserGaugeWeightTable({
  myGauge = false,
  keywords = "",
}: {
  myGauge?: boolean;
  keywords?: string;
}) {
  const router = useRouter();
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
    return vaults
      .filter((vaultInfo: UserVault) => {
        if (keywords === "") return true;
        if (vaultInfo.name.includes(keywords)) return true;
        if (vaultInfo.product.includes(keywords)) return true;
        if (vaultInfo.vaultAddress.includes(keywords)) return true;
        return false;
      })
      .sort(
        (a: UserVault, b: UserVault) =>
          Number(b.unclaimedBgt) - Number(a.unclaimedBgt),
      );
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
        className="shadow"
        validating={isUserVaultInfoValidating}
        loading={isUserVaultInfoLoading}
        onRowClick={(row: any) =>
          router.push(getRewardsVaultUrl(row.original.vaultAddress, myGauge))
        }
      />
    </div>
  );
}
