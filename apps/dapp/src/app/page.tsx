import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";
import { Card, CardContent } from "@bera/ui/card";
import Balancer from "react-wrap-balancer";

import { getCurrentDate } from "~/utils/getCurrentDate";
import { ctaFeatures, partnerships } from "~/app/config";

export const metadata: Metadata = {
  title: "DEX | Berachain",
  description: "Decentralized exchange on Berachain",
};

export default function Home() {
  return (
    <>
      <div className="home-background absolute bottom-0 left-0 right-0 top-0 bg-[url('/light-bera.png')] bg-contain bg-top bg-no-repeat dark:bg-[url('/dark-bera.png')] 2xl:bg-cover" />
      <div className="relative z-10 flex flex-col items-center justify-center bg-transparent">
        <div className="w-full max-w-4xl px-5 xl:px-0 ">
          <section className="md:min-h-[700px] xl:min-h-[900px]">
            <h1
              className="font-display animate-fade-up bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
              style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
            >
              <Balancer>Bera Dex</Balancer>
            </h1>
            <div className="my-6 flex w-full items-center justify-center gap-5">
              <Button variant={"outline"}>Explore Pools</Button>
              <Button variant={"outline"}>Start Building</Button>
            </div>

            <div className="mt-32 flex w-full flex-col items-center justify-center">
              <h1 className="text-4xl font-bold">Bera Dex Stats</h1>
              <p className="text-sm text-secondary-foreground">
                As of {getCurrentDate()}
              </p>
              <div className="my-16 flex w-full items-center justify-center gap-5">
                <div className="flex w-full flex-col items-center justify-center gap-2">
                  <h1 className="text-sm font-bold text-secondary-foreground">
                    Total Volume
                  </h1>
                  <p className="text-4xl font-bold">$302m</p>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-2">
                  <h1 className="text-sm font-bold text-secondary-foreground">
                    Total Pools
                  </h1>
                  <p className="text-4xl font-bold">23.0k</p>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-2">
                  <h1 className="text-sm font-bold text-secondary-foreground">
                    Total Liquidity
                  </h1>
                  <p className="text-4xl font-bold">$1.32b</p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {ctaFeatures.map((feature) => (
              <Link
                key={feature.title}
                href={{
                  pathname: feature.href,
                }}
              >
                <Card className="border border-transparent shadow-none hover:border-border">
                  <CardContent className="flex flex-col items-center justify-center">
                    <Image
                      width={324}
                      height={324}
                      src={feature.logoURI}
                      alt={feature.title}
                      className="rounded-full"
                    />
                    <p className="font-medium text-primary-foreground">
                      {feature.title}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="my-24 flex w-full flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Partners</h1>
            <span className="text-md text-secondary-foreground">
              ooooga booooooga
            </span>
            <div className="mt-8 grid w-full grid-cols-2 gap-5 lg:grid-cols-3">
              {partnerships.map((feature) => (
                <Link
                  key={feature.title}
                  href={{
                    pathname: feature.href,
                  }}
                >
                  <Card className="border border-transparent bg-transparent shadow-none hover:border-border">
                    <CardContent className="flex flex-col items-center justify-center ">
                      {/* <div className="r-hex">
                        <div className="r-hex-inner"></div>
                      </div> */}
                      <div className="py-4">
                        <Image
                          width={200}
                          height={200}
                          src={feature.logoURI}
                          alt={feature.title}
                        />
                      </div>

                      <p className="font-bold text-foreground">
                        {feature.title}
                      </p>
                      <p className="text-center text-secondary-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
