import { type Metadata } from "next";
import { lendName } from "@bera/config";

import Content from "./content";

export const metadata: Metadata = {
  title: `Faucet | ${lendName}`,
  description: `Welcome to ${lendName}!`,
};

export default function Page() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-[1280px] flex-col-reverse items-center justify-between px-4 py-12 md:flex-row lg:px-[108px] ">
        <Content />
        <div>image</div>
      </div>
    </>
  );
}
