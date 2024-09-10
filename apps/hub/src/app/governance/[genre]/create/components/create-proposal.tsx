"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

import { CreateProposalBody } from "./create-proposal-body";
import { Button } from "@bera/ui/button";
import {
  CustomProposalActionErrors,
  CustomProposalErrors,
  ProposalAction,
  ProposalTypeEnum,
} from "~/app/governance/types";
import { useCreateProposal } from "~/hooks/useCreateProposal";
import { CreateProposalAction } from "./create-proposal-action";
import { isAddress, parseAbiItem } from "viem";
import { ActionButton } from "@bera/shared-ui";
import { Tabs } from "./tabs";
import { Icons } from "@bera/ui/icons";

export const CreateProposal = () => {
  const {
    proposal,
    setProposal,
    addProposalAction,
    removeProposalAction,
    submitProposal,
  } = useCreateProposal();
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<CustomProposalErrors>({
    title: false,
    description: false,
    forumLink: false,
  });

  const createActionUpdateHandler = useCallback(
    (idx: number): Dispatch<SetStateAction<ProposalAction>> =>
      (action) => {
        setProposal((p) => {
          const actions = [...p.actions];
          actions[idx] =
            typeof action === "function" ? action(actions[idx]) : action;
          return { ...p, actions };
        });
      },
    [setProposal],
  );

  const createActionErrorUpdateHandler = useCallback(
    (idx: number): Dispatch<SetStateAction<CustomProposalActionErrors>> =>
      (error) => {
        setErrors((p) => {
          const actions = p.actions ? [...p.actions] : [];
          actions[idx] =
            typeof error === "function" ? error(actions[idx] ?? {}) : error;
          return { ...p, actions };
        });
      },
    [setProposal],
  );

  const getBodyErrors = useCallback(() => {
    const e: CustomProposalErrors = {};
    if (proposal.title.length === 0) {
      e.title = "Title is required";
    }

    if (proposal.description.length === 0) {
      e.description = "Description is required";
    }

    if (proposal.forumLink.length === 0) {
      e.forumLink = "Forum link is required";
    } else if (!proposal.forumLink.startsWith("https://")) {
      e.forumLink = "Forum link must start with https://";
    } else if (!URL.canParse(proposal.forumLink)) {
      e.forumLink = "Invalid link";
    }

    return e;
  }, [proposal]);

  const leaveBodyTab = useCallback(() => {
    const errors = getBodyErrors();
    if (Object.values(errors).some((v) => v)) {
      setErrors(errors);
    } else setActiveTab(1);
  }, [proposal]);

  const handleSubmitProposal = useCallback(() => {
    const e: CustomProposalErrors = getBodyErrors();

    e.actions = proposal.actions.map(
      (action, idx): CustomProposalActionErrors => {
        const errors: CustomProposalActionErrors = {};

        if (action.type === ProposalTypeEnum.CUSTOM_PROPOSAL) {
          if (!action.target) {
            errors.target = "Required";
          } else if (!isAddress(action.target, { strict: true })) {
            errors.target = "Invalid address";
          }

          if (!action.target) {
            errors.target = "Required";
          }

          if (!action.ABI) {
            errors.ABI = "Required";
          } else {
            try {
              const abi = parseAbiItem(action.ABI);
              if (abi.type !== "function") {
                errors.ABI = "This signature is not a function";
              } else {
              }
            } catch (error) {
              errors.ABI = "Invalid ABI";
            }
          }
        } else if (action.type === ProposalTypeEnum.UPDATE_REWARDS_GAUGE) {
          const errors: CustomProposalActionErrors = {};

          if (!action.receiptToken) {
            errors.receiptToken = "Required";
          }
        }
        return errors;
      },
    );

    setErrors(e);

    if (Object.values(e).some((v) => v)) {
      return;
    }

    submitProposal();
  }, [proposal]);

  // this could be a form but we should handle connect modal on submit
  return (
    <div className="grid grid-cols-4 gap-6">
      <div>
        <Tabs
          activeTab={activeTab}
          tabs={[
            { title: "Proposal Content", onClick: () => setActiveTab(0) },
            {
              title: "Code Action",
              onClick: leaveBodyTab,
              disabled: !!(
                errors.title ||
                errors.description ||
                errors.forumLink
              ),
            },
          ]}
        />
      </div>
      <div className="col-span-3">
        {activeTab === 0 && (
          <CreateProposalBody
            errors={errors}
            setErrors={setErrors}
            onNext={leaveBodyTab}
            proposal={proposal}
            setProposal={setProposal}
          />
        )}
        {activeTab > 0 && (
          <>
            {proposal.actions.map((action, idx) => (
              <CreateProposalAction
                idx={idx}
                action={action}
                setErrors={createActionErrorUpdateHandler(idx)}
                setAction={createActionUpdateHandler(idx)}
                onDestroy={() => removeProposalAction(idx)}
                errors={errors.actions ? errors.actions[idx] : {}}
              />
            ))}
            <div className="flex items-center justify-between">
              <div>
                <Button size="sm" onClick={addProposalAction} variant="link">
                  <Icons.plusCircle className="mr-1" /> Add New Action
                </Button>
              </div>
              <div>
                <ActionButton>
                  <Button onClick={handleSubmitProposal}>Publish</Button>
                </ActionButton>
              </div>
            </div>
          </>
        )}

        {/* {proposal.proposalType === ProposalTypeEnum.UPDATE_REWARDS_GAUGE && (
          <UpdateFriendsOfChef
            title={proposal.title}
            description={proposal.description}
          />
        )} */}
      </div>
    </div>
  );
};
