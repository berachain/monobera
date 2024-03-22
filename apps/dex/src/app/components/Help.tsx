"use client";

import React from "react";
import { dexName, docsUrl } from "@bera/config";
import { Button } from "@bera/ui/button";

export default function Help() {
  return (
    <section className="my-24">
      <div className="mb-12 p-6 text-center">
        <h2 className="mb-4 text-3xl font-bold">
          🐻 Help us <br className="block md:hidden" />
          <span className="whitespace-nowrap text-accent">
            Build a Better Bera
          </span>{" "}
          <span className="hidden md:inline">Dex For You</span>
        </h2>
        <h3 className="text-base font-semibold text-muted-foreground md:text-xl">
          Give us feedback now!
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-8  lg:grid-cols-2">
        <div className="mx-auto flex flex-col items-center justify-between rounded-2xl border bg-background px-12 py-8 text-center md:max-w-[350px] lg:max-w-full lg:items-start lg:text-left">
          <p className="mb-2 flex flex-col items-center text-lg font-semibold text-secondary-foreground md:flex-row md:gap-3">
            <span className="text-3xl">📋</span> Feedback Form
          </p>
          <p className="mb-8 text-2xl font-semibold">
            Drop us some feedback now!
            <span className="hidden md:block">
              {" "}
              You&apos;ll automatically get whitelisted as a candidate for
              usability testing.
            </span>
          </p>
          <Button className="w-fit" variant="secondary">
            Provide Feedback
          </Button>
        </div>
        <div className="mx-auto flex flex-col items-center justify-between rounded-2xl border bg-background px-12 py-8  text-center md:max-w-[350px]  lg:max-w-full  lg:items-start lg:text-left">
          <p className="mb-2 flex items-center gap-3 text-lg font-semibold text-secondary-foreground">
            <span className="text-3xl">📜</span> {dexName} Docs
          </p>
          <p className="mb-8 text-2xl font-semibold">
            <span className="hidden md:block">
              Are you a fellow builder in the making?{" "}
            </span>{" "}
            Check out our docs and start building{" "}
            <span className="hidden md:block">on Berachain today.</span>
          </p>
          <Button
            onClick={() => window.open(docsUrl, "_blank")}
            className="w-fit"
            variant="secondary"
          >
            Checkout Docs
          </Button>
        </div>
      </div>
    </section>
  );
}
