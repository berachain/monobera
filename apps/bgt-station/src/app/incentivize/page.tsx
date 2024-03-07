import React from "react";
import { type Metadata } from "next";



import { getMetaTitle } from "~/utils/metadata";
import Redeem from "./redeem";


export const metadata: Metadata = {
  title: getMetaTitle("Incentivize"),
  description: "Incentivize",
};

export default function Page() {
  return <Redeem />;
}