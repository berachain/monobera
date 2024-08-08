"use client";

import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import Link from "next/link";
import { SwapCard } from "~/components/swap-card";

export const SwapContent = ({
  inutCurrency,
  outputCurrency,
  isRedeem,
}: {
  inutCurrency: string | undefined;
  outputCurrency: string | undefined;
  isRedeem: boolean;
}) => {
  return (
    <div className="mx-auto flex min-w-[320px] flex-col items-center justify-center gap-4 md:w-[500px]">
      <div className="w-full ">
        <div className="mb-4">
          <Link href={"/swap"}>
            <Button
              className={cn("rounded-full", isRedeem && "bg-transparent")}
              size="md"
              variant={!isRedeem ? "primary" : "secondary"}
            >
              Swap
            </Button>
          </Link>
          <Link href={"/redeem"}>
            <Button
              className={cn("rounded-full ml-2", !isRedeem && "bg-transparent")}
              size="md"
              variant={isRedeem ? "primary" : "secondary"}
            >
              Redeem
            </Button>
          </Link>
        </div>
        <SwapCard
          inputCurrency={inutCurrency}
          outputCurrency={outputCurrency}
          isRedeem={isRedeem}
        />
      </div>
    </div>
  );
};
