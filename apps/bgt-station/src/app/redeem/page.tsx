import React from "react";
import { type Metadata } from "next";

import { getMetaTitle } from "~/utils/metadata";
import Redeem from "./redeem";
import { getAbsoluteUrl } from "~/utils/vercel-utils";

export const metadata: Metadata = {
  title: getMetaTitle("Redeem"),
  description: `Redeem your BGT for BERA`,
  openGraph: {
    images: '/opengraph-image.png'
  },
  metadataBase: new URL(getAbsoluteUrl())
};

export default function Page() {
  return <Redeem />;
}
