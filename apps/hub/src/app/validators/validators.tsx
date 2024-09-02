"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { ValidatorBanner } from "./components/validator-banner";
import { ValidatorGlobalInfo } from "./components/validator-global-info";
import { ValidatorPortalStatus } from "./components/validator-portal-status";
import ValidatorsTable from "./components/validators-table";
import Validator from "./validator/validator";

export default function Validators() {
  const searchParams = useSearchParams();

  return searchParams.get("v") ? (
    <Validator validatorAddress={searchParams.get("v") as `0x${string}`} />
  ) : (
    <div className="flex flex-col gap-16">
      <ValidatorBanner />
      <ValidatorGlobalInfo />
      <ValidatorsTable />
      <ValidatorPortalStatus />
    </div>
  );
}
