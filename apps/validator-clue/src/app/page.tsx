import { type Metadata } from "next";
import { faucetName } from "@bera/config";

import Content from "./content";

export const metadata: Metadata = {
  title: `Berachain ${faucetName} `,
  description: `Fund your testnet wallet with bera tokens.`,
};

export default function Page() {
  return (
    <div className="container mx-auto">
      <Content />
    </div>
  );
}
