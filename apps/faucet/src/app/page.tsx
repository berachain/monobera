import { type Metadata } from "next";
import Image from "next/image";
import { cloudinaryUrl, faucetName } from "@bera/config";

import { Explore } from "~/components/explore";
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
        <Image
          src={`${cloudinaryUrl}/faucet/faucet_v3_uktibg`}
          alt="machine"
          width={523}
          height={614}
          loading="eager"
          className="hidden h-[614px] object-cover xl:block"
          unoptimized
        />
      </div>
      <FaucetPartners />

      <Explore />
    </div>
  );
}
