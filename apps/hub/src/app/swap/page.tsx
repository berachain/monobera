import { Suspense } from "react";
import { type Metadata } from "next";
import { dexName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";

import { SwapPage } from "./swap";

export const metadata: Metadata = {
  title: getMetaTitle("Swap", dexName),
  description: "Swap tokens on Berachain",
};

export default function Swap() {
  return (
    <Suspense>
      <SwapPage />
    </Suspense>
  );
}
