import { Button } from "@bera/ui/button";

import { Icons } from "@bera/ui/icons";
import { Input, InputWithLabel } from "@bera/ui/input";
import { TextArea } from "@bera/ui/text-area";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CustomProposal, CustomProposalErrors } from "~/app/governance/types";
import { type useCreateProposal } from "~/hooks/useCreateProposal";

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
    <div className="grid grid-cols-1 justify-start gap-6">
      <InputWithLabel
        label="Title"
        error={errors.title}
        variant="black"
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

      <TextArea
        id="proposal-message"
        label="Description"
        error={errors.description}
        variant="black"
        placeholder="Tell us about your proposal"
        value={proposal.description}
        onChange={(e) =>
          setProposal((prev: any) => ({
            ...prev,
            description: e.target.value,
          }))
        }
      />

      <InputWithLabel
        label="Forum Link"
        error={errors.forumLink}
        type="text"
        variant="black"
        id="proposal-forumLink"
        placeholder="https://forum.berachain.com/...."
        value={proposal.forumLink}
        onChange={(e: any) =>
          setProposal((prev: any) => ({
            ...prev,
            forumLink: e.target.value,
          }))
        }
      />

      <div className="flex  justify-end">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};
