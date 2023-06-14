"use client";

import React from "react";
import Link from "next/link";
import { truncateHash, type Validator } from "@bera/berajs";
import { Badge } from "@bera/ui/badge";
import { Icons } from "@bera/ui/icons";

type Props = {
  validator: Validator | undefined;
  validatorAddress: `0x{string}`;
};

export function ValidatorDescription({ validator, validatorAddress }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="flex flex-row items-center gap-5">
        <Link
          href={validator?.description.website ?? ""}
          target="_blank"
          className="flex flex-row items-center gap-2 font-semibold"
        >
          <span className="text-2xl">{validator?.description.moniker}</span>
          <span>
            <Icons.external className="h-4 w-4" />
          </span>
        </Link>
        <span>
          <Badge variant="secondary">{validator?.status}</Badge>{" "}
        </span>
      </h3>
      <h4 className="text-backgroundSecondary">
        <span className="font-medium">Hex Address:</span>{" "}
        {truncateHash(validatorAddress)}
      </h4>
    </div>
  );
}
