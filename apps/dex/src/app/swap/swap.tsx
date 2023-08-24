"use client";

import dynamic from "next/dynamic";
import { type Address } from "wagmi";

import { SwapCard } from "~/components/swap-card";

interface ISwap {
  inputCurrency?: Address | undefined;
  outputCurrency?: Address | undefined;
}

const DynamicBerachainInfo = dynamic(
  () => import("~/components/berachain-info"),
  {
    ssr: false,
  },
);

export const SwapContent = ({ inputCurrency, outputCurrency }: ISwap) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="w-full min-w-[350px] md:w-[450px]">
        <SwapCard
          inputCurrency={inputCurrency}
          outputCurrency={outputCurrency}
        />
      </div>
      <span className="hidden pt-[64px] md:block">
        <DynamicBerachainInfo />
      </span>
    </div>
  );
};
