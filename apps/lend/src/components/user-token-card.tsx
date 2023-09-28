import Image from "next/image";
import { useTokens } from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

import { type Asset } from "~/utils/types";
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
  asset: Asset;
  type: "user-supply" | "user-borrow" | "supply" | "borrow";
}) {
  const { tokenDictionary } = useTokens();
  return (
    <Card
      key={asset.symbol}
      className="flex flex-col items-center justify-between gap-6 p-4 md:h-[86px] md:flex-row md:gap-4"
    >
      <div className="flex flex-shrink-0 items-center gap-4 ">
        {tokenDictionary ? (
          <TokenIcon
            toke={tokenDictionary[asset.asset_address]}
            address={asset.asset_address}
            fetch
            size="2xl"
          />
        ) : (
          <div>loading</div>
        )}
        <div>
          {type === "supply" && (
            <div className="flex items-center gap-1 text-xs font-medium leading-tight text-foreground">
              <Icons.wallet className="relative h-3 w-3 rounded-lg" />
              Wallet Balance
            </div>
          )}
          <div className="h-8 text-lg font-bold uppercase">
            ?? {asset.symbol}
          </div>
          <div className="text-xs font-medium leading-tight">$??</div>
        </div>
      </div>

      {(type === "user-supply" || type === "supply") && (
        <div className="flex flex-shrink-0 flex-col">
          <div className="text-xs font-medium leading-5 text-foreground">
            Supply APY
          </div>
          <div className="text-lg font-bold text-success-foreground">
            {(asset.supplyStableAPR * 100).toFixed(2)}%
          </div>
        </div>
      )}

      {(type === "user-borrow" || type === "borrow") && (
        <div className="flex flex-shrink-0 flex-col">
          <div className="text-xs font-medium leading-5 text-foreground">
            Stable APY
          </div>
          <div className="text-lg font-bold text-warning-foreground">
            {asset.borrowStableAPR ? (
              <>{(asset.borrowStableAPR * 100).toFixed(2)}%</>
            ) : (
              "~~"
            )}
          </div>
        </div>
      )}

      {(type === "user-borrow" || type === "borrow") && (
        <div className="flex flex-shrink-0 flex-col">
          <div className="text-xs font-medium leading-5 text-foreground">
            Variable APY
          </div>
          <div className="text-lg font-bold text-warning-foreground">
            {asset.borrowVariableAPR ? (
              <>{(asset.borrowVariableAPR * 100).toFixed(2)}%</>
            ) : (
              "~~"
            )}
          </div>
        </div>
      )}

      <div className="grow-1 flex w-full items-center gap-2 md:w-fit">
        {(type === "user-supply" || type === "supply") && (
          <SupplyBtn asset={asset} />
        )}
        {type === "user-supply" && <WithdrawBtn asset={asset} />}
        {(type === "user-borrow" || type === "borrow") && (
          <BorrowBtn asset={asset} />
        )}
        {type === "user-borrow" && <RepayBtn asset={asset} />}
        {(type === "borrow" || type === "supply") && (
          <InfoButton address={asset.asset_address} />
        )}
      </div>
    </Card>
  );
}
