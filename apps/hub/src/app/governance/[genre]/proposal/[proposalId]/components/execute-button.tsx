import React from "react";
import { GOVERNANCE_ABI, Proposal } from "@bera/berajs";
import { ActionButton, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { useGovernance } from "~/app/governance/[genre]/components/governance-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { StatusBadge } from "~/app/governance/components/status-badge";

export const ExecuteButton = ({
  proposal,
  title,
}: { proposal: Proposal; title: string }) => {
  const { write, ModalPortal } = useTxn({
    message: "Executing proposal",
  });

  const { governorAddress } = useGovernance();

  return (
    <>
      {ModalPortal}
      <Dialog>
        <DialogTrigger>
          <Button>Execute</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Execute Proposal</DialogTitle>
          <DialogDescription>
            <p className="mb-4">
              Executing this proposal will enable the code actions to be signed
              and approved by the governor.
            </p>
            <div className="rounded-sm border border-border p-4">
              <h3 className="font-semibold mb-3 line-clamp-1 text-base hyphens-auto text-foreground">
                {title}
              </h3>
              <StatusBadge proposal={proposal} />
            </div>
          </DialogDescription>
          <DialogFooter>
            <ActionButton>
              <Button
                className="w-full"
                onClick={() =>
                  write({
                    address: governorAddress,
                    abi: GOVERNANCE_ABI,
                    functionName: "execute",
                    params: [BigInt(proposal.id)],
                  })
                }
              >
                Execute
              </Button>
            </ActionButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
