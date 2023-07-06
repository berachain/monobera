import { type Metadata } from "next";

import { SwapCard } from "~/components/swap-card";

export const metadata: Metadata = {
  title: "Swap | DEX | Berachain",
  description: "Decentralized exchange on Berachain",
};

export default function Swap() {
  return (
    <div className="flex w-full items-center justify-center">
      <SwapCard />
    </div>
  );
}
