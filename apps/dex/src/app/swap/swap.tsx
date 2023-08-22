"use client";

import { type Address } from "wagmi";

import { SwapCard } from "~/components/swap-card";

interface ISwap {
  inputCurrency?: Address | undefined;
  outputCurrency?: Address | undefined;
}

export const SwapContent = ({ inputCurrency, outputCurrency }: ISwap) => {
  return (
    <div className="flex flex-row justify-center">
      <SwapCard
        inputCurrency={inputCurrency}
        outputCurrency={outputCurrency}
        isMainPage
        className="mx-auto w-full md:w-[400px]"
      />
    </div>
  );
};
