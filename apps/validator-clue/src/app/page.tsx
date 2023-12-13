import { type Metadata } from "next";
import { faucetName } from "@bera/config";

import Content from "./components/content";
import GlobalConsole from "./components/global-console";
import { tabEnum, type tabEnum as tabEnumT } from "./types";

export const metadata: Metadata = {
  title: `Berachain ${faucetName} `,
  description: `Fund your testnet wallet with bera tokens.`,
};

export default function Page({
  searchParams,
}: {
  searchParams: {
    tab: tabEnumT;
  };
}) {
  return (
    <div className="container mx-auto mt-8 flex w-full flex-col gap-4 xl:flex-row xl:gap-8">
      <Content tab={searchParams.tab ?? tabEnum.GAME} />
      <GlobalConsole />
    </div>
  );
}
