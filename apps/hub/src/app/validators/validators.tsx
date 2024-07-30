"use client";

import React from "react";

import { ValidatorBanner } from "./components/validator-banner";
import { ValidatorGlobalInfo } from "./components/validator-global-info";
import { ValidatorPortalStatus } from "./components/validator-portal-status";
import ValidatorsTable from "./components/validators-table";

export default function Validators() {
  return (
    <div className="flex flex-col gap-16">
      <ValidatorBanner />
      <ValidatorGlobalInfo />
      <ValidatorsTable />
      <ValidatorPortalStatus />
    </div>
  );
}
