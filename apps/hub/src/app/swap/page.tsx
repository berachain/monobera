import { type Metadata } from "next";
import { dexName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";

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
  const { inputCurrency, outputCurrency } = searchParams;
  return (
    <div className="container">
      <SwapContent
        inutCurrency={inputCurrency}
        outputCurrency={outputCurrency}
        isRedeem={false}
      />
    </div>
  );
}
