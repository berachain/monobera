import { Suspense } from "react";
import { type Metadata } from "next";

import { SwapPage } from "./swap";

export const metadata: Metadata = {
  title: "Swap",
  description: "Swap tokens on Berachain",
};

export default function Swap() {
  return (
    <Suspense>
      <SwapPage />
    </Suspense>
  );
}
