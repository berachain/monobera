import { type Metadata } from "next";
import { isAddress } from "viem";

import { SwapCard } from "~/components/swap-card";

export const metadata: Metadata = {
  title: "Swap | DEX | Berachain",
  description: "Decentralized exchange on Berachain",
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
  if (!isAddress(inputCurrency) && !isAddress(outputCurrency)) {
    return (
      <div className="container">
        <SwapCard />
      </div>
    );
  }

  if (isAddress(inputCurrency) && !isAddress(outputCurrency)) {
    return (
      <div className="container">
        <SwapCard inputCurrency={inputCurrency} />
      </div>
    );
  }

  if (!isAddress(inputCurrency) && isAddress(outputCurrency)) {
    return (
      <div className="container">
        <SwapCard outputCurrency={outputCurrency} />
      </div>
    );
  }

  if (isAddress(inputCurrency) && isAddress(outputCurrency)) {
    return (
      <div className="container">
        <SwapCard
          inputCurrency={inputCurrency}
          outputCurrency={outputCurrency}
        />
      </div>
    );
  }
}
