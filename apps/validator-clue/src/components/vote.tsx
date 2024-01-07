import { useState } from "react";
import { cn } from "@bera/ui";

import VoteCard from "./vote-card";
import VoteHistory from "./vote-history";

export default function Vote({
  obituaries,
  ...props
}: {
  validators: any[];
  pools: any[];
  obituaries: any[];
  epoch: any;
}) {
  const [tab, setTab] = useState<"vote" | "history">("vote");
  return (
    <>
      <div className="flex h-full flex-col md:hidden">
        <div className="flex gap-3">
          <div
            className={cn(
              "font-retro-gaming cursor-pointer rounded-t-sm bg-background px-3 py-1 leading-6 text-muted-foreground",
              tab === "vote" && "bg-foreground text-muted",
            )}
            onClick={() => setTab("vote")}
          >
            Vote
          </div>
          <div
            className={cn(
              "font-retro-gaming cursor-pointer rounded-t-sm bg-background px-3 py-1 leading-6 text-muted-foreground",
              tab === "history" && "bg-foreground text-muted",
            )}
            onClick={() => setTab("history")}
          >
            History
          </div>
        </div>

        {tab === "vote" && <VoteCard {...{ obituaries, ...props }} />}
        {tab === "history" && <VoteHistory {...props} />}
      </div>
      <div className="hidden h-full w-full gap-4 rounded-sm sm:rounded-tl-none md:flex md:rounded-tl-sm">
        <VoteCard {...{ obituaries, ...props }} />
        <VoteHistory {...props} />
      </div>
    </>
  );
}
