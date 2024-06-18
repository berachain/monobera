import { type Metadata } from "next";
import { dexName, honeyAddress } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";
import { isAddress } from "viem";

import { SwapContent } from "./swap";

export const metadata: Metadata = {
  title: getMetaTitle("Swap", dexName),
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
  const { inputCurrency = honeyAddress, outputCurrency } = searchParams;
  return (
    <div className="container">
      <SwapContent />
    </div>
  );
}
