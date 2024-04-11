import { usePollReservesDataList, type Token } from "@bera/berajs";
import { FormattedNumber, TokenIcon, Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { type Address } from "viem";
import AssetInfo from "./asset-info";
import { Card } from "@bera/ui/card";
import SupplyBtn from "./modals/supply-button";
import WithdrawBtn from "./modals/withdraw-button";

export default function UserTokenCard({
  token,
  deposited = false,
}: {
  token: Token;
  deposited?: boolean;
}) {
  const { useSelectedReserveData } = usePollReservesDataList();
  const reserve = useSelectedReserveData(token.address as Address);
  const balance = token.formattedBalance ?? "0";
  return (
    <Card key={reserve?.symbol} className="bg-muted p-4">
      <div className="flex flex-row items-center justify-between gap-6">
        <div className="flex flex-shrink-0 items-center gap-4 ">
          <TokenIcon address={reserve?.underlyingAsset} size="2xl" />
          <div>
            <div className="flex items-center gap-1 text-xs font-medium leading-tight text-muted-foreground">
              {deposited && "Deposited"}
              {!deposited && (
                <>
                  <Icons.wallet className="relative h-3 w-3 rounded-lg" />
                  Wallet Balance
                </>
              )}
            </div>

            <div className="flex h-8 items-center gap-1 text-lg font-bold uppercase">
              <FormattedNumber value={balance} symbol={reserve?.symbol} />
              <Tooltip>
                <AssetInfo asset={reserve} />
              </Tooltip>
            </div>
            <div className="text-xs font-medium leading-tight">
              <FormattedNumber
                symbol="USD"
                value={
                  Number(balance) *
                  Number(reserve.formattedPriceInMarketReferenceCurrency ?? "0")
                }
              />
            </div>
          </div>
        </div>

        <div className="grow-1 hidden w-full items-center gap-2 md:flex md:w-fit">
          <SupplyBtn reserve={reserve} />
          {deposited && <WithdrawBtn reserve={reserve} />}
        </div>
      </div>
      <div className="grow-1 mt-8 flex w-full items-center gap-2 md:hidden md:w-fit">
        <SupplyBtn reserve={reserve} />
        {deposited && <WithdrawBtn reserve={reserve} />}
      </div>
    </Card>
  );
}

export function UserTokenLoading() {
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
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-[128px]" />
        <Skeleton className="h-5 w-[92px]" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-[112px]" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  );
}
