import {
  useSelectedValidator,
  useTokenHoneyPrices,
  type Token,
} from "@bera/berajs";
import { FormattedNumber, Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { type Address } from "viem";

import { type ActiveIncentiveWithVault } from "~/types/validators";
import { getActiveIncentivesArray } from "./validator-pol-data";
import Uptime from "./charts/validator-uptime";

export const ValidatorDataCard = ({
  title,
  value,
  tooltipText,
  className,
}: {
  title: string;
  value: React.ReactNode;
  tooltipText?: string | undefined;
  className?: string;
}) => {
  return (
    <Card className={cn(className, "p-5")}>
      <div className="flex w-full items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-foreground">
        {title}
        {tooltipText && <Tooltip text={tooltipText} />}
      </div>
      <div className="mt-2 text-foreground">{value}</div>
    </Card>
  );
};

export const ValidatorOverview = ({
  validatorAddress,
}: {
  validatorAddress: Address;
}) => {
  const {
    data: validator,
    isLoading,
    isValidating,
  } = useSelectedValidator(validatorAddress);

  const activeIncentivesArray: ActiveIncentiveWithVault[] =
    getActiveIncentivesArray(validator);

  const activeIncentivesTokens = [
    ...new Set(activeIncentivesArray?.map((incentive) => incentive.token)),
  ];
  const { data: tokenHoneyPrices } = useTokenHoneyPrices({
    tokenAddresses: activeIncentivesTokens.map(
      (t: Token) => t.address,
    ) as Address[],
  });

  // const activeIncentivesValue: number = activeIncentivesArray?.reduce(
  //   (acc: number, ab: ActiveIncentiveWithVault) => {
  //     const tokenPrice = parseFloat(
  //       tokenHoneyPrices?.[ab.token.address] ?? "0",
  //     );
  //     return acc + ab.amountLeft * tokenPrice;
  //   },
  //   0,
  // );

  const returnPerBgt: number = activeIncentivesArray?.reduce(
    (acc: number, ab: ActiveIncentiveWithVault) => {
      const tokenPrice = parseFloat(
        tokenHoneyPrices?.[ab.token.address] ?? "0",
      );
      return acc + ab.incentiveRate * tokenPrice;
    },
    0,
  );

  return (
    <div className="flex flex-col mt-2 gap-2">
      <div className="text-muted-foreground text-sm justify-end flex">
        {/* TODO */}
        {"Binary Version: V9.41"}
      </div>
      <div className=" grid w-full grid-cols-1 gap-x-0 gap-y-4 md:grid-cols-2 md:gap-x-4 xl:grid-cols-4">
        <ValidatorDataCard
          className="h-[130px]"
          title="Validator Ranking"
          value={
            isLoading ? (
              <Skeleton className="h-[130px] w-[150px]" />
            ) : (
              <div className="flex flex-col items-start gap-1">
                <div className="relative flex w-full flex-row justify-between">
                  {/* TODO */}
                  <span className="text-2xl font-semibold">{"1 of 119"}</span>
                  <Icons.logo className="absolute right-0 h-16 w-16 self-center text-muted" />
                </div>

                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
                  {/* TODO */}
                  {"+14 from last month"}
                </span>
              </div>
            )
          }
        />
        <ValidatorDataCard
          className="h-[130px]"
          title="Block Signing"
          value={
            isLoading ? (
              <Skeleton className="h-[130px] w-[150px]" />
            ) : (
              <div className="flex flex-col items-start gap-1">
                <div className="relative flex w-full flex-row justify-between">
                  {/* TODO */}
                  <span className="text-2xl font-semibold">{"1 of 119"}</span>
                  <Icons.cube className="absolute right-0 h-16 w-16 self-center text-muted" />
                </div>

                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
                  {/* TODO */}
                  {"Signed: 10,000,127 / 10,000,023,399"}
                </span>
              </div>
            )
          }
        />
        <ValidatorDataCard
          className="h-[130px]"
          title="Avg Reward Rate (Per Block Proposal)"
          value={
            isLoading ? (
              <Skeleton className="h-[130px] w-[150px]" />
            ) : (
              <div className="flex flex-col items-start gap-1">
                <div className="relative flex w-full flex-row gap-1">
                  <FormattedNumber
                    value={validator?.rewardRate ?? 0}
                    className="text-2xl font-semibold"
                  />
                  <Icons.bgt className="h-6 w-6 self-center" />
                </div>

                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
                  {/* TODO */}
                  {"+2.5% from last month"}
                </span>
              </div>
            )
          }
        />
        <ValidatorDataCard
          className="h-[130px]"
          title="Est. Return per BGT"
          value={
            isLoading ? (
              <Skeleton className="h-[130px] w-[100px]" />
            ) : (
              <div className="flex flex-row gap-1 text-2xl font-semibold">
                $
                <FormattedNumber
                  value={returnPerBgt}
                  compact
                  showIsSmallerThanMin
                />
                <Icons.honey className="h-6 w-6 self-center" />
              </div>
            )
          }
        />
      </div>
      <Uptime address={validatorAddress} />
    </div>
  );
};
