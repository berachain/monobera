import React from "react";
import Image from "next/image";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function Hero() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="max-w-xl lg:text-center">
        <Image
          src="/kingBear.png"
          alt="King Bear"
          width={500}
          height={500}
          className="mx-auto"
        />
        <h1 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-foreground sm:text-4xl">
          Earn Interest And Reward By{" "}
          <span className="bg-gradient-to-b from-yellow-300 to-orange-600 bg-clip-text text-transparent">
            Supplying
          </span>{" "}
          Your Assets And{" "}
          <span className="bg-gradient-to-b from-yellow-300 to-orange-600 bg-clip-text text-transparent">
            Borrowing
          </span>{" "}
          Honey
        </h1>
        <Button className="mt-8 w-full sm:w-auto">
          <Icons.helpingHand className="mr-2 h-5 w-5" /> Borrow Funds
        </Button>
      </div>
    </div>
  );
}
