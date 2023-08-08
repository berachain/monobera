"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Tooltip } from "@bera/shared-ui";

export function Test() {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => {
          router.push("/governance/create?type=community-pool-spend");
        }}
      >
        {" "}
        click to create
      </button>
      <Tooltip text="test" />
    </>
  );
}
