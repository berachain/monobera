import { type Metadata } from "next";

import { Rewards } from "./rewards";

export const metadata: Metadata = {
  title: "Rewards | DEX | Berachain",
  description: "Decentralized exchange on Berachain",
};

export default function Page() {
  return <Rewards />;
}
