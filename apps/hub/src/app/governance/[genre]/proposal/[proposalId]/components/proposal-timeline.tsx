import { useBlockToTimestamp } from "@bera/berajs";
import { cn } from "@bera/ui";
import {
  ProposalStatus,
  ProposalWithVotesFragment,
} from "@bera/graphql/governance";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

const Step = ({
  title,
  date,
  isActive,
  block,
  bulletClassName,
}: {
  title: string;
  date?: number | Date;
  isActive: boolean;
  block?: number | bigint | string;
  bulletClassName?: string;
}) => {
  const d = block ? useBlockToTimestamp(block) : date;

  return (
    <div className="flex gap-2 items-center pb-16 last:pb-6 group/step">
      <div>
        <div
          className={cn("h-4 w-4 rounded-full relative flex justify-center", {
            [bulletClassName ?? "bg-primary"]: isActive,
            "bg-primary-foreground": !isActive,
          })}
        >
          <div className="h-16 bg-primary-foreground w-[1px] absolute top-full group-last/step:hidden" />
        </div>
      </div>
      <div className="h-4">
        <h3 className="leading-none text-primary mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground">
          {d ? dateFormatter.format(d instanceof Date ? d : d * 1000) : "--"}
        </p>
      </div>
    </div>
  );
};
export const ProposalTimeline = ({
  proposal,
}: { proposal: ProposalWithVotesFragment }) => {
  const steps: ({
    title: string;
    isActive: boolean;
    bulletClassName?: string;
  } & (
    | {
        date: number | Date;
      }
    | {
        block: number | bigint | string;
      }
  ))[] = [
    {
      title: "Initiated",
      date: proposal.createdAt,
      block: proposal.createdAtBlock,
      isActive: proposal.status === ProposalStatus.Pending,
    },
  ];

  if (proposal.status === ProposalStatus.CanceledByUser) {
    steps.push({
      title: "Canceled by proposer",
      date: proposal.canceledAt,
      isActive: true,
      bulletClassName: "bg-destructive-foreground",
    });
  } else {
    steps.push({
      title: "Voting Period Begins",
      block: proposal.voteStartBlock ?? 0,
      isActive: proposal.status === ProposalStatus.Active,
    });

    if (proposal.status === ProposalStatus.Active) {
      steps.push({
        title: "Voting Period Ends",
        block: proposal.voteEndBlock,
        isActive: false,
      });
    } else if (
      proposal.status === ProposalStatus.Defeated ||
      proposal.status === ProposalStatus.QuorumNotReached
    ) {
      steps.push({
        title: "Proposal Defeated",
        bulletClassName: "bg-destructive-foreground",
        block: proposal.voteEndBlock,
        isActive: true,
      });
    } else if (proposal.status === ProposalStatus.Pending) {
      steps.push({
        title: "Voting Period Ends",
        block: proposal.voteEndBlock,
        isActive: false,
      });
    } else {
      steps.push({
        title: "Proposal Passed",
        block: proposal.voteEndBlock,
        bulletClassName: "bg-success-foreground",
        isActive: proposal.status === ProposalStatus.PendingQueue,
      });

      if (proposal.status !== ProposalStatus.PendingQueue) {
        steps.push({
          title: "Proposal Queued",
          block: proposal.voteEndBlock,
          isActive: proposal.status === ProposalStatus.InQueue,
        });

        if (proposal.status === ProposalStatus.CanceledByGuardian) {
          steps.push({
            title: "Canceled by guardian",
            date: proposal.canceledAt,
            isActive: true,
            bulletClassName: "bg-destructive-foreground",
          });
        } else if (proposal.status === ProposalStatus.Executed) {
          steps.push({
            title: "Proposal Executed",
            date: proposal.executedAt,
            isActive: proposal.status === ProposalStatus.Executed,
            bulletClassName: "bg-success-foreground",
          });
        } else if (proposal.status === ProposalStatus.PendingExecution) {
          steps.push({
            title: "Proposal Executes",
            date: new Date(0),
            isActive: true,
          });
        }
      }
    }
  }

  return (
    <div className="gap-4 p-5 rounded-sm border border-border relative   ">
      {steps.map((step) => (
        <Step key={step.title} {...step} />
      ))}
    </div>
  );
};
