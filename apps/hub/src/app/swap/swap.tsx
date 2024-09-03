"use client";

import { FC } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";

import { SwapCard } from "~/components/swap-card";

export const SwapPage: FC = () => {
  const sp = useSearchParams();
  const inputCurrency = sp.get("inputCurrency");
  const outputCurrency = sp.get("outputCurrency");

  return (
    <div className="container">
      <SwapContent
        inutCurrency={inputCurrency}
        outputCurrency={outputCurrency}
        isRedeem={false}
      />
    </div>
  );
};
export const SwapContent = ({
  inutCurrency,
  outputCurrency,
  isRedeem,
}: {
  inutCurrency: string | null;
  outputCurrency: string | null;
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
              className={cn("ml-2 rounded-full", !isRedeem && "bg-transparent")}
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
