import { useBlockNumber } from "wagmi";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

const Step = ({ title, date }: { title: string; date: number | Date }) => {
  return (
    <div className="flex gap-2 items-center pb-16 last:pb-6 group/step">
      <div>
        <div className="h-4 w-4 rounded-full bg-primary relative flex justify-center">
          <div className="h-16 bg-border w-[1px] absolute top-full group-last/step:hidden" />
        </div>
      </div>
      <div className="h-4">
        <h3 className="text-primary leading-none">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {dateFormatter.format(date)}
        </p>
      </div>
    </div>
  );
};
export const ProposalTimeline = () => {
  const now = Date.now();
  return (
    <div className="gap-4 p-5 rounded-sm border border-border relative   ">
      <Step title="Initiated" date={now} />
      <Step title="Voting Period Begins" date={now + 1000 * 60 * 24} />
      <Step title="Voting Period Ends" date={now + 1000 * 60 * 24 * 2} />
      <Step title="Proposal Passed" date={now + 1000 * 60 * 24 * 3} />
    </div>
  );
};
