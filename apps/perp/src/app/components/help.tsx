import React from "react";
import { Button } from "@bera/ui/button";

export default function Help() {
  return (
    <section>
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">
          🐻 Help us <br className="block md:hidden" />
          <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            Build a Better Bera
          </span>{" "}
          <br />
          <span className="hidden md:inline">
            <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
              Berps
            </span>{" "}
            Platform For You
          </span>
        </h2>
        <div className="text-center text-base font-medium leading-normal text-muted-foreground">
          Give us feedback now! <br className="block md:hidden" /> And get
          whitelisted as a power user.
        </div>
      </div>

      <div className="flex flex-col justify-center gap-6 px-8 md:flex-row">
        <div className="h-fit w-full rounded-xl border border-border bg-muted p-6 md:w-[329px]">
          <div className=" mb-1 text-lg font-semibold leading-7 text-popover-foreground">
            📋 Feedback Form
          </div>
          <div className="w-72 text-sm font-normal leading-normal text-muted-foreground">
            Drop us some feedback now! You’ll automatically get Whitelisted as a
            candidate for usability testing.
          </div>
          <Button className="mt-8 w-fit">Provide Feedback</Button>
        </div>

        <div className="h-fit w-full rounded-xl border border-border bg-muted p-6 md:w-[329px]">
          <div className=" mb-1 text-lg font-semibold leading-7 text-popover-foreground">
            📜 Bera Docs
          </div>
          <div className="w-72 text-sm font-normal leading-normal text-muted-foreground">
            Are you a fellow builder in the making? Check out our docs and start
            building on Berachain today.
          </div>
          <Button className="mt-8 w-fit">Checkout Docs</Button>
        </div>
      </div>
    </section>
  );
}
