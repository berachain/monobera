import React from "react";
import { type Metadata } from "next";

import { getMetaTitle } from "~/utils/metadata";
import MyBGT from "./my-bgt";

export const metadata: Metadata = {
  title: getMetaTitle("My BGT"),
  description: `View your validators, active bribes, and delegator related information`,
};

export default function Page() {
  return <MyBGT />;
}
