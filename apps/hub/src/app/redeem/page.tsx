import { type Metadata } from "next";
import {
  beraTokenAddress,
  bgtTokenAddress,
  dexName,
  nativeTokenAddress,
} from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";
import { SwapContent } from "../swap/swap";

export const metadata: Metadata = {
  title: getMetaTitle("Redeem", dexName),
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
