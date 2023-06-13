"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";

export default function PoolPageHeader() {
  const router = useRouter();
  return (
    <>
      <h1 className="text-left text-2xl font-semibold">Pool page</h1>
      <Button
        onClick={() => router.push("/pool/create")}
        className="text-md w-[150px]"
      >
        Create pool
      </Button>
    </>
  );
}
