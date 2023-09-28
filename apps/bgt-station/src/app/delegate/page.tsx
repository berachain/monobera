import React from "react";
import { type Metadata } from "next";
import { type Address } from "viem";

import { getMetaTitle } from "~/utils/metadata";
import Delegate from "./delegate";
import { DelegateEnum } from "./types";
import { getAbsoluteUrl } from "~/utils/vercel-utils";

export const metadata: Metadata = {
  title: getMetaTitle("Delegate"),
  description: `Delegate, Redelegate, or Undelegate your BGT`,
  openGraph: {
    images: '/opengraph-image.png'
  },
  metadataBase: new URL(getAbsoluteUrl())
};
export default function Page({
  searchParams,
}: {
  searchParams: {
    action: DelegateEnum;
    validator: string;
    redelegateValidator: string;
  };
}) {
  let action;
  if (searchParams.action || searchParams.action in DelegateEnum) {
    action = searchParams.action;
  } else {
    action = DelegateEnum.DELEGATE;
  }

  // if (!isAddress(searchParams.validator)) {
  //   notFound();
  // }
  return (
    <Delegate
      action={action}
      validator={searchParams.validator as Address}
      redelegateValidator={searchParams.redelegateValidator}
    />
  );
}
