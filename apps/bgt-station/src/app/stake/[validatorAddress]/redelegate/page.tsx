import React from "react";

import RedelegateCard from "./RedelegateCard";

export default function ValidatorBribePage({
  params: { validatorAddress },
}: {
  params: { validatorAddress: `0x{string}` };
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <RedelegateCard validatorAddress={validatorAddress} />
    </div>
  );
}
