import React from "react";
import { type Metadata } from "next";
import {
  dexClient,
  getGlobalCuttingBoard,
  getInflationData,
  type InflationRate,
  type Weight,
} from "@bera/graphql";

import { getMetaTitle } from "~/utils/metadata";
import Validators from "./validators";

export const metadata: Metadata = {
  title: getMetaTitle("Validators"),
  description: "View active validators on Berachain",
};

export default async function Page() {
  return <Validators activeGauges={0} bgtSupply={0} />;
}
