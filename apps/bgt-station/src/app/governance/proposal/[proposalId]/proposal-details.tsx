"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  GOVERNANCE_PRECOMPILE_ABI,
  TransactionActionType,
  truncateHash,
  usePollDenom,
  usePollProposal,
} from "@bera/berajs";
import {
  beraTokenAddress,
  blockExplorerUrl,
  governanceAddress,
} from "@bera/config";
import { ProposalStatus } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1beta1/gov";
import { TokenIcon, Tooltip, useTxn } from "@bera/shared-ui";
import { Badge } from "@bera/ui/badge";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { Address } from "viem";

import { decodeGovMsg } from "~/utils/decodeGovMsg";
import { OverviewChart } from "../../components/overview-chart";
import { ProposalCard } from "../../components/proposal-card";
import { VoteCard } from "../../components/vote-card";
import { VoteDialog } from "../../components/vote-dialog";
import { VoterTable } from "../../components/voter-table";
import { getProposalType } from "../../helper";

export default function ProposalDetails({
  proposalId,
}: {
  proposalId: string;
}) {
  const { isLoading, proposal, votes } = usePollProposal(proposalId);

  // console.log("data", isLoading, proposal);
  console.log("votes", votes);
  // const {
  //   write,
  //   ModalPortal,
  //   isLoading: isTxnLoading,
  // } = useTxn({
  //   message: `Voting for proposal ${proposalId}`,
  //   actionType: TransactionActionType.VOTE,
  // });
  // const payload = [BigInt(proposalId), Number(selected ?? 0), comment];

  // const votingPower = useMemo(() => {
  //   if (userTotal && globalTotal) {
  //     const ratio = userTotal / globalTotal;
  //     // Convert to scientific notation if very small
  //     if (ratio > 0 && ratio < 0.01) {
  //       return parseFloat(ratio.toPrecision(2));
  //     }
  //     return ratio;
  //   }
  //   return 0;
  // }, [userTotal, globalTotal]);

  // const jsonMsg = useMemo(() => {
  //   if (proposal) {
  //     return decodeGovMsg([] as any);
  //   }
  //   return {};
  // }, [proposal]);

  // const [collateralAddress, setCollateralAddress] = useState("");
  // useEffect(() => {
  //   const updateCollateralAddress = async () => {
  //     const address = await getAddress(jsonMsg[0].params.psmDenoms[0].denom);
  //     setCollateralAddress(address as string);
  //     // void read({ address: address as Address });
  //   };

  //   if (proposalType === "enable-collateral-for-honey" && jsonMsg)
  //     void updateCollateralAddress();
  // }, [jsonMsg, proposalType]);
  //handle proposal type
  // useEffect(() => {
  //   setProposalType(getProposalType(proposal));
  // }, [proposal]);

  return (
    <div className="pb-16">
      {/* {ModalPortal} */}

      {isLoading || !proposal || votes.length === 0 ? (
        <>Loading</>
      ) : (
        <div className="mx-auto h-fit w-full max-w-[830px]">
          <div className="flex h-11 w-full justify-between hover:cursor-pointer">
            <Link
              href="/governance"
              className="flex items-center gap-1 text-sm font-medium leading-[14px] text-muted-foreground"
            >
              <Icons.arrowLeft className="relative h-4 w-4" />
              Governance
            </Link>
            {/* <div className="flex items-center gap-3">
              <VoteDialog
                open={open}
                setOpen={setOpen}
                votingPower={votingPower}
                comment={comment}
                setComment={setComment}
                selected={selected}
                setSelected={setSelected}
                onSubmit={() => {
                  write({
                    address: governanceAddress,
                    abi: GOVERNANCE_PRECOMPILE_ABI,
                    functionName: "vote",
                    params: payload,
                  });
                }}
                isLoading={isTxnLoading}
                isVotingPowerLoading={true}
              />
          </div> */}
          </div>

          <ProposalCard proposal={proposal} className="mt-4 rounded-[18px]" truncate={false}/>

          {/* <div className="mt-4 flex gap-4">
          <Card className="hidden w-full flex-col items-center justify-center p-6 sm:flex">
            <div className="text-2xl font-semibold leading-loose text-foreground">
              {normalizedTally !== undefined ? 0 : 0} BGT
            </div>
            <div className="mt-[-4px] flex items-center gap-0.5 text-sm font-medium leading-[14px] text-muted-foreground">
              Total votes
              <Tooltip text="Total amount of BGT used to vote on this proposal" />
            </div>
          </Card>
          <VoteCard
            abstainPercentage={0}
            noPercentage={0}
            vetoPercentage={0}
            yesPercentage={0}
          />
        </div> */}

          {/* {proposalType === "new-gauge-proposal" && (
          <div className="mt-16">
            <div className="h-7 text-lg font-semibold leading-7 text-foreground">
              Gauge Details
            </div>
            <Card className="mt-1 flex flex-col gap-1 bg-background p-8 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <div>Gauge Request:</div>
                <Badge variant={"success"} className="border-none font-medium">
                  Enable
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>Address To Add:</div>
                <Link
                  href={`${blockExplorerUrl}/address/${jsonMsg[0].receiverAddress}`}
                  target="_blank"
                  className="cursor-pointer underline"
                >
                  {truncateHash(jsonMsg[0].receiverAddress)}
                  <Icons.externalLink className="ml-1 inline-block h-3 w-3" />
                </Link>
              </div>
            </Card>
          </div>
        )} */}

          {/* {(proposalType === "enable-collateral-for-honey" ||
          proposalType === "new-lend-market") && (
          <div className="mt-16">
            <div className="h-7 text-lg font-semibold leading-7 text-foreground">
              {proposalType === "enable-collateral-for-honey"
                ? "Enable Collateral For Honey"
                : "New Lend Market"}
            </div>
            <Card className="mt-1 flex flex-col gap-1 bg-background p-8 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <div>Asset:</div>
                <div className="flex items-center gap-1 font-medium uppercase text-muted-foreground">
                  <TokenIcon address={collateralAddress} size={"md"} />{" "}
                  {collateralAddress === beraTokenAddress // WBERA have no name, have to hardcode it bro ;<
                    ? "WBERA"
                    : "AAA"}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>Contract Address:</div>
                <Link
                  href={`${blockExplorerUrl}/address/${collateralAddress}`}
                  target="_blank"
                  className="cursor-pointer underline"
                >
                  {truncateHash(collateralAddress)}
                  <Icons.externalLink className="ml-1 inline-block h-3 w-3" />
                </Link>
              </div>
            </Card>
          </div>
        )} */}

          {/* <div className="mt-16 flex h-fit w-full flex-col gap-8 sm:flex-row">
          <div className="flex-1">
            <div className="h-7 text-lg font-semibold leading-7 text-foreground">
              Description
            </div>
            <Card className="mt-1 h-full max-h-[376px] overflow-y-auto bg-background p-8 text-sm font-normal leading-normal text-muted-foreground">
              {""}
            </Card>
          </div>
          {proposalType !== "text-proposal" && (
            <div className="flex-1 sm:w-0.5">
              <div className="h-7 text-lg font-semibold leading-7 text-foreground">
                Msg
              </div>
              <Card className="mt-1 h-full max-h-[376px] overflow-scroll break-words bg-muted px-3 py-2 text-sm font-normal leading-normal text-muted-foreground">
                <pre>{JSON.stringify(jsonMsg, null, 2)}</pre>
              </Card>
            </div>
          )}
        </div> */}

          <div className="mt-16">
          <div className="h-7 text-lg font-semibold leading-7 text-foreground">
            Overview
          </div>
          <OverviewChart votes={[] as any} isLoading={true} />
        </div>

          <div className="mt-16 ">
            <div className="mt-4 h-7 text-lg font-semibold leading-7 text-foreground">
              Voters
            </div>
            <VoterTable votes={votes} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  );
}
