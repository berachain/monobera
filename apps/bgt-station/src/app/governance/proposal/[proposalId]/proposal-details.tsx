"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  GOVERNANCE_PRECOMPILE_ABI,
  TransactionActionType,
  truncateHash,
  usePollActiveValidators,
  usePollDenom,
  usePollProposal,
  usePollProposalVotes,
  usePollTotalDelegated,
  useTokenInformation,
  type IVote,
  type Proposal,
} from "@bera/berajs";
import { formatter } from "@bera/berajs/src/utils/formatAmount";
import { blockExplorerUrl, governanceAddress, indexerUrl } from "@bera/config";
import { ProposalStatus } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1beta1/gov";
import { TokenIcon, Tooltip, useTxn } from "@bera/shared-ui";
import { Badge } from "@bera/ui/badge";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { decodeGovMsg } from "~/utils/decodeGovMsg";
import { OverviewChart } from "../../components/overview-chart";
import { ProposalCard } from "../../components/proposal-card";
import { VoteCard } from "../../components/vote-card";
import { VoteDialog } from "../../components/vote-dialog";
import { VoterTable } from "../../components/voter-table";
import {
  updateFriendsOfTheChefTypeUrl,
  updateHoneyCollateralTypeUrl,
  updateLendMarkeyTypeUrl,
} from "../../create/useCreateProposal";
import { useProposalDetails } from "./useProposalDetails";

