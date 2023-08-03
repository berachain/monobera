import React from "react";
import { Button } from "@bera/ui/button";

export default function Help() {
  return (
    <section className="my-24">
      <div className="mb-12 p-6 text-center">
        <h2 className="mb-4 text-3xl font-bold">
          Help us <span className="text-primary">Build a Better Bera</span> Dex
          For You
        </h2>
        <h3 className="text-xl font-semibold text-muted-foreground">
          Give us feedback now! And get whitelisted as a power user
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col rounded-2xl border-2 bg-[#FAFAF9] p-6">
          <p className="mb-2 text-lg font-semibold text-foregroundSecondary">
            Feedback Form
          </p>
          <p className="mb-8 text-2xl font-semibold">
            Drop us some feedback now! You&apos;ll automatically get whitelisted
            as a candidate for usability testing.
          </p>
          <Button className="w-fit">Provide Feedback</Button>
        </div>
        <div className="flex flex-col rounded-2xl border-2 bg-[#FAFAF9] p-6">
          <p className="mb-2 text-lg font-semibold text-foregroundSecondary">
            BeraDex Docs
          </p>
          <p className="mb-8 text-2xl font-semibold">
            Are you a fellow builder in the making? Check out our docs and start
            building on BeraChain today.
          </p>
          <Button className="w-fit">Checkout Docs</Button>
        </div>
      </div>
    </section>
  );
}
