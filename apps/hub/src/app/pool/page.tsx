"use client";

import { Suspense } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { isIPFS } from "@bera/config";
import { isAddress } from "viem";

import PoolPageContent from "./PoolPageContent";

const _PoolStaticPage = () => {
  if (!isIPFS) {
    return notFound();
  }

  const searchParams = useSearchParams();
  const poolId = searchParams.get("address");

  if (!poolId || !isAddress(poolId)) {
    return notFound();
  }
  return <PoolPageContent shareAddress={poolId} />;
};

export default function PoolStaticPage() {
  return (
    <Suspense>
      <_PoolStaticPage />
    </Suspense>
  );
}
