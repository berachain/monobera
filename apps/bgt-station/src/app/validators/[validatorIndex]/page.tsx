import { type Metadata } from "next";

import { getMetaTitle } from "~/utils/metadata";
import Validator from "./validator";

export function generateMetadata(): Metadata {
  return {
    title: getMetaTitle("Validator Details"),
    description: `Validator details`,
  };
}

export default function Page({
  params,
}: {
  params: { validatorIndex: number };
}) {
  const { validatorIndex } = params;

  return <Validator validatorIndex={validatorIndex} />;
}
