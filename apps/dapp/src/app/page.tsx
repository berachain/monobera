import { Metadata } from "next";

import LinkButton from "../components/LinkButton";

export const metadata: Metadata = {
  title: "Bera Dapp - DEX / Honey / BGT Station",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="mx-auto w-auto px-4 pb-8 pt-16 sm:pt-24 lg:px-8">
        <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          DAPP
          <span className="block bg-gradient-to-r from-brandred to-brandblue bg-clip-text px-2 text-transparent">
            DEX / Honey / BGT Station
          </span>
        </h1>
        <div className="mx-auto mt-5 max-w-xl gap-2 sm:flex sm:justify-center md:mt-8">
          <LinkButton href="/dapp/dex">DEX</LinkButton>
          <LinkButton href="/dapp/bgt">BGT Station</LinkButton>
          <LinkButton href="/dapp/honey">Honey</LinkButton>
        </div>
      </main>
    </div>
  );
}
