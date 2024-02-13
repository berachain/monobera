import { useState } from "react";
import { TRADING_ABI, TransactionActionType } from "@bera/berajs";
import { useOctTxn } from "@bera/shared-ui/src/hooks";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Skeleton } from "@bera/ui/skeleton";
import { parseUnits } from "ethers";
import { mutate } from "swr";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import { formatBigIntUsd } from "~/utils/formatBigIntUsd";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import { ActivePositionPNL } from "../berpetuals/components/columns";
import { type IMarketOrder } from "../berpetuals/components/order-history";
import { TPSL } from "../berpetuals/components/tpsl";

export function UpdatePositionModal({
  trigger,
  openPosition,
  className = "",
}: {
  trigger: any;
  type: "market" | "limit";
  disabled?: boolean;
  openPosition: IMarketOrder;
  className?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [tp, setTp] = useState<string>(
    formatUnits(BigInt(openPosition?.tp) ?? 0n, 10),
  );
  const [sl, setSl] = useState<string>(
    formatUnits(BigInt(openPosition?.sl) ?? 0n, 10),
  );
  const { QUERY_KEY } = usePollOpenPositions();

  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(
    Number(openPosition?.market?.pair_index ?? 0),
  );

  const positionSize =
    Number(formatUnits(BigInt(openPosition?.position_size ?? 0), 18)) *
    Number(openPosition.leverage);
  const openPrice = Number(
    formatUnits(BigInt(openPosition?.open_price ?? 0), 10),
  );
  const size = positionSize / openPrice;

  const ticker = openPosition?.market?.name?.split("-")[0];

  const { isLoading: isUpdateTPLoading, write: updateTpWrite } = useOctTxn({
    message: "Updating Take Profit Price",
    actionType: TransactionActionType.EDIT_PERPS_ORDER,
    onSuccess: () => {
      void mutate(QUERY_KEY);
    },
  });

  const { isLoading: isUpdateSLLoading, write: updateSlWrite } = useOctTxn({
    message: "Updating Stop Loss Price",
    actionType: TransactionActionType.EDIT_PERPS_ORDER,
    onSuccess: () => {
      void mutate(QUERY_KEY);
    },
  });

  // const formattedPrice = Number(
  //   formatUnits(BigInt(openPosition?.open_price ?? 0n), 10),
  // );

  // const liqPrice = useCalculateLiqPrice({
  //   bfLong: openPosition?.market.pair_borrowing_fee?.bf_long,
  //   bfShort: openPosition?.market.pair_borrowing_fee?.bf_short,
  //   orderType: openPosition?.buy === true ? "long" : "short",
  //   price: formattedPrice,
  //   leverage: openPosition?.leverage,
  // });

  const updateTpParams = [
    openPosition?.market?.pair_index,
    openPosition?.index,
    parseUnits(tp, 10),
  ];

  const updateSlParams = [
    openPosition?.market?.pair_index,
    openPosition?.index,
    parseUnits(sl, 10),
  ];

  return (
    <div className={className}>
      <div onClick={() => setOpen(true)} className="h-full w-full">
        {trigger}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex w-full flex-col gap-4 p-4 md:w-fit">
          <div className="text-lg font-semibold leading-7">Update Position</div>

          <div className="px-1 text-sm font-medium leading-5 text-muted-foreground">
            Adjust your{" "}
            <span className="text-destructive-foreground">StopLoss</span> &/Or{" "}
            <span className="text-success-foreground">TakeProfit</span>, you can
            update one or both values.
          </div>

          <div className="flex h-[108px] justify-between rounded-lg border border-border bg-muted p-4">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Avatar className="h-4 w-4">
                  <AvatarImage src={openPosition?.market?.imageUri} />
                  <AvatarFallback>btc</AvatarFallback>
                </Avatar>
                {openPosition?.market?.name} /
                <span
                  className={cn(
                    "",
                    openPosition?.buy === true
                      ? "text-success-foreground"
                      : "text-destructive-foreground",
                  )}
                >
                  {openPosition?.buy === true ? "Long" : "Short"}
                </span>
              </div>
              <div>
                <div className="text-lg font-semibold leading-7 text-muted-foreground">
                  {size.toFixed(4) ?? 0} {ticker}
                </div>
                <div className="text-xs font-medium leading-5 text-muted-foreground">
                  {price !== undefined ? (
                    `${formatBigIntUsd(price, 10)} / ${ticker}`
                  ) : (
                    <Skeleton className="h-[28px] w-[80px]" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="text-right  text-[10px] leading-[10px] text-muted-foreground">
                  Liquidation Price
                </div>
                <div className="text-right text-sm font-semibold leading-5 text-destructive-foreground">
                  {Number(openPosition.liq_price) !== 0 ? (
                    formatBigIntUsd(openPosition.liq_price, 10)
                  ) : (
                    <Skeleton className={"h-[28px] w-[80px]"} />
                  )}
                </div>
              </div>
              <div>
                <div className="text-right text-[10px] leading-[10px] text-muted-foreground">
                  Executed at
                </div>
                <div className=" text-right  text-sm font-semibold leading-5 text-foreground">
                  {formatBigIntUsd(openPosition?.open_price ?? 0, 10)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-fit justify-between rounded-lg border border-border bg-muted p-4">
            <div className="flex h-full flex-col justify-between">
              <div className="text-[10px] text-muted-foreground">
                UnRealized PnL
              </div>
              <ActivePositionPNL position={openPosition} />
            </div>
            <div className="flex h-full flex-col justify-between">
              <div className="text-[10px] text-muted-foreground">Leverage</div>
              <div className=" text-sm font-semibold text-foreground">
                {openPosition?.leverage}x
              </div>
            </div>
          </div>
          <TPSL
            leverage={Number(openPosition?.leverage) ?? 2}
            tp={tp}
            sl={sl}
            formattedPrice={openPrice}
            isUpdate={true}
            liqPrice={Number(openPosition.liq_price)}
            long={openPosition?.buy === true}
            isSlSubmitLoading={isUpdateSLLoading}
            isTpSubmitLoading={isUpdateTPLoading}
            onTpChangeSubmit={() => {
              updateTpWrite({
                address: process.env
                  .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
                abi: TRADING_ABI,
                functionName: "updateTp",
                params: updateTpParams,
              });
            }}
            onSlChangeSubmit={() => {
              updateSlWrite({
                address: process.env
                  .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
                abi: TRADING_ABI,
                functionName: "updateSl",
                params: updateSlParams,
              });
            }}
            tpslOnChange={(value) => {
              setTp(value.tp);
              setSl(value.sl);
            }}
          />
          {/* <Button>Update Order</Button> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
