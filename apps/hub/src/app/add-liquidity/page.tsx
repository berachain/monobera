"use client";

import { Suspense } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { isIPFS } from "@bera/config";
import { isAddress } from "viem";

import AddLiquidityContent from "./AddLiquidityContent";

const _AddLiquidityStaticPage = () => {
  if (!isIPFS) {
    return notFound();
  }

  const searchParams = useSearchParams();
  const poolId = searchParams.get("address");

  if (!poolId || !isAddress(poolId)) {
    return notFound();
  }
  return <AddLiquidityContent shareAddress={poolId} />;
};

export default function AddLiquidityStaticPage() {
  return (
    <Suspense>
      <_AddLiquidityStaticPage />
    </Suspense>
  );
}
