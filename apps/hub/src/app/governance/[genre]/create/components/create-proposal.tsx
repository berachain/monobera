"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

import { CreateProposalBody } from "./create-proposal-body";
import { Button } from "@bera/ui/button";
import {
  CustomProposalActionErrors,
  CustomProposalErrors,
  ProposalAction,
} from "~/app/governance/types";
import { useCreateProposal } from "~/hooks/useCreateProposal";
import { CreateProposalAction } from "./create-proposal-action";
import { Icons } from "@bera/ui/icons";

export const CreateProposal = () => {
  const { proposal, setProposal, addProposalAction, removeProposalAction } =
    useCreateProposal();
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
            typeof error === "function" ? error(actions[idx]) : error;
          return { ...p, actions };
        });
      },
    [setProposal],
  );

  return (
    <div className="grid grid-cols-4">
      <div>
        <Button onClick={() => setActiveTab(0)}>Proposal Content</Button>
        <Button onClick={() => setActiveTab(1)}>Code Action</Button>
      </div>
      <div className="col-span-3">
        {activeTab === 0 && (
          <CreateProposalBody
            errors={errors}
            setErrors={setErrors}
            onNext={() => setActiveTab(1)}
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
                setAction={createActionUpdateHandler(idx)}
                onDestroy={() => removeProposalAction(idx)}
                errors={errors.actions ? errors.actions[idx] : {}}
              />
            ))}
            <div className="flex items-center justify-between">
              <div>
                <Button prefix={"+"} onClick={addProposalAction} variant="link">
                  Add New Action
                </Button>
              </div>
              <div>
                <Button>Publish</Button>
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
