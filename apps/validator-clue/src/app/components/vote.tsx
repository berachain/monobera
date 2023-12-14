import VoteCard from "./vote-card";
import VoteHistory from "./vote-history";

export default function Vote() {
  return (
    <div className="flex h-full w-full gap-4 rounded-sm bg-background p-4">
      <VoteCard />
      <VoteHistory />
    </div>
  );
}
