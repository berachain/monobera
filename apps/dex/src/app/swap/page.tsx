import { type Metadata } from "next";
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
  const {
    inputCurrency = process.env.NEXT_PUBLIC_HONEY_ADDRESS as string,
    outputCurrency,
  } = searchParams;
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
        <SwapContent inputCurrency={inputCurrency} />
      </div>
    );
  }

  if (!isAddress(inputCurrency) && isAddress(outputCurrency)) {
    return (
      <div className="container">
        <SwapContent outputCurrency={outputCurrency} />
      </div>
    );
  }

  if (isAddress(inputCurrency) && isAddress(outputCurrency)) {
    return (
      <SwapContent
        inputCurrency={inputCurrency}
        outputCurrency={outputCurrency}
      />
    );
  }
}
