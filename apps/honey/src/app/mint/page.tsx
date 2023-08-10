import { type Metadata } from "next";

import { SwapCard } from "~/components/swap-card";

export const metadata: Metadata = {
  title: "Mint | Honey | Berachain",
  description: "Mo honey mo problems",
};

export default function Swap() {
  return (
    <div className="flex w-full items-center justify-center pt-24">
      <SwapCard />
    </div>
  );
}
