import React from "react";
import type { Metadata } from "next";
import { perpsName } from "@bera/config";

import Referrals from "./components/referrals";

export function generateMetadata(): Metadata {
  return {
    title: `Referrals | ${perpsName}`,
  };
}

export const revalidate = 30;

export default function Home() {
  return <Referrals />;
}
