"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";

export default function PoolPageHeader() {
  const router = useRouter();
  return (
    <>
      <h1 className="text-center text-5xl font-bold">
        Create a <span className="text-primary">pool</span> or add <br />{" "}
        liquidity to an existing one
      </h1>
      <Button
        onClick={() => router.push("/pool/create")}
        className="text-md mb-10 w-[150px] self-center"
      >
        Get Started
      </Button>
    </>
  );
}
