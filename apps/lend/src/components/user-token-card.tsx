import { formatter, useSelectedAssetWalletBalance } from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { formatEther } from "viem";

import Card from "./card";
import InfoButton from "./info-button";
import BorrowBtn from "./modals/borrow-button";
import RepayBtn from "./modals/repay-button";
import SupplyBtn from "./modals/supply-button";
import WithdrawBtn from "./modals/withdraw-button";

export default function UserTokenCard({
  asset,
  type,
}: {
  asset: any;
  type: "user-supply" | "user-borrow" | "supply" | "borrow";
}) {
  const originalToken = useSelectedAssetWalletBalance(
    asset.reserveData.address,
  );
  return (
    <Card
      key={asset.symbol}
      className="flex flex-col items-center justify-between gap-6 p-4 md:h-[86px] md:flex-row md:gap-4"
    >
      <div className="flex flex-shrink-0 items-center gap-4 ">
        <TokenIcon token={asset} fetch size="2xl" />
        <div>
          <div className="flex items-center gap-1 text-xs font-medium leading-tight text-muted-foreground">
            {type === "user-supply" && <>{asset.symbol} Supplied</>}
            {type === "user-borrow" && <>{asset.symbol} Debt</>}
            {type === "supply" && (
              <>
                <Icons.wallet className="relative h-3 w-3 rounded-lg" />
                Wallet Balance{" "}
              </>
            )}
            {type === "borrow" && <>{asset.symbol} Avaliable</>}
          </div>

          <div className="h-8 text-lg font-bold uppercase">
            {formatter.format(Number(asset.formattedBalance))}
          </div>
          <div className="text-xs font-medium leading-tight">
            $
            {formatter.format(
              Number(asset.formattedBalance) * asset.dollarValue,
            )}
          </div>
        </div>
      </div>

      {(type === "user-supply" || type === "supply") && (
        <div className="flex flex-shrink-0 flex-col">
          <div className="text-xs font-medium leading-5 text-muted-foreground">
            Supply APY
          </div>
          <div className="text-lg font-bold text-success-foreground">
            {(
              Number(formatEther(asset.reserveData.currentLiquidityRate)) * 100
            ).toFixed(2)}
            %
          </div>
        </div>
      )}

      {(type === "user-borrow" || type === "borrow") && (
        <div className="flex flex-shrink-0 flex-col">
          <div className="text-xs font-medium leading-5 text-muted-foreground">
            Stable APY
          </div>
          <div className="text-lg font-bold text-warning-foreground">
            {(
              Number(formatEther(asset.reserveData.currentStableBorrowRate)) *
              100
            ).toFixed(2)}
            %
          </div>
        </div>
      )}

      {(type === "user-borrow" || type === "borrow") && (
        <div className="flex flex-shrink-0 flex-col">
          <div className="text-xs font-medium leading-5 text-muted-foreground">
            Variable APY
          </div>
          <div className="text-lg font-bold text-warning-foreground">
            {(
              Number(formatEther(asset.reserveData.currentVariableBorrowRate)) *
              100
            ).toFixed(2)}
            %
          </div>
        </div>
      )}

      <div className="grow-1 flex w-full items-center gap-2 md:w-fit">
        {(type === "user-supply" || type === "supply") && (
          <SupplyBtn token={originalToken} />
        )}
        {type === "user-supply" && <WithdrawBtn token={asset} />}
        {(type === "user-borrow" || type === "borrow") && (
          <BorrowBtn token={asset} />
        )}
        {type === "user-borrow" && <RepayBtn token={asset} />}
        {(type === "borrow" || type === "supply") && (
          <InfoButton address={asset.address} />
        )}
      </div>
    </Card>
  );
}
