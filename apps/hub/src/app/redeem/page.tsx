import { type Metadata } from "next";
import {
  beraTokenAddress,
  bgtTokenAddress,
  nativeTokenAddress,
} from "@bera/config";
import { SwapContent } from "../swap/swap";

export const metadata: Metadata = {
  title: "Redeem",
  description: "Swap tokens on Berachain",
};

export default function Swap() {
  return (
    <div className="container">
      <SwapContent
        inutCurrency={bgtTokenAddress}
        outputCurrency={nativeTokenAddress}
        isRedeem={true}
      />
    </div>
  );
}
