import { type Metadata } from "next";
import { honeyAddress } from "@bera/config";
import { isAddress } from "viem";

import { getMetaTitle } from "~/utils/metadata";
import { SwapContent } from "./swap";

export const metadata: Metadata = {
  title: getMetaTitle("Swap"),
  description: "Swap tokens on Berachain",
};

export default function Swap({
  searchParams,
}: {
  searchParams: {
    inputCurrency: string;
    outputCurrency: string;
  };
}) {
  const { inputCurrency = honeyAddress as string, outputCurrency } =
    searchParams;
  if (!isAddress(inputCurrency) && !isAddress(outputCurrency)) {
    return (
      <div className="container">
        <SwapContent />
      </div>
    );
  }

  if (isAddress(inputCurrency) && !isAddress(outputCurrency)) {
    return (
      <div className="container">
        <SwapContent />
      </div>
    );
  }

  if (!isAddress(inputCurrency) && isAddress(outputCurrency)) {
    return (
      <div className="container">
        <SwapContent />
      </div>
    );
  }

  if (isAddress(inputCurrency) && isAddress(outputCurrency)) {
    return <SwapContent />;
  }
}
