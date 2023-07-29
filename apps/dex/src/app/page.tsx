import { type Metadata } from "next";
import { createPublicClient, http, isAddress } from "viem";

import { SwapCard } from "~/components/swap-card";
import { beraJsConfig } from "./config";

export const metadata: Metadata = {
  title: "Swap | DEX | Berachain",
  description: "Decentralized exchange on Berachain",
};

export default async function Swap({ searchParams }: { searchParams: any }) {
  const { inputCurrency, outputCurrency } = searchParams;
  if (!isAddress(inputCurrency) && !isAddress(outputCurrency)) {
    return (
      <div className="container">
        <SwapCard />
      </div>
    );
  }

  const client = createPublicClient({
    chain: beraJsConfig.chain,
    transport: http(),
  });

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
