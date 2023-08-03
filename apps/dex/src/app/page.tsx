import { type Metadata } from "next";
import { isAddress } from "viem";

import { SwapContent } from "./swap";

export const metadata: Metadata = {
  title: "Swap | DEX | Berachain",
  description: "Decentralized exchange on Berachain",
};

export default function Swap({ searchParams }: { searchParams: any }) {
  const { inputCurrency, outputCurrency } = searchParams;
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
      <div className="container">
        <SwapContent
          inputCurrency={inputCurrency}
          outputCurrency={outputCurrency}
        />
      </div>
    );
  }
}
