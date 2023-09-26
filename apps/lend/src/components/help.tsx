import React from "react";
import { Button } from "@bera/ui/button";

export default function Help() {
  return (
    <section className="my-24">
      <div className="mb-12 p-6 text-center">
        <h2 className="mb-4 text-3xl font-bold">
          🐻 Join us in{" "}
          <span className="bg-gradient-to-r from-yellow-300 to-orange-600 bg-clip-text text-transparent">
            Building a Better BEND
          </span>{" "}
          For You!
        </h2>
        <h3 className="text-xl font-semibold text-muted-foreground">
          Speak up and become a power user - give us your feedback now!
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className=" mx-auto flex flex-col items-center justify-between rounded-2xl border-2 bg-muted p-6 text-center md:max-w-[350px] md:px-12 md:py-8 lg:max-w-full lg:items-start lg:text-left">
          <p className="mb-2 flex items-center gap-2 text-lg font-semibold text-muted-foreground">
            <span className="text-3xl ">📋 </span> Feedback Form
          </p>
          <p className="mb-8 text-2xl font-semibold">
            Drop us some feedback now! You&apos;ll automatically get whitelisted
            as a candidate for usability testing.
          </p>
          <Button className="w-fit" variant="outline">
            Provide Feedback
          </Button>
        </div>
        <div className=" mx-auto flex flex-col items-center justify-between rounded-2xl border-2 bg-muted p-6 text-center md:max-w-[350px] md:px-12 md:py-8  lg:max-w-full  lg:items-start lg:text-left">
          <p className="mb-2 flex items-center gap-2 text-lg font-semibold text-muted-foreground">
            <span className="text-3xl ">📜 </span> BEND Docs
          </p>
          <p className="mb-8 text-2xl font-semibold">
            Are you a fellow builder in the making? Check out our docs and start
            building on Berachain today.
          </p>
          <Button className="w-fit" variant="outline">
            Checkout Docs
          </Button>
        </div>
      </div>
    </section>
  );
}
