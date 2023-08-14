import React from "react";
import { type Metadata } from "next";

import CreateBribeCard from "./CreateBribeCard";

type Props = {
  params: { validatorAddress: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { validatorAddress } = params;
  return {
    title: `Bribe ${validatorAddress} Validator | DEX | Berachain`,
  };
}

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
