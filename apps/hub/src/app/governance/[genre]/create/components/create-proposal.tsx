"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

import { CreateProposalBody } from "./create-proposal-body";
import { Button } from "@bera/ui/button";
import {
  CustomProposalActionErrors,
  CustomProposalErrors,
  ProposalAction,
} from "~/app/governance/types";
import { getBodyErrors, useCreateProposal } from "~/hooks/useCreateProposal";
import { CreateProposalAction } from "./create-proposal-action";
import { ActionButton } from "@bera/shared-ui";
import { Tabs } from "./tabs";
import { Icons } from "@bera/ui/icons";
import { governorAddress } from "@bera/config";
import { useGovernance } from "../../components/governance-provider";

export const CreateProposal = () => {
  const {
    proposal,
    setProposal,
    addProposalAction,
    removeProposalAction,
    submitProposal,
  } = useCreateProposal({ governorAddress });

  const { dappConfig } = useGovernance();
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<CustomProposalErrors>({
    title: null,
    description: null,
    forumLink: null,
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

  const leaveBodyTab = useCallback(() => {
    const errors = getBodyErrors(proposal, dappConfig);
    if (Object.values(errors).some((v) => v)) {
      setErrors(errors);
    } else setActiveTab(1);
  }, [proposal, dappConfig]);

  const handleSubmitProposal = useCallback(() => {
    submitProposal({
      onError: setErrors,
    });
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
                key={idx}
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
      </div>
    </div>
  );
};
