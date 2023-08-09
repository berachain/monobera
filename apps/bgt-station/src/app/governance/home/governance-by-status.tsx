"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ProposalCard, SearchInput } from "@bera/shared-ui";
import {
  OrderByEnum,
  StatusEnum,
  type OrderByEnum as OrderByEnumT,
  type StatusEnum as StatusEnumT,
} from "@bera/shared-ui/src/types";
import { Button } from "@bera/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

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
      <SearchInput placeholder="Search proposals" className="" />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ProposalCard
          proposalStatus={StatusEnum.ACTIVE}
          proposalVotes={{ yes: 50, no: 20, veto: 10, abstain: 10 }}
          proposalTitle={"#000 What would a proposal title look like?"}
          timestamp={1692076507}
          expedited
        />

        <ProposalCard
          proposalStatus={StatusEnum.ACTIVE}
          proposalVotes={{ yes: 50, no: 20, veto: 10, abstain: 10 }}
          proposalTitle={"#000 What would a proposal title look like?"}
          timestamp={1692076507}
          expedited
        />

        <ProposalCard
          proposalStatus={StatusEnum.IN_QUEUE}
          proposalVotes={{ yes: 50, no: 20, veto: 10, abstain: 10 }}
          proposalTitle={"#001 What would a proposal title look like?"}
          timestamp={1692076507}
          expedited
        />

        <ProposalCard
          proposalStatus={StatusEnum.PASSED}
          proposalVotes={{ yes: 50, no: 20, veto: 10, abstain: 10 }}
          proposalTitle={"#002 What would a proposal title look like?"}
          timestamp={1692076507}
        />

        <ProposalCard
          proposalStatus={StatusEnum.REJECTED}
          proposalVotes={{ yes: 50, no: 20, veto: 10, abstain: 10 }}
          proposalTitle={"#003 What would a proposal title look like?"}
          timestamp={1692076507}
        />
      </div>
    </div>
  );
}
