import React from "react";
import { type Metadata } from "next";

import Validators from "./validators";

export const metadata: Metadata = {
  title: "Validators | Berachain",
  description: "BGT Station",
};

export default function Page() {
  return <Validators />;
}
