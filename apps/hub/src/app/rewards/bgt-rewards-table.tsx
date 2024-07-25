import { TransactionActionType, useUserVaults } from "@bera/berajs";
import { DataTable, useTxn } from "@bera/shared-ui";

import { getUserBgtColumns } from "~/columns/user-bgt-columns";

export const BGTRewardsTable = () => {
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
    <div>
      {ModalPortal}
      <DataTable
        columns={getUserBgtColumns({
          isLoading: isClaimingRewardsLoading,
          write,
        })}
        data={userVaultInfo?.vaults ?? []}
        className="min-w-[700px] shadow"
        loading={isUserVaultInfoLoading}
      />
    </div>
  );
};
