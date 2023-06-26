import { type Metadata } from "next";

import ClaimPageContent from "./ClaimPageContent";

export const metadata: Metadata = {
  title: "Rewards | DEX | Berachain",
  description: "Decentralized exchange on Berachain",
};

export default function Claim() {
  return <ClaimPageContent />;
}
