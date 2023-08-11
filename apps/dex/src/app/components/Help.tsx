import React from "react";
import { Button } from "@bera/ui/button";

export default function Help() {
  return (
    <section className="my-24">
      <div className="mb-12 p-6 text-center">
        <h2 className="mb-4 text-3xl font-bold">
          🐻 Help us <span className="text-amber-400">Build a Better Bera</span>{" "}
          Dex For You
        </h2>
        <h3 className="text-xl font-semibold text-muted-foreground">
          Give us feedback now! And get whitelisted as a power user
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="mx-auto flex flex-col items-center justify-between rounded-2xl border-2 bg-[#FAFAF9] p-6 text-center md:max-w-[350px] lg:max-w-full lg:items-start lg:text-left">
          <p className="mb-2 text-lg font-semibold text-secondary">
            📋 Feedback Form
          </p>
          <p className="mb-8 text-2xl font-semibold">
            Drop us some feedback now! You&apos;ll automatically get whitelisted
            as a candidate for usability testing.
          </p>
          <Button className="w-fit" variant="outline">
            Provide Feedback
          </Button>
        </div>
        <div className="mx-auto flex flex-col items-center justify-between rounded-2xl border-2 bg-[#FAFAF9] p-6 text-center md:max-w-[350px]  lg:max-w-full  lg:items-start lg:text-left">
          <p className="mb-2 text-lg font-semibold text-secondary">
            📜 BeraDex Docs
          </p>
          <p className="mb-8 text-2xl font-semibold">
            Are you a fellow builder in the making? Check out our docs and start
            building on BeraChain today.
          </p>
          <Button className="w-fit" variant="outline">
            Checkout Docs
          </Button>
        </div>
      </div>
    </section>
  );
}
