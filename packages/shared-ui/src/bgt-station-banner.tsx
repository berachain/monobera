"use client";
import { Card, CardContent } from "@bera/ui/card";
import { Address } from "viem";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import Link from "next/link";
import { bgtUrl } from "@bera/config";

export const BgtStationBanner = ({
  receiptTokenAddress,
}: {
  receiptTokenAddress: Address | undefined;
}) => {
  return (
    <Card>
      <CardContent className="w-full flex flex-row justify-between items-center pt-4 p-4">
        <div className="flex flex-col items-start">
          <div className="font-medium text-muted-foregorund">
            Deposit your Receipt Tokens
          </div>
          <div className="text-sm text-muted-foreground">
            After adding liquidity, deposit your receipt tokens to start earning{" "}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                verticalAlign: "middle",
              }}
            >
              <Icons.bgt className="w-4 h-4" />
            </span>{" "}
            BGT rewards
          </div>
        </div>
        <Link href={`${bgtUrl}/gauge/${receiptTokenAddress}`} target="_blank">
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
