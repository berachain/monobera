import React from "react";
import Link from "next/link";
import { docsUrl } from "@bera/config";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";

export function Documentation({ className }: { className?: string }) {
  return (
    <section className={cn(className)}>
      <div className="mb-12 p-6 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">
          🐻{" "}
          <span className="bg-gradient-to-r from-[#FFC738] to-[#FF8A00F5] bg-clip-text text-transparent">
            {" "}
            Discover
          </span>{" "}
          Our Documentation
        </h2>
        <h3 className="text-base font-semibold text-muted-foreground md:text-xl">
          Your gateway to berachain resources
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-8  lg:grid-cols-2">
        <div className="mx-auto flex flex-col items-center justify-between rounded-2xl border bg-background px-12 py-8 text-center md:max-w-[350px] lg:max-w-full lg:items-start lg:text-left">
          <p className="mb-2 flex flex-col items-center text-lg font-semibold text-secondary-foreground md:flex-row md:gap-3">
            <span className="text-3xl">🚧</span> Developer Docs
          </p>
          <p className="mb-8 text-2xl font-semibold">
            Are you a fellow builder in the making? Check out our docs and start
            building on BeraChain today.
          </p>
          <Link href={`${docsUrl}/developers`} target="_blank">
            <Button className="w-fit" variant="secondary">
              Checkout Docs
            </Button>
          </Link>
        </div>
        <div className="mx-auto flex flex-col items-center justify-between rounded-2xl border bg-background px-12 py-8  text-center md:max-w-[350px]  lg:max-w-full  lg:items-start lg:text-left">
          <p className="mb-2 flex items-center gap-3 text-lg font-semibold text-secondary-foreground">
            <span className="text-3xl">🤝</span> Join the Community
          </p>
          <p className="mb-8 text-2xl font-semibold">
            Eager to connect and learn with fellow crypto enthusiasts? Explore
            and join the vibrant community.
          </p>
          <Link href={`${docsUrl}/community`} target="_blank">
            <Button className="w-fit" variant="secondary">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
