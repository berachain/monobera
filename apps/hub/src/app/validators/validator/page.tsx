"use client";

import { notFound, useSearchParams } from "next/navigation";
import { isIPFS } from "@bera/config";

import Validator from "./validator";

const SuspendedValidatorPage = () => {
  const searchParams = useSearchParams();

  if (!isIPFS) {
    return notFound();
  }

  if (!searchParams.get("address")) {
    throw Error("No validator address found in search params");
  }

  return (
    <Validator
      validatorAddress={searchParams.get("address") as `0x${string}`}
    />
  );
};
export default function () {
  return <SuspendedValidatorPage />;
}
