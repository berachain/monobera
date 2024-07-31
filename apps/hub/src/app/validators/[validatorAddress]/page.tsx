import { type Metadata } from "next";

import { getMetaTitle } from "@bera/shared-ui";
import Validator from "./components/validator";
import { bgtName } from "@bera/config";
import { notFound } from "next/navigation";
import { isAddress } from "viem";

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
