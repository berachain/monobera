import { cn } from "@bera/ui";
import { useBlockNumber } from "wagmi";

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
export const ProposalTimeline = () => {
  const activeStep: number = 0;
  const now = Date.now();
  return (
    <div className="gap-4 p-5 rounded-sm border border-border relative   ">
      <Step title="Initiated" date={now} isActive={activeStep === 0} />
      <Step
        title="Voting Period Begins"
        date={now + 1000 * 60 * 24}
        isActive={activeStep === 1}
      />
      <Step
        title="Voting Period Ends"
        date={now + 1000 * 60 * 24 * 2}
        isActive={activeStep === 2}
      />
      <Step
        title="Proposal Passed"
        date={now + 1000 * 60 * 24 * 3}
        isActive={activeStep === 3}
      />
    </div>
  );
};
