import { type Metadata } from "next";

import { getMetaTitle } from "~/utils/metadata";
import Validator from "./validator";

type Props = {
  params: { validatorAddress: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { validatorAddress } = params;
  return {
    title: getMetaTitle("Validator Details"),
    description: `Validator details for ${validatorAddress}`,
  };
}

export default function Page({
  params,
}: {
  params: { validatorAddress: `0x${string}` };
}) {
  const { validatorAddress } = params;

  return <Validator {...{ validatorAddress }} />;
}
