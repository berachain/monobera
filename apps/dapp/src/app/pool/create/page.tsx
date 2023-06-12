import { type Metadata } from "next";

import CreatePageContent from "./CreatePageContent";

export const metadata: Metadata = {
  title: "Create pool | DEX | Berachain",
  description: "Decentralized exchange on Berachain",
};

export default function Create() {
  return <CreatePageContent />;
}
