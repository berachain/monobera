import React from "react";
import { type Metadata } from "next";

import { getMetaTitle } from "~/utils/metadata";
import MyBGT from "./my-bgt";
import { getAbsoluteUrl } from "~/utils/vercel-utils";

export const metadata: Metadata = {
  title: getMetaTitle("My BGT"),
  description: `View your validators, active bribes, and delegator related information`,
  openGraph: {
    images: '/opengraph-image.png'
  },
  metadataBase: new URL(getAbsoluteUrl())
};

export default function Page() {
  return <MyBGT />;
}
