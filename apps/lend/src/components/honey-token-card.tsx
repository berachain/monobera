import Link from "next/link";
import { formatter, useTokens, type Token } from "@bera/berajs";
import { blockExplorerUrl, honeyAddress } from "@bera/config";
import { TokenIcon } from "@bera/shared-ui";
import { BeraChart } from "@bera/ui/bera-chart";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { usePollReservesDataList } from "~/hooks/usePollReservesDataList";
import Card from "./card";
import InfoButton from "./info-button";
import BorrowBtn from "./modals/borrow-button";
import SupplyBtn from "./modals/supply-button";

export default function HoneyTokenCard() {
  const { useSelectedReserveData } = usePollReservesDataList();
  const { data: honey } = useSelectedReserveData(honeyAddress);
  const { tokenDictionary } = useTokens();

  return (
    <Card className="mt-6 flex flex-col justify-between gap-6 p-4 md:p-6 lg:flex-row lg:items-center">
      <div className="flex  flex-row justify-between md:flex-col md:gap-8">
        <div className="mb-0 flex items-center gap-2">
          {tokenDictionary && tokenDictionary[honeyAddress] ? (
            <TokenIcon token={tokenDictionary[honeyAddress]} size="2xl" />
          ) : (
            <Skeleton className="h-12 w-12 rounded-full" />
          )}
          <div>
            <div className="text-xs	font-medium leading-5">Honey StableCoin</div>
            <div className="flex items-center gap-1 text-2xl font-bold leading-8">
              HONEY{" "}
              <Link
                className="h-fit w-fit rounded-full border border-border bg-muted p-1 hover:cursor-pointer "
                href={`${blockExplorerUrl}/address/${honeyAddress}`}
                target="_blank"
              >
                <Icons.external className="relative h-4 w-4 text-muted-foreground" />
              </Link>
              <div className="h-fit w-fit rounded-full border border-border bg-muted p-1 hover:cursor-pointer ">
                <Icons.wallet className="relative h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
        {tokenDictionary && tokenDictionary[honeyAddress] ? (
          <div className="hidden h-fit w-fit items-center gap-2 lg:flex">
            <SupplyBtn token={tokenDictionary[honeyAddress] as Token} />
            <BorrowBtn
              token={tokenDictionary[honeyAddress] as Token}
              variant="outline"
            />
            <InfoButton address={honeyAddress} />
          </div>
        ) : (
          <div className="hidden gap-2 lg:flex">
            <Skeleton className="h-8 w-[76px]" />
            <Skeleton className="h-8 w-[76px]" />
            <Skeleton className="h-8 w-16" />
          </div>
        )}
        <div className="block md:hidden">
          <DonutChart percentage={Number(honey?.borrowUsageRatio) * 100} sm />
        </div>
      </div>

      <div className="flex w-full flex-row justify-between md:gap-6 lg:justify-end">
        <div className="flex flex-shrink-0 flex-col gap-4 pr-4 md:px-8">
          <div className="flex flex-col ">
            <div className="flex items-center text-xs leading-6 md:text-sm">
              Total Supply
            </div>
            {honey ? (
              <div className="text-2xl font-semibold leading-8">
                {formatter.format(Number(honey?.totalLiquidity))}
              </div>
            ) : (
              <Skeleton className="w-25 h-8" />
            )}
          </div>
          <div>
            <div className="flex items-center text-xs leading-6 md:text-sm">
              Supply APY
            </div>
            {honey ? (
              <div className="text-2xl font-semibold leading-8">
                {(Number(honey?.supplyAPY) * 100).toFixed(2)}%
              </div>
            ) : (
              <Skeleton className="w-25 h-8" />
            )}
          </div>
        </div>

        <div className=" flex w-full flex-col gap-4 border-l border-border pl-4 md:border-x md:px-8 lg:w-fit">
          <div className="flex gap-8">
            <div>
              <div className="flex items-center text-xs leading-6 md:text-sm">
                Total borrows
              </div>
              {honey ? (
                <div className="text-2xl font-semibold leading-8">
                  {formatter.format(Number(honey?.totalDebt))}
                </div>
              ) : (
                <Skeleton className="w-25 h-8" />
              )}
            </div>
            <div>
              <div className="flex items-center whitespace-nowrap text-xs leading-6 md:text-sm">
                Available to Borrow
              </div>
              {honey ? (
                <div className="text-2xl font-semibold leading-8">
                  {formatter.format(Number(honey?.formattedAvailableLiquidity))}
                </div>
              ) : (
                <Skeleton className="w-25 h-8" />
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center whitespace-nowrap text-xs leading-6 md:text-sm">
              Borrow APY (Variable)
            </div>
            {honey ? (
              <div className="text-2xl font-semibold leading-8">
                {(Number(honey?.variableBorrowAPY) * 100).toFixed(2)}%
              </div>
            ) : (
              <Skeleton className="w-25 h-8" />
            )}
          </div>
        </div>

        <div className="hidden items-center md:flex">
          <DonutChart percentage={Number(honey?.borrowUsageRatio) * 100} />
        </div>
      </div>

      {tokenDictionary && tokenDictionary[honeyAddress] && (
        <div className="flex h-fit w-full items-center gap-2 lg:hidden ">
          <SupplyBtn token={tokenDictionary[honeyAddress] as Token} />
          <BorrowBtn
            token={tokenDictionary[honeyAddress] as Token}
            variant="outline"
          />
          <InfoButton address={honeyAddress} />
        </div>
      )}
    </Card>
  );
}

function DonutChart({
  percentage = 0,
  sm,
}: {
  percentage: number;
  sm?: boolean;
}) {
  const color = "rgba(251, 191, 36, 1)";
  const bgColor = "rgba(251, 191, 36, 0.2)";
  const data = {
    labels: ["Red", "Blue"],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, bgColor],
        borderColor: [color, bgColor],
        borderWidth: 0,
      },
    ],
  };

  const Options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: sm ? 28 : 48,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="relative h-[68px] w-[68px] md:h-[112px] md:w-[112px]">
      <div className="absolute top-[15px] w-full text-center md:top-[30px] ">
        <div className="text-[8px] font-medium leading-5 text-foreground md:text-xs ">
          Pool Usage
        </div>
        <div className="text-[12px] font-semibold leading-4  text-accent md:text-xl md:leading-7">
          {percentage ? percentage.toFixed(2) : 0}%
        </div>
      </div>
      <BeraChart data={data} type="doughnut" options={Options as any} />
    </div>
  );
}
