import React from "react";
import { type Metadata } from "next";
import { type Address } from "viem";

import { getMetaTitle } from "~/utils/metadata";
import Delegate from "./delegate";
import DemandBasedQueue from "./demand-based-queue";
import { DelegateEnum } from "./types";

export const metadata: Metadata = {
  title: getMetaTitle("Delegate"),
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
    <div className="flex flex-col justify-center xl:flex-row">
      <div className="w-full">
        <Delegate
          action={action}
          validator={searchParams.validator as Address}
          redelegateValidator={searchParams.redelegateValidator}
        />
      </div>
      <div className="hidden flex-shrink-0 flex-grow-0 border-r-2 border-muted md:flex" />
      <div className="w-full">
        <DemandBasedQueue action={action} />
      </div>
    </div>
  );
}
