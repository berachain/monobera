import Link from "next/link";
import { truncateHash } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { Button } from "@bera/ui/button";

import { Selector } from "./selector";

export default function SelectStep({
  validator,
  validators,
  setValidator,
  pool,
  pools,
  setPool,
}: {
  validator: any;
  validators: any[];
  setValidator: (validator: any) => void;
  pool: any;
  pools: any[];
  setPool: (validator: any) => void;
}) {
  const vote = async () => {
    try {
      const res = await fetch(
        `${blockExplorerUrl}/api/v1/leaderboard/vote?validator=${validator?.address}&pool=${pool?.address}`,
        { method: "POST" },
      );
      const json = await res.json();
      console.log(json);
    } catch (e) {
      console.error(`Error voting: ${e}`);
    }
  };

  return (
    <div className=" flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="font-retro-gaming text-xs leading-5">
            Select Validator
          </div>
          <Selector
            list={validators}
            selected={validator}
            setSelected={setValidator}
          />
          {validator && (
            <Link
              className="text-xs leading-5 underline"
              href={`${blockExplorerUrl}/address/${validator?.address}`}
              target="_blank"
            >
              {truncateHash(validator?.address || "")}
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-retro-gaming text-xs leading-5">Select Pool</div>
          <Selector list={pools} selected={pool} setSelected={setPool} />
          {pool && (
            <Link
              className="text-xs leading-5 underline"
              href={`${blockExplorerUrl}/address/${pool?.address}`}
              target="_blank"
            >
              {truncateHash(pool?.address || "")}
            </Link>
          )}
        </div>
      </div>
      <Button
        className="w-full"
        disabled={!validator || !pool}
        onClick={() => vote()}
      >
        Vote
      </Button>
    </div>
  );
}
