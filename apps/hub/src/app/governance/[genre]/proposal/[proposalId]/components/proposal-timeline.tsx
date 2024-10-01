import { Proposal } from "@bera/berajs";
import { ProposalStatus } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1/gov";
import { cn } from "@bera/ui";
import { StatusEnum } from "~/app/governance/types";

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
}: { title: string; date: number | Date; isActive: boolean }) => {
  return (
    <div className="flex gap-2 items-center pb-16 last:pb-6 group/step">
      <div>
        <div
          className={cn("h-4 w-4 rounded-full relative flex justify-center", {
            "bg-primary": isActive,
            "bg-primary-foreground": !isActive,
          })}
        >
          <div className="h-16 bg-primary-foreground w-[1px] absolute top-full group-last/step:hidden" />
        </div>
      </div>
      <div className="h-4">
        <h3 className="leading-none text-primary mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground">
          {dateFormatter.format(date)}
        </p>
      </div>
    </div>
  );
};
export const ProposalTimeline = ({ proposal }: { proposal: Proposal }) => {
  const steps = [
    {
      title: "Initiated",
      date: new Date(proposal.createdAt),
      isActive: proposal.status === StatusEnum.PENDING,
    },
  ];

  if (proposal.status === StatusEnum.CANCELED_BY_USER) {
    steps.push({
      title: "Canceled by proposer",
      date: new Date(proposal.createdAt),
      isActive: true,
    });
  } else {
    steps.push({
      title: "Voting Period Begins",
      date: new Date(proposal.start.timestamp),
      isActive: proposal.status === StatusEnum.ACTIVE,
    });

    if (proposal.status === StatusEnum.ACTIVE) {
      steps.push({
        title: "Voting Period Ends",
        date: new Date(proposal.start.timestamp),
        isActive: false,
      });
    } else if (proposal.status === StatusEnum.DEFEATED) {
      steps.push({
        title: "Proposal Defeated",
        date: new Date(0),
        isActive: true,
      });
    } else {
      steps.push({
        title: "Proposal Passed",
        date: new Date(0),
        isActive: proposal.status === StatusEnum.PENDING_QUEUE,
      });

      if (proposal.status !== StatusEnum.PENDING_QUEUE) {
        steps.push({
          title: "Proposal Queued",
          date: new Date(0),
          isActive: proposal.status === StatusEnum.PENDING_EXECUTION,
        });

        if (proposal.status === StatusEnum.CANCELED_BY_GUARDIAN) {
          steps.push({
            title: "Canceled by guardian",
            date: new Date(0),
            isActive: true,
          });
        } else if (proposal.status === StatusEnum.EXECUTED) {
          steps.push({
            title: "Proposal Executed",
            date: new Date(0),
            isActive: proposal.status === StatusEnum.EXECUTED,
          });
        } else if (proposal.status === StatusEnum.PENDING_EXECUTION) {
          steps.push({
            title: "Proposal Executs",
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
