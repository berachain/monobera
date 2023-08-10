"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { SearchInput } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { ProposalCard } from "../components/proposal-card";
import {
  OrderByEnum,
  StatusEnum,
  type OrderByEnum as OrderByEnumT,
  type StatusEnum as StatusEnumT,
} from "../types";
import { data } from "./mockData";

export default function GovernanceByStatus({
  proposalStatus,
  orderBy,
}: {
  proposalStatus: StatusEnumT;
  orderBy: OrderByEnumT;
}) {
  const [keywords, setKeywords] = React.useState<string | null>(null);

  const getSum = (item: {
    yes: number;
    no: number;
    veto: number;
    abstain: number;
  }) =>
    Object.values(item).reduce((acc: number, curr: number) => acc + curr, 0);

  const sortedProposalList = useMemo(
    () =>
      data
        .filter((proposal) => proposal.proposalStatus === proposalStatus)
        .filter((proposal) => {
          if (!keywords) return true;
          else
            return proposal.proposalTitle
              .toLowerCase()
              .includes(keywords.toLowerCase());
        })
        .sort((a, b) => {
          switch (orderBy) {
            case OrderByEnum.HIGHEST_PARTICIPATION:
              return getSum(b.proposalVotes) - getSum(a.proposalVotes);
            case OrderByEnum.LOWEST_PARTICIPATION:
              return getSum(a.proposalVotes) - getSum(b.proposalVotes);
            case OrderByEnum.MOST_RECENT:
              return a.timestamp - b.timestamp;
            case OrderByEnum.NEWEST:
              return a.timestamp - b.timestamp;
            case OrderByEnum.OLDEST:
              return b.timestamp - a.timestamp;
            default:
              return 0;
          }
        }),
    [data, proposalStatus, orderBy, keywords],
  );

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
              <div className="flex h-[30px] w-fit items-center justify-center gap-1 rounded-xl border border-border p-2 text-sm font-medium capitalize leading-[14px] text-foreground">
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
      <SearchInput
        placeholder="Search proposals"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeywords(e.target.value)
        }
      />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sortedProposalList.map((proposal, index) => (
          <ProposalCard {...proposal} key={"proposal" + index} />
        ))}
      </div>
    </div>
  );
}
