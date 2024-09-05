"use client";

import React, { Suspense, useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { isIPFS } from "@bera/config";
import { Address, isAddress } from "viem";

import IndividualMarketAnalytics from "../markets/[address]/individual-market-analytics";

export default function Page() {
  if (isIPFS) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Content />
    </Suspense>
  );
}

const Content = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    const addressParam = searchParams.get("address");
    if (addressParam && isAddress(addressParam)) {
      setAddress(addressParam);
    }
  }, [searchParams]);

  if (!address) {
    return <div>Loading...</div>;
  }
  return <IndividualMarketAnalytics address={address} />;
};
