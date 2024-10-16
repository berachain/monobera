"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useBeraJs } from "@bera/berajs";
import { governorAddress } from "@bera/config";
import { Icons } from "@bera/ui/icons";

import { PROPOSAL_GENRE } from "../../../governance-genre-helper";
import { useGovernance } from "../../components/governance-provider";
import { CreateProposal } from "./create-proposal";

export default function NewProposal({ genre }: { genre: PROPOSAL_GENRE }) {
  // const dapp = getDappByGenre(genre);
  const { account } = useBeraJs();
  const params = useParams();
  const { canPropose, isLoading, dappConfig, openNotEnoughVotingPowerDialog } =
    useGovernance();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!canPropose && account) {
      openNotEnoughVotingPowerDialog({
        onClose: () => {
          router.replace(`/governance/${params.genre}`);
        },
      });
    } else {
      openNotEnoughVotingPowerDialog({
        isOpen: false,
      });
    }
  }, [canPropose, account, isLoading]);

  return (
    <div className="col-span-12 pb-16 xl:col-span-8 xl:col-start-3">
      <Link
        href={`/governance/${params.genre}`}
        className="mb-8 flex items-center gap-1 text-sm font-medium text-muted-foreground"
      >
        <Icons.arrowLeft className="h-4 w-4" />
        All Proposals
      </Link>

      <div className="mb-9">
        <div
          className="font-bold leading-6 tracking-widest text-muted-foreground uppercase"
          style={{ color: dappConfig.color }}
        >
          {dappConfig.name}
        </div>
        <div className="relative text-3xl font-semibold leading-9 text-foreground">
          Create New Proposal
        </div>
      </div>

      <CreateProposal />
    </div>
  );
}
