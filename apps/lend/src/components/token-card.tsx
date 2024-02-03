import { formatUsd, formatter } from "@bera/berajs";
import { TokenIcon, Tooltip } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";

import InfoButton from "~/components/info-button";
import Card from "./card";
import SupplyBtn from "./modals/supply-button";

export default function TokenCard({ reserveData }: { reserveData: any }) {
  return (
    <Card className="div-4 flex flex-col items-center justify-between gap-6 p-4 xl:flex-row">
      <div className="flex w-full flex-col justify-between gap-2 xl:flex-row xl:justify-start xl:gap-6">
        <div className="mb-5 flex w-[250px] items-center gap-4 xl:mb-0">
          <TokenIcon address={reserveData.token.address} fetch size="2xl" />
          <div>
            <div className="text-xs	font-medium leading-5 text-muted-foreground">
              {reserveData.token?.name}
              <Tooltip
                text={
                  "The data values below showcase the total assets supplied and their respective USD values."
                }
              />
            </div>
            <div className="text-lg font-bold leading-[22px]">
              {formatter.format(reserveData.totalLiquidity)}{" "}
              {reserveData.token?.symbol}
            </div>
            <div className=" text-xs font-medium leading-5">
              {formatUsd(
                Number(reserveData.totalLiquidity) *
                  Number(reserveData.formattedPriceInMarketReferenceCurrency),
              )}{" "}
            </div>
          </div>
        </div>

        <div className="flex justify-between xl:w-[150px] xl:flex-col xl:justify-center">
          <div className="flex items-center text-xs font-medium leading-5 text-muted-foreground">
            Supply APY
          </div>
          <div className="font-bold text-success-foreground xl:text-lg">
            {(Number(reserveData.supplyAPY) * 100).toFixed(2)}%
          </div>
        </div>

        <div className="flex justify-between text-muted-foreground xl:w-[150px] xl:flex-col xl:justify-center">
          <div className="flex items-center text-xs font-medium leading-5">
            Variable Borrow APY
          </div>
          <div className="font-bold xl:text-lg">
            ~~
            {/* {(Number(formatEther(reserveData.variableBorrowAPY)) * 100).toFixed(
              2,
            )}
            % */}
          </div>
        </div>
        <div className="flex justify-between text-muted-foreground xl:w-[150px] xl:flex-col xl:justify-center">
          <div className="flex items-center text-xs font-medium leading-5">
            Total borrows
          </div>
          <div className="font-bold xl:text-lg">
            ~~
            {/* {formatter.format(Number(reserveData.totalDebt))} */}
          </div>
        </div>
      </div>

      <div className="flex w-full items-center gap-2 xl:w-fit">
        <SupplyBtn token={reserveData.token} />
        <InfoButton address={reserveData.underlyingAsset} />
      </div>
    </Card>
  );
}

export function TokenLoading() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border px-6 py-4">
      <div className=" flex gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-[92px]" />
          <Skeleton className="h-5 w-[128px]" />
          <Skeleton className="h-3 w-[92px]" />
        </div>
      </div>
      <div className="hidden flex-col gap-1 sm:flex">
        <Skeleton className="h-3 w-[128px]" />
        <Skeleton className="h-5 w-[92px]" />
      </div>
      <div className="hidden flex-col gap-1 xl:flex ">
        <Skeleton className="h-3 w-[128px]" />
        <Skeleton className="h-5 w-[92px]" />
      </div>
      <div className="hidden flex-col gap-1 lg:flex">
        <Skeleton className="h-3 w-[128px]" />
        <Skeleton className="h-5 w-[92px]" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="xs:block hidden h-8 w-20" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="xs:block hidden h-8 w-8" />
      </div>
    </div>
  );
}
