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

export const SwapContent = () => {
  return (
    <div className="mx-auto flex min-w-[320px] flex-col items-center justify-center gap-4 md:w-[500px]">
      <DynamicBerachainInfo />
      <div className="w-full ">
        <SwapCard
          inputCurrency={"" as any}
          outputCurrency={"" as any}
          showBear={false}
          className="drop-shadow-[0px_4px_32px_#23232314] dark:drop-shadow-[0px_4px_32px_#CFB69714]"
        />
      </div>
    </div>
  );
};
