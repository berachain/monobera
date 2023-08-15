import React from "react";

import Delegate from "./delegate";
import { DelegateEnum } from "./types";

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
  return <Delegate action={action} validator={searchParams.validator} />;
}
