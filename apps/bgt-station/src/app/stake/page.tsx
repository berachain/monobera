import React from "react";
import { Card, CardHeader } from "@bera/ui/card";
import { Input } from "@bera/ui/input";

import ValidatorsTable from "./components/ValidatorsTable";
import { columns } from "./components/column";

export default function ValidatorList() {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <h3 className="text-lg font-medium">Stake</h3>
          <Input type="text" placeholder="Search" className="w-72" />
        </CardHeader>
        <ValidatorsTable columns={columns} />
      </Card>
    </div>
  );
}
