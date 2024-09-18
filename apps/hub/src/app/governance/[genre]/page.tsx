import React from "react";

import { NativeDapps } from "../governance-genre-helper";
import GovernanceByStatus from "./components/governance-by-status";

export default function Page() {
  return <GovernanceByStatus />;
}

export async function generateStaticParams() {
  return NativeDapps.map((dapp) => ({
    genre: dapp.slug,
  }));
}
