"use client";

import Link from "next/link";
import { useGaugeAddress } from "@bera/berajs";
import { bgtUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Card, CardContent } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Address } from "viem";

export const BgtStationBanner = ({
  receiptTokenAddress,
  vaultAddress,
  className,
  text,
}: {
  receiptTokenAddress: string | undefined;
  vaultAddress: string | undefined;
  className?: string;
  text?: string | JSX.Element;
}) => {
  console.log({ receiptTokenAddress, vaultAddress });
  if (!vaultAddress) return null;
  return (
    <Card className={className}>
      <CardContent className="flex w-full flex-row items-center justify-between p-4 pt-4">
        {text ? (
          text
        ) : (
          <div className="flex flex-col items-start pr-4">
            <div className="text-muted-foregorund font-medium">
              Deposit your Receipt Tokens
            </div>
            <div className="text-sm text-muted-foreground">
              After adding liquidity, deposit your receipt tokens to start
              earning{" "}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  verticalAlign: "middle",
                }}
              >
                <Icons.bgt className="h-4 w-4" />
              </span>{" "}
              BGT rewards
            </div>
          </div>
        )}
        <Link href={`${bgtUrl}/gauge/${vaultAddress}`} target="_blank">
          <Button
            variant={"outline"}
            disabled={receiptTokenAddress === undefined}
          >
            Deposit
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
