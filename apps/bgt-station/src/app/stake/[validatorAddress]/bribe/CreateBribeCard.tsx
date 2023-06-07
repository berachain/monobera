"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import BribeTokenInputs from "./BribeTokenInputs";

const CURRENT_EPOCH = 11;

export default function CreateBribeCard({
  validatorAddress,
}: {
  validatorAddress: string;
}) {
  const [epoch, setEpoch] = useState(String(CURRENT_EPOCH + 1));
  const [proposals, setProposals] = useState(String(100));
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <Link href={`/stake/${validatorAddress}`} className="flex items-center">
          <Icons.chevronLeft className="h-6 w-6" />
          <h3 className="text-xl font-semibold">Create Bribe</h3>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <label className="mb-2 block font-semibold" htmlFor="epoch">
            Epoch
          </label>
          <Input
            type="text"
            id="epoch"
            value={epoch}
            onChange={(e) => setEpoch(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block font-semibold" htmlFor="proposals">
            Number of proposals
          </label>
          <Input
            type="text"
            id="proposals"
            value={proposals}
            onChange={(e) => setProposals(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <BribeTokenInputs proposals={Number(proposals)} />
        </div>
        <div className="mb-6">
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <Button className="w-full" onClick={() => {}}>
            Confirm
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
