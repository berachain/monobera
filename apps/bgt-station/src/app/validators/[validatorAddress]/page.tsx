import { type Metadata } from "next";

import ValidatorDetails from "./validator-details";

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
  return <ValidatorDetails validatorAddress={validatorAddress} />;
}
