import React from "react";
import { usePollUserAccountData } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { formatEther, formatUnits } from "viem";

import { getLTVColor, getLTVSpace } from "~/utils/get-ltv-color";
import { POLLING } from "@bera/shared-ui";
import { beraJsConfig } from "@bera/wagmi";

export const RiskDetails = () => {
  const [open, setOpen] = React.useState(false);

  const { useUserAccountData } = usePollUserAccountData({
    config: beraJsConfig,
    opts: {
      refreshInterval: POLLING.FAST,
    },
  });
  const data = useUserAccountData();
  const healthFactor = Number(formatEther(data?.healthFactor ?? 0n));
  const totalCollateralBase =
    !data?.totalCollateralBase || data?.totalCollateralBase === 0n
      ? 1n
      : data?.totalCollateralBase;
  const ltv = formatUnits(
    ((data?.totalDebtBase ?? 0n) * 100000000n) / totalCollateralBase,
    8,
  );
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Badge
            variant={"info"}
            className="cursor-pointer rounded-xs py-0 font-medium"
          >
            Risk Details
          </Badge>
        </DialogTrigger>
        <DialogContent className="max-h-[calc(100vh-80px)] w-full overflow-auto sm:w-[448px]">
          <DialogHeader>
            <DialogTitle className="text-left">
              Liquidation risk parameters
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm leading-5">
            Your health factor and loan to value determine the assurance of your
            collateral. To avoid liquidations you can supply more collateral or
            repay borrow positions.
          </div>
          <div className="boredr-border flex flex-col gap-4 rounded-md border px-4 py-3">
            <div className="font-medium leading-6">Health Factor</div>
            <div className="flex items-center justify-between">
              <div className="flex-1 text-sm leading-5">
                Safety of your deposited collateral against the borrowed assets
                and its underlying value
              </div>
              <div
                className={cn(
                  "text-md flex h-[62px] w-[62px] items-center justify-center rounded-full font-semibold leading-7",
                  `bg-${getLTVColor(healthFactor)}`,
                )}
              >
                {healthFactor <= 999 ? healthFactor.toFixed(2) : "∞"}
              </div>
            </div>
            <div className="h-24">
              <div
                className={cn("relative h-9 w-full", getLTVSpace(healthFactor))}
              >
                <div className={"flex w-fit flex-col items-center"}>
                  <span className="text-sm font-medium leading-3">
                    {healthFactor <= 999 ? healthFactor.toFixed(2) : "∞"}
                  </span>
                  <Icons.chevronDown className="h-7 w-7" />
                </div>
              </div>
              <div className="relative h-3 w-full rounded-full bg-gradient-to-r from-destructive-foreground to-success-foreground">
                <div className="absolute -top-0.5 left-10 h-[18px] w-1 rounded-full bg-white" />
              </div>
              <div className="flex h-12 w-full flex-col justify-end">
                <div className="w-fit text-center">
                  <div className="text-sm font-medium leading-6">1.00</div>
                  <div className="text-xs leading-[10px]">
                    Liquidation value
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm leading-5">
              If the health factor goes below 1, the liquidation of your
              collateral might be triggered.
            </div>
          </div>
          <div className="boredr-border flex flex-col gap-4 rounded-md border px-4 py-3">
            <div className="font-medium leading-6">Current LTV</div>
            <div className="flex items-center justify-between">
              <div className="flex-1 text-sm leading-5">
                Your current loan to value based on your collateral supplied.
              </div>
              <div
                className={cn(
                  "text-md flex h-[62px] w-[62px] items-center justify-center rounded-full font-semibold leading-7",
                  `bg-${getLTVColor(healthFactor)}`,
                )}
              >
                {(Number(ltv) * 100).toFixed(0)}%
              </div>
            </div>
            <div className="relative h-32">
              <div className="relative h-[68px] w-full">
                <div
                  className="absolute flex w-fit -translate-x-[50%] flex-col items-center"
                  style={{
                    left: `${(Number(ltv) * 100 < 5
                      ? 5
                      : Number(ltv) * 100
                    ).toFixed(0)}%`,
                  }}
                >
                  <span className="text-sm font-medium leading-6">
                    {(Number(ltv) * 100).toFixed(2)}%
                  </span>
                  <div className="text-[10px] leading-[10px] text-muted-foreground">
                    MAX 75.00%
                  </div>
                  <Icons.chevronDown className="h-7 w-7" />
                </div>
              </div>
              <div className="relative h-3 w-full rounded-full bg-gradient-to-r from-success-foreground to-destructive-foreground">
                <div className="absolute -top-0.5 left-[80%] h-[18px] w-1 -translate-x-[50%] rounded-full bg-white" />
              </div>
              <div className="relative flex h-12 w-full justify-end">
                <div className="absolute bottom-0 left-[80%] w-fit -translate-x-[50%]">
                  <div className="w-fit text-center text-destructive-foreground">
                    <div className="text-sm font-medium leading-6">
                      {(
                        Number(
                          formatUnits(
                            !data?.currentLiquidationThreshold ||
                              data?.currentLiquidationThreshold === 0n
                              ? 8000n
                              : data?.currentLiquidationThreshold,
                            4,
                          ),
                        ) * 100
                      ).toFixed(2)}
                      %
                    </div>
                    <div className="whitespace-nowrap text-xs leading-[10px]">
                      Liquidation Threshold
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm leading-5">
              If your loan to value goes above the liquidation threshold your
              collateral supplied may be liquidated.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
