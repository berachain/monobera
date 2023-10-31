import { type Metadata } from "next";
import Image from "next/image";
import { cloudinaryUrl, lendName } from "@bera/config";

import Content from "./content";

export const metadata: Metadata = {
  title: `Faucet | ${lendName}`,
  description: `Welcome to ${lendName}!`,
};

export default function Page() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-[1300px] flex-col-reverse items-center justify-between px-4 py-12 md:px-[108px] xl:flex-row ">
        <Content />
        <Image
          src={`${cloudinaryUrl}/faucet/faucet_v3_uktibg`}
          alt="machine"
          width={523}
          height={614}
          loading="eager"
          className="hidden h-[614px] object-cover xl:block"
        />
      </div>
    </>
  );
}
