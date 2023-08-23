"use client";

import { type Address } from "wagmi";

import { SwapCard } from "~/components/swap-card";

interface ISwap {
  inputCurrency?: Address | undefined;
  outputCurrency?: Address | undefined;
}

export const SwapContent = ({ inputCurrency, outputCurrency }: ISwap) => {
  return (
    <div className="mx-auto md:w-[450px]">
      <SwapCard
        inputCurrency={inputCurrency}
        outputCurrency={outputCurrency}
        isMainPage
      />
    </div>
  );
};
