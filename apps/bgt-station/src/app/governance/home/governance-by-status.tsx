"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  usePollAllProposals,
  type Proposal,
  type TallyResult,
} from "@bera/berajs";
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
  mappedStatusEnum,
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
  const [keywords, setKeywords] = React.useState<string | null>(null);

  const getSum = (item: TallyResult) =>
    Object.values(item).reduce(
      (acc: number, curr: string) => acc + Number(curr),
      0,
    );

  const { useAllProposals, isLoading } = usePollAllProposals(
    mappedStatusEnum[proposalStatus],
  );
  const data = useAllProposals();
  const sortedProposalList: Proposal[] = useMemo(
    () =>
      data
        ?.filter((proposal: Proposal) => {
          if (!keywords) return true;
          else
            return proposal.title
              .toLowerCase()
              .includes(keywords.toLowerCase());
        })
        .sort((a: Proposal, b: Proposal) => {
          switch (orderBy) {
            case OrderByEnum.HIGHEST_PARTICIPATION:
              return getSum(b.finalTallyResult) - getSum(a.finalTallyResult);
            case OrderByEnum.LOWEST_PARTICIPATION:
              return getSum(a.finalTallyResult) - getSum(b.finalTallyResult);
            case OrderByEnum.MOST_RECENT:
              return Number(b.submitTime - a.submitTime);
            case OrderByEnum.NEWEST:
              return Number(b.submitTime - a.submitTime);
            case OrderByEnum.OLDEST:
              return Number(a.submitTime - b.submitTime);
            default:
              return 0;
          }
        }),
    [data, proposalStatus, orderBy, keywords],
  );

  const router = useRouter();
  return (
    <div className="container mb-20 w-full max-w-[926px]">
      <div className="text-forergound text-center text-3xl font-bold leading-9 sm:text-5xl sm:leading-[48px]">
        🗳️Vote on proposals or <br />
        create your own
      </div>
      <div className="mx-auto mb-8 mt-6 flex w-[165px] flex-col justify-center gap-3 sm:w-full sm:flex-row">
        <Link href="/governance/create">
          <Button>Create proposal</Button>
        </Link>
        {/* <Button variant="outline">Visit forums</Button> */}
      </div>
      <div className="flex flex-col-reverse items-center justify-between gap-4 py-4 sm:flex-row">
        <Tabs defaultValue={proposalStatus} className="w-full sm:w-fit">
          <TabsList className="w-full sm:w-fit">
            {Object.values(StatusEnum).map((status) => (
              <TabsTrigger
                value={status}
                key={status}
                className="flex-1 capitalize hover:text-foreground"
                onClick={() =>
                  router.push(
                    `/governance?proposalStatus=${status}&orderBy=${orderBy}`,
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
              <div className="flex h-[30px] w-fit items-center justify-center gap-1 rounded-xl border border-border bg-background p-2 text-sm font-medium capitalize leading-[14px] text-foreground hover:cursor-pointer">
                {orderBy.replaceAll("-", " ")}
                <Icons.chevronDown className="relative h-3 w-3 text-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {Object.values(OrderByEnum).map((order) => (
                <DropdownMenuCheckboxItem
                  className="hover:text-foreground"
                  checked={order === orderBy}
                  key={order}
                  onClick={() =>
                    router.push(
                      `/governance?proposalStatus=${proposalStatus}&orderBy=${order}`,
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
        {!isLoading &&
          sortedProposalList?.map((proposal: Proposal, index: number) => (
            <ProposalCard
              proposal={proposal}
              key={"proposal" + index}
              onClick={() =>
                router.push(
                  // replace this with real data
                  `/governance/proposal/${Number(proposal.id)}`,
                )
              }
            />
          ))}
      </div>
      {((!isLoading && sortedProposalList.length === 0) || isLoading) && (
        <div className="mx-auto w-fit">
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/bears/e6monhixzv21jy0fqes1`}
            alt="not found bear"
            width={345.35}
            height={200}
          />
          <div className="mt-4 w-full text-center text-xl font-semibold leading-7 text-muted-foreground">
            No Proposals found.{" "}
          </div>
        </div>
      )}
    </div>
  );
}
