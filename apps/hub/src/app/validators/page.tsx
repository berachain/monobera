import React from "react";
import { type Metadata } from "next";
import { getMetaTitle } from "@bera/shared-ui";
import Validators from "./validators";
import { bgtName } from "@bera/config";

export const metadata: Metadata = {
  title: getMetaTitle("Validators", bgtName),
  description: "View active validators on Berachain",
};

export default async function Page() {
  return <Validators />;
}
