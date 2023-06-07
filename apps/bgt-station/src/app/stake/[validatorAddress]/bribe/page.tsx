import React from "react";

import CreateBribeCard from "./CreateBribeCard";

export default function ValidatorBribePage({
  params: { validatorAddress },
}: {
  params: { validatorAddress: string };
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <CreateBribeCard validatorAddress={validatorAddress} />
    </div>
  );
}
