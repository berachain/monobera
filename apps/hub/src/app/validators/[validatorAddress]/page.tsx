import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { bgtName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";
import { isAddress } from "viem";

import Validator from "../validator/validator";

type Props = {
  params: { validatorAddress: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { validatorAddress } = params;
  return {
    title: getMetaTitle("Validator Details", bgtName),
    description: `Validator details for ${validatorAddress}`,
  };
}

export default function Page({
  params,
}: {
  params: { validatorAddress: `0x${string}` };
}) {
  const { validatorAddress } = params;

  if (!validatorAddress || !isAddress(validatorAddress)) {
    notFound();
  }
  return <Validator {...{ validatorAddress }} />;
}
