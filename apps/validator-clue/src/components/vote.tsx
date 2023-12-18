import VoteCard from "./vote-card";
import VoteHistory from "./vote-history";

export default function Vote({
  obituaries,
  ...props
}: {
  validators: any[];
  pools: any[];
  obituaries: any[];
}) {
  return (
    <div className="flex h-full w-full flex-wrap gap-4 rounded-sm bg-background p-4 ">
      <VoteCard {...{ obituaries, ...props }} />
      <VoteHistory {...props} />
    </div>
  );
}
