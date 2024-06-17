import React from "react";
import { type Metadata } from "next";
import { bgtName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";
import { type Address } from "viem";

import Delegate from "./delegate";
import DemandBasedQueue from "./demand-based-queue";
import { DelegateEnum } from "./types";

export const metadata: Metadata = {
  title: getMetaTitle("Delegate", bgtName),
  description: "Delegate, Redelegate, or Undelegate your BGT",
};
export default function Page({
  searchParams,
}: {
  searchParams: {
    action: DelegateEnum;
    validator: string;
  };
}) {
  let action;
  if (searchParams.action || searchParams.action in DelegateEnum) {
    action = searchParams.action;
  } else {
    action = DelegateEnum.DELEGATE;
  }

  return (
    <div className="flex w-full flex-col justify-center gap-8 xl:flex-row xl:gap-0">
      <Delegate action={action} validator={searchParams.validator as Address} />
    </div>
  );
}
