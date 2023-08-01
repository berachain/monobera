import React from "react";
import { Button } from "@bera/ui/button";

export default function Help() {
  return (
    <section className="my-24">
      <div>
        <h2>
          Help us <span className="text-primary">Build a Better Bera</span>Dex
          For You.
        </h2>
        <h3>Give us feedback now! And get whitelisted as a power user.</h3>
      </div>
      <div>
        <div>
          <p>Feedback Form</p>
          <p>
            Drop us some feedback now! You&apos;ll automatically get whitelisted
            as a candidate for usability testing.
          </p>
          <Button>Provide Feedback</Button>
        </div>
        <div>
          <p>BeraDex Docs</p>
          <p>
            Are you a fellow builder in the making? Check out our docs and start
            building on BeraChain today.
          </p>
          <Button>Checkout Docs</Button>
        </div>
      </div>
    </section>
  );
}
