"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useBeraJs } from "@bera/berajs";
import { Icons } from "@bera/ui/icons";

import { PROPOSAL_GENRE } from "../../../governance-genre-helper";
import { useGovernance } from "../../components/governance-provider";
import { CreateProposal } from "./create-proposal";
import Image from "next/image";

export default function NewProposal({ genre }: { genre: PROPOSAL_GENRE }) {
  // const dapp = getDappByGenre(genre);
  const { account } = useBeraJs();
  const params = useParams();
  const {
    canPropose,
    isLoading,
    currentTopic,
    openNotEnoughVotingPowerDialog,
  } = useGovernance();
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
      <div className="sm:flex sm:justify-between relative">
        <div>
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
              style={{ color: currentTopic.color }}
            >
              {currentTopic.name}
            </div>
            <div className="relative max-sm:w-1/2 max-sm:text-[1.875rem] sm:text-3xl font-semibold leading-9 text-foreground">
              Create New Proposal
            </div>
          </div>
        </div>
        <div className=" max-sm:absolute max-sm:bottom-0 max-sm:right-0 max-sm:w-1/2 sm:w-1/4 basis-1/4 z-0 object-contain object-top">
          <Image
            src="https://res.cloudinary.com/duv0g402y/image/upload/v1729532664/governance/y59qkz9bqnwkuqulpkme.png"
            width={586}
            height={388}
            alt="poll image"
          />
        </div>
      </div>
      <CreateProposal />
    </div>
  );
}
