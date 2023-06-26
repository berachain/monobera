import React from "react";
import { type Metadata } from "next";

import StakeContent from "./StakeContent";

export const metadata: Metadata = {
  title: "Stake | Berachain",
  description: "BGT Station",
};

export default function ValidatorList() {
  return <StakeContent />;
}
