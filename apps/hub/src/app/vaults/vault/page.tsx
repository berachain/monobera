"use client";

import { FC, Suspense } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { useSelectedGauge } from "@bera/berajs";
import { isAddress } from "viem";

import { GaugeDetails } from "../[gaugeAddress]/components/gauge-details";
import Loading from "../[gaugeAddress]/loading";

const Gauge: FC = () => {
  const searchParams = useSearchParams();
  const gaugeAddress = searchParams.get("address");

  if (!gaugeAddress || !isAddress(gaugeAddress)) {
    return notFound();
  }
  return <GaugeDetails gaugeAddress={gaugeAddress} />;
};

export default function GaugeStaticPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Gauge />
    </Suspense>
  );
}
