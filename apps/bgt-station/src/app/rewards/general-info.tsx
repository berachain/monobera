import { FormattedNumber, TokenIconList } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Card, CardContent } from "@bera/ui/card";
import { useClaimableIncetives } from "~/hooks/useClaimableIncentives";
import { useTotalBgtRewards } from "~/hooks/useTotalBgtRewards";
import { Skeleton } from "@bera/ui/skeleton";

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

  console.log(totalBgtRewards, claimableIncentives);
  const isDataReady =
    !isTotalBgtRewardsLoading && !isClaimableIncentivesLoading;
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
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
              <Skeleton className="h-8 w-8" />
            )}
          </div>
          <div className="leading-4 text-muted-foreground">
            $<FormattedNumber value={0} compact showIsSmallerThanMin />
          </div>
          <div className="relative z-10 mt-6 flex flex-col gap-1">
            <div className="text-xs leading-5 text-muted-foreground">
              Gauges Earning you BGT:
            </div>
            {gauges.map((gauge, index) => (
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
              <Skeleton className="h-8 w-8" />
            )}{" "}
            <TokenIconList size="xl" tokenList={[]} />
          </div>
          <div className="leading-4 text-muted-foreground">
            {claimableIncentives?.tokenList.length ?? 0} Tokens
          </div>
          <div className="relative z-10 mt-6 flex flex-col gap-1">
            <div className="text-xs leading-5 text-muted-foreground">
              Incentives You’ve Earned:
            </div>
            {incentives.map((incentive, index) => (
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
              420.69K HONEY <Icons.honey className="h-6 w-6" />
            </div>
            <div className="leading-4 text-muted-foreground">$420.96</div>
          </div>
          <Button className="relative z-10 flex w-full gap-1 mt-4" disabled>
            <Icons.honey className="h-6 w-6" />
            Coming soon
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
