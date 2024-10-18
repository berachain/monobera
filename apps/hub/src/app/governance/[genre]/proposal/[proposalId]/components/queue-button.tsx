import { GOVERNANCE_ABI, Proposal } from "@bera/berajs";
import { governanceTimelockAddress } from "@bera/config";
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

export const QueueButton = ({
  proposal,
  title,
}: { proposal: Proposal; title: string }) => {
  const { write, ModalPortal } = useTxn({
    message: "Queuing proposal",
  });

  const { governorAddress } = useGovernance();
  return (
    <>
      {ModalPortal}
      <Dialog>
        <DialogTrigger>
          <Button>Queue</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Queue Proposal</DialogTitle>
          <DialogDescription>
            <p className="mb-4">
              Queueing this proposal will send it into a 3 hour timelock that
              enables execution.
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
                    functionName: "queue",
                    params: [BigInt(proposal.id)],
                  })
                }
              >
                Queue
              </Button>
            </ActionButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
