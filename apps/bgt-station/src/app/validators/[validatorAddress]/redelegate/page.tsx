import React from "react";
import { type Metadata } from "next";

import RedelegateCard from "./RedelegateCard";

type Props = {
  params: { validatorAddress: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { validatorAddress } = params;
  return {
    title: `Redelegate from ${validatorAddress} Validator | DEX | Berachain`,
  };
}

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
