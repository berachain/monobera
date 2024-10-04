import React from "react";
import { type Metadata } from "next";
import Validators from "./validators";

export const metadata: Metadata = {
  title: "Validators",
  description: "View active validators on Berachain",
};

export default async function Page() {
  return <Validators />;
}
