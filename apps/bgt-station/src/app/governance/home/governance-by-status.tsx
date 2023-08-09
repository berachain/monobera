"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import {
  OrderByEnum,
  StatusEnum,
  type OrderByEnum as OrderByEnumT,
  type StatusEnum as StatusEnumT,
} from "../types";

export default function GovernanceByStatus({
  proposalStatus,
  orderBy,
}: {
  proposalStatus: StatusEnumT;
  orderBy: OrderByEnumT;
}) {
  const router = useRouter();
  return (
    <div className="container w-full max-w-[926px]">
      <div className="text-forergound text-center text-5xl font-bold leading-[48px]">
        🗳️Vote on proposals or <br />
        create your own
      </div>
      <div className="mb-8 mt-6 flex w-full justify-center gap-3">
        <Button onClick={() => router.push(`/governance/create`)}>
          Create proposal
        </Button>
        <Button variant="outline">Visit forums</Button>
      </div>
      <div className="flex justify-between py-4">
        <Tabs defaultValue={proposalStatus}>
          <TabsList>
            {Object.values(StatusEnum).map((status) => (
              <TabsTrigger
                value={status}
                key={status}
                className="capitalize"
                onClick={() =>
                  router.push(
                    `/governance?proposalStatus=${status}&&orderBy=${orderBy}`,
                  )
                }
              >
                {status.replaceAll("-", " ")}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2 text-sm font-medium leading-[14px] text-stone-500">
          Order by
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                variant="outline"
                className="flex h-[30px] w-fit items-center justify-center gap-1 rounded-xl border border-border p-2 text-sm font-medium capitalize leading-[14px] text-foreground"
              >
                {orderBy.replaceAll("-", " ")}
                <Icons.chevronDown className="relative h-3 w-3 text-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {Object.values(OrderByEnum).map((order) => (
                <DropdownMenuCheckboxItem
                  checked={order === orderBy}
                  key={order}
                  onClick={() =>
                    router.push(
                      `/governance?proposalStatus=${proposalStatus}&&orderBy=${order}`,
                    )
                  }
                >
                  {order.replaceAll("-", " ")}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