export default function ProposalDetails({
  proposalId,
}: {
  proposalId: number;
}) {
  const { read, tokenInformation } = useTokenInformation();
  const { useProposal, isLoading: isProposalLoading } =
    usePollProposal(proposalId);
  const { useTotalDelegated } = usePollActiveValidators();
  const { useTotalDelegatorDelegated, isLoading: isUserVotingPowerLoading } =
    usePollTotalDelegated();
  const { getAddress } = usePollDenom();
  const proposal: Proposal | undefined = useProposal();

  const [proposalType, setProposalType] = useState<
    | "text-proposal"
    | "new-gauge-proposal"
    | "enable-collateral-for-honey"
    | "new-lend-market"
    | undefined
  >(undefined);

  const globalTotal = useTotalDelegated();
  const userTotal = useTotalDelegatorDelegated();

  const {
    useProposalVotes,
    useTotalProposalVotes,
    isLoading,
    useNormalizedTallyResult,
  } = usePollProposalVotes(proposalId);

  const votes = useProposalVotes();
  const totalVotes = useTotalProposalVotes();
  const normalizedTally = useNormalizedTallyResult();

  const { open, setOpen, comment, setComment, selected, setSelected } =
    useProposalDetails();

  const {
    write,
    ModalPortal,
    isLoading: isTxnLoading,
  } = useTxn({
    message: `Voting for proposal ${proposalId}`,
    actionType: TransactionActionType.VOTE,
  });
  const payload = [BigInt(proposalId), Number(selected ?? 0), comment];

  const votingPower = useMemo(() => {
    if (userTotal && globalTotal) {
      return userTotal / globalTotal;
    }
    return 0;
  }, [userTotal, globalTotal]);

  const jsonMsg = useMemo(() => {
    if (proposal) {
      return decodeGovMsg(proposal.messages);
    }
    return {};
  }, [proposal]);

  const [collateralAddress, setCollateralAddress] = useState("");
  useEffect(() => {
    const updateCollateralAddress = async () => {
      const address = await getAddress(jsonMsg[0].params.psmDenoms[0].denom);
      setCollateralAddress(address as string);
      void read({ address: address as string });
    };

    if (proposalType === "enable-collateral-for-honey" && jsonMsg)
      void updateCollateralAddress();
  }, [jsonMsg, proposalType]);
  console.log("tokenInformation", tokenInformation);
  //handle proposal type
  useEffect(() => {
    if (proposal) {
      if (proposal.messages.length === 0) {
        setProposalType("text-proposal");
      } else if (
        (proposal.messages[0] as any).typeURL === updateFriendsOfTheChefTypeUrl
      ) {
        setProposalType("new-gauge-proposal");
      } else if (
        (proposal.messages[0] as any).typeURL === updateHoneyCollateralTypeUrl
      ) {
        setProposalType("enable-collateral-for-honey");
      } else if (
        (proposal.messages[0] as any).typeURL === updateLendMarkeyTypeUrl
      ) {
        setProposalType("new-lend-market");
      } else {
        setProposalType(undefined);
      }
    } else {
      setProposalType(undefined);
    }
  }, [proposal]);

  return (
    <div className="container pb-16">
      {ModalPortal}
      <div className="mx-auto h-fit w-full max-w-[830px]">
        <div className="flex h-11 w-full justify-between hover:cursor-pointer">
          <Link
            href="/governance"
            className="flex items-center gap-1 text-sm font-medium leading-[14px] text-muted-foreground"
          >
            <Icons.arrowLeft className="relative h-4 w-4" />
            Governance
          </Link>
          <div className="flex items-center gap-3">
            {proposal?.status ===
              ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD && (
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
                isVotingPowerLoading={isUserVotingPowerLoading}
              />
            )}
            {proposal?.status ===
              ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD && <></>}
          </div>
        </div>

        <div className="mt-4 rounded-[18px] shadow">
          {isProposalLoading ? (
            <Skeleton className="h-[235px] w-full rounded-[18px]" />
          ) : (
            proposal && <ProposalCard proposal={proposal} type={proposalType} />
          )}
        </div>

        <div className="mt-4 flex gap-4">
          <Card className="hidden w-full flex-col items-center justify-center p-6 sm:flex">
            <div className="text-2xl font-semibold leading-loose text-foreground">
              {normalizedTally !== undefined ? formatter.format(totalVotes) : 0}
            </div>
            <div className="mt-[-4px] flex items-center gap-0.5 text-sm font-medium leading-[14px] text-muted-foreground">
              Total votes
              <Tooltip text="Total amount of BGT used to vote on this proposal" />
            </div>
          </Card>
          <VoteCard
            abstainPercentage={normalizedTally?.abstainPercentage ?? 0}
            noPercentage={normalizedTally?.noPercentage ?? 0}
            vetoPercentage={normalizedTally?.vetoPercentage ?? 0}
            yesPercentage={normalizedTally?.yesPercentage ?? 0}
          />
        </div>

        {proposalType === "new-gauge-proposal" && (
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
                  href={`${indexerUrl}/address/${
                    (proposal!.messages[0] as any).value
                  }`}
                  target="_blank"
                  className="cursor-pointer underline"
                >
                  {truncateHash((proposal!.messages[0] as any).value)}
                  <Icons.externalLink className="ml-1 inline-block h-3 w-3" />
                </Link>
              </div>
            </Card>
          </div>
        )}

        {(proposalType === "enable-collateral-for-honey" ||
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
                  <TokenIcon address={collateralAddress} fetch size={"md"} />{" "}
                  {tokenInformation?.symbol}
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
        )}

        <div className="mt-16 flex h-fit w-full flex-col gap-8 sm:flex-row">
          <div className="flex-1">
            <div className="h-7 text-lg font-semibold leading-7 text-foreground">
              Description
            </div>
            <Card className="mt-1 h-full max-h-[376px] overflow-y-scroll bg-background p-8 text-sm font-normal leading-normal text-muted-foreground">
              {proposal?.summary ?? ""}
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
        </div>

        <div className="mt-16">
          <div className="h-7 text-lg font-semibold leading-7 text-foreground">
            Overview
          </div>
          <OverviewChart votes={votes as IVote[]} isLoading={isLoading} />
        </div>

        <div className="mt-16 ">
          <div className="mt-4 h-7 text-lg font-semibold leading-7 text-foreground">
            Voters
          </div>
          <VoterTable votes={votes as IVote[]} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
