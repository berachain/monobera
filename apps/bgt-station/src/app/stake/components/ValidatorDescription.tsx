"use client";

import React from "react";
import Link from "next/link";
import { truncateHash } from "@bera/berajs";
import { Badge } from "@bera/ui/badge";
import { Icons } from "@bera/ui/icons";

import { type ValidatorInfo } from "../data/validator";

type Props = {
  validator: ValidatorInfo;
  validatorAddress: `0x{string}`;
};

export function ValidatorDescription({ validator, validatorAddress }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="flex flex-row items-center gap-5">
        <Link
          href={validator.description.website}
          target="_blank"
          className="flex flex-row items-center gap-2 font-semibold"
        >
          <span className="text-2xl">Name</span>
          <span>
            <Icons.external className="h-4 w-4" />
          </span>
        </Link>
        <span>
          <Badge variant="secondary">{validator.status}</Badge>{" "}
        </span>
      </h3>
      <h4 className="text-backgroundSecondary">
        <span className="font-medium">Operator BECH32 Address:</span>{" "}
        {truncateHash(validator.operator_address as `0x${string}`)}
      </h4>
      <h4 className="text-backgroundSecondary">
        <span className="font-medium">Hex Address:</span>{" "}
        {truncateHash(validatorAddress)}
      </h4>
    </div>
  );
}
