import {
  ActionButton,
  FormattedNumber,
  TokenIconList,
  useTxn,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Card, CardContent } from "@bera/ui/card";
import { useClaimableIncetives } from "~/hooks/useClaimableIncentives";
import { useTotalBgtRewards } from "~/hooks/useTotalBgtRewards";
import { Skeleton } from "@bera/ui/skeleton";
import { useClaimableFees } from "~/hooks/useClaimableFees";
import { TransactionActionType, BGT_STAKER_ABI } from "@bera/berajs";
import { bgtStaker } from "@bera/config";

export const GeneralInfo = () => {
  const gauges = [
    {
      title: "HONEY / bHONEY",
      bgt: 126.42,
    },
    {
      title: "BERA / ETH",
      bgt: 126.42,
    },
    {
      title: "HONEY / bHONEY",
      bgt: 126.42,
    },
  ];
  const incentives = [
    {
      title: "HONEY",
      amount: 126.42,
    },
    {
      title: "BERA",
      amount: 126.42,
    },
    {
      title: "HONEY",
      amount: 126.42,
    },
  ];

  const { data: totalBgtRewards, isLoading: isTotalBgtRewardsLoading } =
    useTotalBgtRewards();
  const { data: claimableIncentives, isLoading: isClaimableIncentivesLoading } =
    useClaimableIncetives();

  const {
    data: claimableFees,
    isLoading: isClaimableFeesLoading,
    refresh,
  } = useClaimableFees();
  const isDataReady =
    !isTotalBgtRewardsLoading &&
    !isClaimableIncentivesLoading &&
    !isClaimableFeesLoading;

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

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {ModalPortal}
      <Card className="relative w-full overflow-hidden rounded-md">
        <CardContent className="p-4">
          <div className="text-xs leading-[14px] text-muted-foreground">
            Claimable BGT
          </div>
          <div className="mt-2 flex items-center gap-1 text-3xl font-semibold leading-9">
            {isDataReady ? (
              <>
                <FormattedNumber
                  value={totalBgtRewards.totalBgtRewards}
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
          <div className="leading-4 text-muted-foreground mt-1">
            {isDataReady ? (
              <>
                $<FormattedNumber value={0} compact showIsSmallerThanMin />
              </>
            ) : (
              <Skeleton className="w-16 h-4" />
            )}
          </div>
          <div className="relative z-10 mt-6 flex flex-col gap-1">
            <div className="text-xs leading-5 text-muted-foreground">
              Gauges Earning you BGT:
            </div>
            {isDataReady &&
              gauges.map((gauge, index) => (
                <div
                  className="flex h-6 w-fit items-center gap-1 rounded-full border border-border bg-background px-2"
                  key={`gauge-${index}-${gauge}`}
                >
                  <Icons.honey className="h-4 w-4" />
                  <span className="text-xs">{gauge.title} </span>
                  <span className="text-[10px] text-muted-foreground">
                    BGT Earning: {gauge.bgt}
                  </span>
                </div>
              ))}
            {!isDataReady && (
              <>
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-32 h-4" />
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="relative w-full overflow-hidden rounded-md">
        <CardContent className="p-4">
          <div className="text-xs leading-[14px] text-muted-foreground">
            Claimable Incentives
          </div>
          <div className="mt-2 flex items-center gap-1 text-3xl font-semibold leading-9">
            {isDataReady ? (
              <>
                <FormattedNumber
                  value={claimableIncentives.honeyValue}
                  symbol="BGT"
                  compact
                  showIsSmallerThanMin
                />
              </>
            ) : (
              <Skeleton className="h-8 w-24" />
            )}{" "}
            <TokenIconList size="xl" tokenList={[]} />
          </div>
          <div className="leading-4 text-muted-foreground mt-1">
            {isDataReady ? (
              <>{claimableIncentives?.tokenList.length ?? 0} Tokens</>
            ) : (
              <Skeleton className="w-16 h-4" />
            )}
          </div>
          <div className="relative z-10 mt-6 flex flex-col gap-1">
            <div className="text-xs leading-5 text-muted-foreground">
              Incentives You’ve Earned:
            </div>
            {isDataReady &&
              incentives.map((incentive, index) => (
                <div
                  className="flex h-6 w-fit items-center gap-1 rounded-full border border-border bg-background px-2"
                  key={`incentive-${index}-${incentive}`}
                >
                  <Icons.bgt className="h-4 w-4" />
                  <span className="text-xs">{incentive.title} </span>
                  <span className="text-[10px] text-muted-foreground">
                    {incentive.amount}
                  </span>
                </div>
              ))}
            {!isDataReady && (
              <>
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-32 h-4" />
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="relative flex w-full gap-4 flex-col justify-between overflow-hidden rounded-md border">
        <CardContent className="flex flex-col justify-between h-full p-4">
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
                <Skeleton className="w-24 h-8" />
              )}
            </div>
            <div className="leading-4 text-muted-foreground mt-1">
              {isDataReady ? (
                <>
                  $
                  <FormattedNumber value={claimableFees} showIsSmallerThanMin />
                </>
              ) : (
                <Skeleton className="w-16 h-4" />
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
              className="relative z-10 flex w-full gap-1 mt-4"
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
