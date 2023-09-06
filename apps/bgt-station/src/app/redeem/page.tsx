import React from "react";
import { type Metadata } from "next";

import { getMetaTitle } from "~/utils/metadata";
import Redeem from "./redeem";

export const metadata: Metadata = {
  title: getMetaTitle("Redeem"),
  description: `Redeem your BGT for BERA`,
};

export default function Page() {
  return <Redeem />;
}
