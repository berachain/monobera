"use client";

import { useRouter } from "next/navigation";
import { Tooltip } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { isAddress } from "viem";

import { ProposalCard } from "../../components/proposal-card";
import { VoteCard } from "../../components/vote-card";
import { StatusEnum } from "../../types";

export default function ProposalDetails({
  proposalId,
}: {
  proposalId: `0x${string}`;
}) {
  const router = useRouter();
  if (!isAddress(proposalId)) router.push("/404");

  return (
    <div className="">
      <div className="mx-auto w-full max-w-[830px]">
        <div
          className="flex h-11 w-full justify-between hover:cursor-pointer"
          onClick={() => router.push("/governance")}
        >
          <div className="[]: flex items-center gap-1 text-sm font-medium leading-[14px] text-primary-foreground">
            <Icons.arrowLeft className="relative h-4 w-4" />
            Governance
          </div>
          <div className="flex items-center gap-3">
            <Button>Vote</Button>
            {/* <Button>Change Vote</Button>
            <Button>Deposit</Button> */}
            {/* <Button variant="outline">Cancel</Button> */}
          </div>
        </div>
        <div className="mt-4 rounded-[18px] shadow">
          <ProposalCard
            {...{
              proposalStatus: StatusEnum.IN_QUEUE,
              proposalVotes: { yes: 20, no: 10, veto: 9, abstain: 15 },
              proposalTitle:
                "#101 Security Protocols with Quantum-Resistant Algorithms",
              timestamp: 1678416000,
              expedited: true,
              owner: proposalId,
            }}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <Card className="flex w-full flex-col items-center justify-center p-6">
            <div className="text-2xl font-semibold leading-loose text-foreground">
              96.23M
            </div>
            <div className="mt-[-4px] flex items-center gap-0.5 text-sm font-medium leading-[14px] text-muted-foreground">
              Total votes
              <Tooltip text="no" />
            </div>
          </Card>
          <VoteCard proposalVotes={{ yes: 20, no: 10, veto: 9, abstain: 15 }} />
        </div>
      </div>
    </div>
  );
}
