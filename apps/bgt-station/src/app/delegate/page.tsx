import React from "react";
import { type Metadata } from "next";
import { type Address } from "viem";

import { getMetaTitle } from "@bera/shared-ui";
import Delegate from "./delegate";
import DemandBasedQueue from "./demand-based-queue";
import { DelegateEnum } from "./types";
import { bgtName } from "@bera/config";

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
    redelegateValidator: string;
  };
}) {
  let action;
  if (searchParams.action || searchParams.action in DelegateEnum) {
    action = searchParams.action;
  } else {
    action = DelegateEnum.DELEGATE;
  }

  return (
    <div className="flex flex-col justify-center gap-8 xl:flex-row xl:gap-0">
      <div className="w-full">
        <Delegate
          action={action}
          validator={searchParams.validator as Address}
          redelegateValidator={searchParams.redelegateValidator}
        />
      </div>
      <div className="border-t-2 border-muted xl:border-r-2 xl:border-t-0" />

      <DemandBasedQueue action={action} />
    </div>
  );
}
