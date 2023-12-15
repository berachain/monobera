import { useEffect, useState } from "react";
import { validatorClueEndpoint } from "@bera/config";
import { useLocalStorage } from "usehooks-ts";

import VoteCard from "./vote-card";
import VoteHistory from "./vote-history";

export default function Vote() {
  const [votes, setVotes] = useState<any[]>([]);
  const [authToken, _] = useLocalStorage<{ token: string; address: string }>(
    "VALCLUE_AUTH_TOKEN",
    { token: "", address: "" },
  );

  useEffect(() => {
    void fetchMe();
  }, [authToken, authToken.token]);

  const fetchMe = async () => {
    try {
      const meRes = await fetch(`${validatorClueEndpoint}/api/v1/me`, {
        headers: { Authorization: `Bearer ${authToken.token}` },
        next: { revalidate: 100 },
      });
      if (!meRes.ok) {
        throw new Error(`API responded with status ${meRes.status}`);
      } else {
        const me = await meRes.json();
        console.log(me);
        setVotes(me.votes);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex h-full w-full gap-4 rounded-sm bg-background p-4">
      <VoteCard voted />
      <VoteHistory votes={votes} />
    </div>
  );
}
