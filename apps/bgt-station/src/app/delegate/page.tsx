import React from "react";
import { type Address } from "viem";

import Delegate from "./delegate";
import { DelegateEnum } from "./types";

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
