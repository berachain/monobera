"use client";

import React from "react";
import { truncateHash } from "@bera/berajs";
import { Badge } from "@bera/ui/badge";
import { Card } from "@bera/ui/card";
import { Separator } from "@bera/ui/separator";

export function Validators({
  validators,
}: {
  validators: {
    name: string;
    address: string;
  }[];
}) {
  return (
    <Card className="flex gap-3 p-5">
      <div className="flex flex-col gap-2">
        <h3 className="text-md font-semibold text-backgroundSecondary">
          Current proposer
        </h3>
        <ValidatorDetails
          validator={validators[0] as { name: string; address: string }}
        />
        <h3 className="text-md font-semibold text-backgroundSecondary">
          Validators
        </h3>
        <h4 className="text-xl font-bold">{validators.length}</h4>
      </div>
      <div>
        <Separator orientation="vertical" />
      </div>
      <div className="flex-1">
        <h3 className="text-md font-semibold text-backgroundSecondary">
          Previous proposers
        </h3>
        <div className="grid grid-cols-4 gap-4 p-2">
          {validators.slice(1).map((validator) => (
            <ValidatorDetails key={validator.name} validator={validator} />
          ))}
        </div>
      </div>
    </Card>
  );
}

function ValidatorDetails({
  validator,
}: {
  validator: {
    name: string;
    address: string;
  };
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-backgroundSecondary" />
      <div>
        <h4 className="text-sm font-semibold text-backgroundSecondary">
          {validator.name}
        </h4>
        <Badge variant="secondary">
          {truncateHash(validator.address as `0x${string}`)}
        </Badge>
      </div>
    </div>
  );
}
