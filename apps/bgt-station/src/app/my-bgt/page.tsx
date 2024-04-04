import React from "react";
import { type Metadata } from "next";

import { getMetaTitle } from "@bera/shared-ui";
import MyBGT from "./my-bgt";
import { bgtName } from "@bera/config";

export const metadata: Metadata = {
  title: getMetaTitle("My BGT", bgtName),
  description:
    "View your validators, active bribes, and delegator related information",
};

export default function Page() {
  return <MyBGT />;
}
