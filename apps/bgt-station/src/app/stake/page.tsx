"use client";

import React from "react";
import { usePollActiveValidators, type Validator } from "@bera/berajs";
import { Card, CardHeader } from "@bera/ui/card";
import { Input } from "@bera/ui/input";

import ValidatorsTable from "./components/ValidatorsTable";
import { getColumns } from "./components/column";
import { type Metadata } from "next";

// import { columns } from "./components/column";

export const metadata: Metadata = {
  title: "Stake | BGT Station | Berachain",
  description: "BGT Station",
};

export default function ValidatorList() {
  const { useActiveValidators, useTotalDelegated, useValidatorCuttingBoards } =
    usePollActiveValidators();
  console.log(useValidatorCuttingBoards());
  const validators: Validator[] = useActiveValidators();
  const totalDelegated: number = useTotalDelegated();
  const columns = getColumns(totalDelegated);
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <h3 className="text-lg font-medium">Stake</h3>
          <Input type="text" placeholder="Search" className="w-72" />
        </CardHeader>
        <ValidatorsTable columns={columns} validators={validators} />
      </Card>
    </div>
  );
}
