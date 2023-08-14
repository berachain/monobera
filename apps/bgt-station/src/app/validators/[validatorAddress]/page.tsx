import { type Metadata } from "next";

import Validator from "./validator";

type Props = {
  params: { validatorAddress: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { validatorAddress } = params;
  return {
    title: `${validatorAddress} Validator | DEX | Berachain`,
  };
}

export default function ValidatorDetailsPage({
  params: { validatorAddress },
}: {
  params: { validatorAddress: string };
}) {
  return <Validator validatorAddress={validatorAddress} />;
}
