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
      <div className="flex h-full w-full flex-shrink flex-grow-0 sm:w-auto">
        <VoteCard {...{ obituaries, ...props }} />
      </div>
      <div className="flex h-full w-full flex-shrink flex-grow sm:w-auto">
        <VoteHistory {...props} />
      </div>
    </div>
  );
}
