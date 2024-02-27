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
    <div className="flex flex-row">
      <Delegate
        action={action}
        validator={searchParams.validator as Address}
        redelegateValidator={searchParams.redelegateValidator}
      />
      <DemandBasedQueue action={action} />
    </div>
  );
}
