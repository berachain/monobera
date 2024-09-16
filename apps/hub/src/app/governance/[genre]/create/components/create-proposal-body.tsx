"use client";

import { Button } from "@bera/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { TextArea } from "@bera/ui/text-area";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CustomProposal, CustomProposalErrors } from "~/app/governance/types";
import { useCreateProposal } from "~/hooks/useCreateProposal";

export const CreateProposalBody = ({
  proposal,
  setProposal,
  errors,
  setErrors,
  onNext,
}: {
  proposal: CustomProposal;
  setProposal: ReturnType<typeof useCreateProposal>["setProposal"];
  onNext: () => void;
  errors: CustomProposalErrors;
  setErrors: Dispatch<SetStateAction<CustomProposalErrors>>;
}) => {
  const handleNext = useCallback(() => {
    const e: CustomProposalErrors = {};
    if (proposal.title.length === 0) {
      e.title = "Title is required";
    }

    if (proposal.description.length === 0) {
      e.description = "Description is required";
    }

    if (proposal.forumLink.length === 0) {
      e.forumLink = "Forum link is required";
    }

    setErrors(e);

    if (e.title || e.description || e.forumLink) {
      return;
    }

    onNext();
  }, [onNext]);

  return (
    <div className="flex flex-col justify-start gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold leading-tight">Title</div>
        <Input
          type="text"
          id="proposal-title"
          placeholder="Ooga booga"
          value={proposal.title}
          onChange={(e) =>
            setProposal((prev: any) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        {errors.title && (
          <div className="text-sm text-destructive-foreground">
            * {errors.title}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold leading-tight">Description</div>
        <TextArea
          id="proposal-message"
          placeholder="Tell us about your proposal"
          value={proposal.description}
          onChange={(e) =>
            setProposal((prev: any) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold leading-tight">Forum Link</div>
        <Input
          type="text"
          id="proposal-forumLink"
          placeholder="Ooga booga"
          value={proposal.forumLink}
          onChange={(e: any) =>
            setProposal((prev: any) => ({
              ...prev,
              forumLink: e.target.value,
            }))
          }
        />
        {errors.forumLink && (
          <div className="text-sm text-destructive-foreground">
            * {errors.forumLink}
          </div>
        )}
      </div>
      <div className="flex  justify-end">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};
