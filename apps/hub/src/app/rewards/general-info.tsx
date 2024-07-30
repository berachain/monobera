import { useEffect, useState } from "react";
import {
  BGT_STAKER_ABI,
  TransactionActionType,
  useTokenHoneyPrice,
  useUserVaults,
  type UserVault,
} from "@bera/berajs";
import { beraTokenAddress, bgtStaker } from "@bera/config";
import {
  ActionButton,
  FormattedNumber,
  GaugeIcon,
  TokenIconList,
  Tooltip,
  useTxn,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { useClaimableFees } from "~/hooks/useClaimableFees";
import { useClaimableIncetives } from "~/hooks/useClaimableIncentives";

// import { useClaimAllBgtCalldata } from "~/hooks/useClaimAllBgtCalldata";

export const GeneralInfo = () => {
  const { data: userVaultInfo, isLoading: isTotalBgtRewardsLoading } =
    useUserVaults();
  const { data: claimableIncentives, isLoading: isClaimableIncentivesLoading } =
    useClaimableIncetives();

  const { data: price } = useTokenHoneyPrice({
    tokenAddress: beraTokenAddress,
  });

  const {
    data: claimableFees,
    isLoading: isClaimableFeesLoading,
    refresh,
  } = useClaimableFees();
  // const isDataReady =
  //   !isTotalBgtRewardsLoading &&
  //   !isClaimableIncentivesLoading &&
  //   !isClaimableFeesLoading

  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    if (
      !isTotalBgtRewardsLoading &&
      !isClaimableIncentivesLoading &&
      !isClaimableFeesLoading &&
      !isDataReady
    ) {
      setIsDataReady(true);
    }
  }, [
    isTotalBgtRewardsLoading,
    isClaimableIncentivesLoading,
    isClaimableFeesLoading,
  ]);
  const {
    write,
    isLoading: isClaimingRewardsLoading,
    ModalPortal,
  } = useTxn({
    message: "Claiming Honey Fee Rewards",
    actionType: TransactionActionType.CLAIMING_REWARDS,
    onSuccess: () => {
      refresh();
    },
  });

  // const {
  //   write: claimAllBgtWrite,
  //   isLoading: isClaimAllBgtLoading,
  //   ModalPortal: ClaimAllBgtModalPortal,
  // } = useTxn({
  //   message: "Claiming all BGT Rewards",
  //   actionType: TransactionActionType.CLAIMING_REWARDS,
  //   // onSuccess: () => {
  //   //   refresh();
  //   // },
  // });

  // const claimAllBgtCalldata = useClaimAllBgtCalldata(userVaultInfo?.vaults.map((vault: any) => vault.vaultAddress) ?? [])
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {ModalPortal}
      {/* {ClaimAllBgtModalPortal} */}
      <Card className="relative w-full overflow-hidden rounded-md">
        <CardContent className="flex h-full flex-col justify-between p-4">
          <div>
            <div className="text-xs leading-[14px] text-muted-foreground">
              Claimable BGT
            </div>
            <div className="mt-2 flex items-center gap-1 text-3xl font-semibold leading-9">
              {isDataReady ? (
                <>
                  <FormattedNumber
                    value={userVaultInfo?.totalBgtRewards ?? "0"}
                    symbol="BGT"
                    compact
                    showIsSmallerThanMin
                  />
                  <Icons.bgt className="h-8 w-8" />
                </>
              ) : (
                <Skeleton className="h-8 w-24" />
              )}
            </div>
            <div className="mt-1 leading-4 text-muted-foreground">
              {isDataReady ? (
                <>
                  <FormattedNumber
                    value={
                      parseFloat(userVaultInfo?.totalBgtRewards ?? "0") *
                      parseFloat(price ?? "0")
                    }
                    symbol="USD"
                    compact
                    showIsSmallerThanMin
                  />
                </>
              ) : (
                <Skeleton className="h-4 w-16" />
              )}
            </div>
            <div className="relative z-10 mt-6 flex flex-col gap-1">
              <div className="text-xs leading-5 text-muted-foreground">
                Reward Vaults:
              </div>
              {isDataReady &&
                userVaultInfo?.vaults.map((gauge: UserVault, index: number) => (
                  <div
                    className="flex h-6 w-fit items-center gap-1 rounded-full border border-border bg-background px-2"
                    key={`gauge-${index}-${gauge}`}
                  >
                    <GaugeIcon
                      address={gauge.vaultAddress}
                      overrideImage={gauge.logoURI}
                      className="h-4 w-4"
                    />

                    <span className="text-xs">{gauge.name} </span>
                    <span className="text-[10px] text-muted-foreground">
                      BGT Earning:
                      <FormattedNumber
                        value={gauge.unclaimedBgt}
                        showIsSmallerThanMin
                        compact
                        symbol="BGT"
                      />
                    </span>
                  </div>
                ))}
              {!isDataReady && (
                <>
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                </>
              )}
            </div>
          </div>
          <ActionButton>
            <Tooltip
              text={"Claim all BGT rewards coming soon"}
              toolTipTrigger={
                <Button
                  // onClick={() => {
                  //   claimAllBgtWrite({
                  //     address: multicallAddress,
                  //     abi: multicall3Abi as any,
                  //     functionName: "aggregate",
                  //     params: [claimAllBgtCalldata],
                  //   });
                  // }}
                  className="relative z-10 mt-4 flex w-full gap-1"
                  disabled={true}
                >
                  <Icons.bgt className="h-6 w-6" />
                  Claim BGT
                </Button>
              }
            />
          </ActionButton>
        </CardContent>
      </Card>

      <Card className="relative w-full overflow-hidden rounded-md">
        <CardContent className="flex h-full flex-col justify-between p-4">
          <div>
            <div className="text-xs leading-[14px] text-muted-foreground">
              Claimable Incentives
            </div>
            <div className="mt-2 flex items-center gap-1 text-3xl font-semibold leading-9">
              {isDataReady ? (
                <>
                  <FormattedNumber
                    value={claimableIncentives.honeyValue}
                    symbol="USD"
                    compact
                    showIsSmallerThanMin
                  />
                </>
              ) : (
                <Skeleton className="h-8 w-24" />
              )}{" "}
              <TokenIconList size="xl" tokenList={[]} />
            </div>
            <div className="mt-1 leading-4 text-muted-foreground">
              {isDataReady ? (
                <>{claimableIncentives?.tokenList.length ?? 0} Tokens</>
              ) : (
                <Skeleton className="h-4 w-16" />
              )}
            </div>
            <div className="relative z-10 mt-6 flex flex-col gap-1">
              <div className="text-xs leading-5 text-muted-foreground">
                Incentives You’ve Earned:
              </div>
              {/* {isDataReady &&
              incentives.map((incentive, index) => ( */}
              <div
                className="flex h-6 w-fit items-center gap-1 rounded-full border border-border bg-background px-2 text-xs text-muted-foreground"
                // key={`incentive-${index}-${incentive}`}
              >
                {/* <Icons.bgt className="h-4 w-4" />
                  <span className="text-xs">{incentive.title} </span>
                  <span className="text-[10px] text-muted-foreground">
                    {incentive.amount}
                  </span> */}
                coming soon
              </div>
              {/* ))} */}
              {!isDataReady && (
                <>
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                </>
              )}
            </div>
          </div>
          <ActionButton>
            <Tooltip
              text={"Claiming incentives coming soon"}
              toolTipTrigger={
                <Button
                  className="relative z-10 mt-4 flex w-full gap-1"
                  disabled={true}
                >
                  Coming Soon
                </Button>
              }
            />
          </ActionButton>
        </CardContent>
      </Card>

      <Card className="relative flex w-full flex-col justify-between gap-4 overflow-hidden rounded-md border">
        <CardContent className="flex h-full flex-col justify-between p-4">
          <div>
            <div className="text-xs leading-[14px] text-muted-foreground">
              Claimable Fees
            </div>
            <div className="mt-2 flex items-center gap-1 text-3xl font-semibold leading-9">
              {isDataReady ? (
                <>
                  <FormattedNumber
                    value={claimableFees}
                    compact
                    showIsSmallerThanMin
                    symbol="HONEY"
                  />{" "}
                  <Icons.honey className="h-6 w-6" />
                </>
              ) : (
                <Skeleton className="h-8 w-24" />
              )}
            </div>
            <div className="mt-1 leading-4 text-muted-foreground">
              {isDataReady ? (
                <>
                  $
                  <FormattedNumber value={claimableFees} showIsSmallerThanMin />
                </>
              ) : (
                <Skeleton className="h-4 w-16" />
              )}
            </div>
          </div>
          <ActionButton>
            <Button
              onClick={() => {
                write({
                  address: bgtStaker,
                  abi: BGT_STAKER_ABI,
                  functionName: "getReward",
                  params: [],
                });
              }}
              className="relative z-10 mt-4 flex w-full gap-1"
              disabled={
                parseFloat(claimableFees) === 0 ||
                !claimableFees ||
                isClaimingRewardsLoading
              }
            >
              <Icons.honey className="h-6 w-6" />
              Claim Fees
            </Button>
          </ActionButton>
        </CardContent>
      </Card>
    </div>
  );
};
