import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { hubName, isIPFS } from "@bera/config";
import { isAddress } from "viem";

import Validator from "../validator/validator";

type Props = {
  params: { validatorAddress: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { validatorAddress } = params;
  return {
    title: "Validator Details",
    description: `Validator details for ${validatorAddress}`,
  };
}

export default function Page({
  params,
}: {
  params: { validatorAddress: `0x${string}` };
}) {
  if (isIPFS) {
    return null;
  }

  const { validatorAddress } = params;

  if (!validatorAddress || !isAddress(validatorAddress)) {
    notFound();
  }
  return <Validator {...{ validatorAddress }} />;
}

export function generateStaticParams() {
  return [
    {
      validatorAddress: "0x",
    },
  ];
}
