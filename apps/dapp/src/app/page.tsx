import Link from "next/link";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import Balancer from "react-wrap-balancer";

import { getCurrentDate } from "~/utils/getCurrentDate";
import { ctaFeatures } from "~/app/config";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="z-10 min-h-[50vh] w-full max-w-4xl px-5 xl:px-0">
        {/* <a
          href="https://twitter.com/steventey/status/1613928948915920896"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-sky-100 px-7 py-2 transition-colors hover:bg-sky-200"
        >
          <Icons.twitter className="h-5 w-5 text-sky-500" />
          <p className="text-sm font-semibold text-sky-500">
            Introducing bera Corp
          </p>
        </a> */}
        <h1
          className="font-display animate-fade-up bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
          <Balancer>Bera Dex</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Bera Dex is the liquidity engine of berachain its a good project bls
            buy
          </Balancer>
        </p>
        <div className="my-16 flex w-full items-center justify-center gap-5">
          <Button>Explore Pools</Button>
          <Button variant={"outline"}>Start Building</Button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {ctaFeatures.map((feature) => (
            <Link
              key={feature.title}
              href={{
                pathname: feature.href,
              }}
            >
              <Card>
                <CardHeader>
                  <div className="h-20 w-full bg-red-500"></div>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <CardTitle>{feature.title}</CardTitle>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="my-16 flex w-full flex-col items-center justify-center">
          <h1 className="text-6xl font-bold">Bera Dex Stats</h1>
          <p className="text-md">As of {getCurrentDate()}</p>
          <div className="my-16 flex w-full items-center justify-center gap-5">
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <h1 className="text-md font-bold">Total Volume</h1>
              <p className="text-6xl font-bold">$302m</p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <h1 className="text-md font-bold">Total Pools</h1>
              <p className="text-6xl font-bold">23.0k</p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <h1 className="text-md font-bold">Total Liquidity</h1>
              <p className="text-6xl font-bold">$1.32b</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
