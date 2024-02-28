import { type Metadata } from "next";
import { faucetName } from "@bera/config";

import { Explore } from "~/components/explore";
import RiveAnimation from "~/components/rive-animation";
import Content from "./content";
import FaucetPartners from "./faucet-partners";

export const metadata: Metadata = {
  title: `Berachain ${faucetName} `,
  description: "Fund your testnet wallet with bera tokens.",
};

export default function Page() {
  return (
    <div className="container mx-auto">
      <div className="flex w-full flex-col-reverse items-center justify-between py-12 xl:flex-row ">
        <Content />
        <RiveAnimation />
      </div>
      <FaucetPartners />
      <Explore />
    </div>
  );
}
