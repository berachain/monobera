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
import { Address, isAddress, parseAbiItem } from "viem";
import { ActionButton } from "@bera/shared-ui";
import { Tabs } from "./tabs";
import { Icons } from "@bera/ui/icons";

export const CreateProposal = ({
  governorAddress,
}: {
  governorAddress: Address;
}) => {
  const {
    proposal,
    setProposal,
    addProposalAction,
    removeProposalAction,
    submitProposal,
  } = useCreateProposal(governorAddress);
  const [activeTab, setActiveTab] = useState(1);
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

    console.log("Submittin proposal");

    e.actions = proposal.actions
      .map((action, idx): CustomProposalActionErrors => {
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

          if (!action.functionSignature) {
            errors.functionSignature = "Required";
          } else {
            try {
              const abi = parseAbiItem(action.functionSignature);
              if (abi.type !== "function") {
                errors.functionSignature = "This signature is not a function";
              } else {
              }
            } catch (error) {
              errors.functionSignature = "Invalid function signature";
            }
          }
        } else if (action.type === ProposalTypeEnum.UPDATE_REWARDS_GAUGE) {
          if (!action.vault) {
            errors.receiptToken = "Required";
          }
        } else if (action.type === ProposalTypeEnum.ERC20_TRANSFER) {
          if (!action.amount || action.amount === "0") {
            errors.amount = "An amount is required";
          }

          if (!action.to) {
            errors.to = "Required";
          } else if (!isAddress(action.to, { strict: true })) {
            errors.to = "Invalid recipient address";
          }
          if (!action.target) {
            errors.target = "A token is required";
          } else if (!isAddress(action.target, { strict: true })) {
            errors.target = "Invalid token address";
          }
        }
        return errors;
      })
      .filter((e) => Object.values(e).some((v) => v));

    setErrors(e);

    console.log(e);

    if (
      Object.getOwnPropertyNames(e)
        .map((name) => e[name as keyof typeof e])
        .some((v) => {
          if (Array.isArray(v)) {
            return v.length > 0;
          }

          return !!v;
        })
    ) {
      return;
    }

    submitProposal();
  }, [proposal]);

  // this could be a form but we should handle connect modal on submit
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* this one for mobile sticky */}
      <div className="sticky top-[73px] py-4 -my-4 px-4 -mx-4 max-md:border-b border-border z-10 bg-background">
        {/* this one for desktop sticky */}
        <div className="sticky top-[73px] py-4 -my-4 px-4 -mx-4 z-10 bg-background">
          <Tabs
            activeTab={activeTab}
            tabs={[
              { title: "Proposal Content", onClick: () => setActiveTab(0) },
              {
                title: "Code Actions",
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
      </div>
      <div className="md:col-span-3">
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
