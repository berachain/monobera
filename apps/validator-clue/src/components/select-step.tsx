import { useState } from "react";
import Link from "next/link";
import { truncateHash } from "@bera/berajs";
import { blockExplorerUrl, validatorClueEndpoint } from "@bera/config";
import { Button } from "@bera/ui/button";
import { useLocalStorage } from "usehooks-ts";

import { Selector } from "./selector";

export default function SelectStep({
  validator,
  validators,
  setValidator,
  pool,
  pools,
  setPool,
  setVoteSuccess,
}: {
  validator: any;
  validators: any[];
  setValidator: (validator: any) => void;
  pool: any;
  pools: any[];
  setPool: (validator: any) => void;
  setVoteSuccess: (success: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [authToken, _] = useLocalStorage<{ token: string; address: string }>(
    "VALCLUE_AUTH_TOKEN",
    { token: "", address: "" },
  );
  const vote = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${validatorClueEndpoint}/vote`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken.token}` },
        body: JSON.stringify({
          accused: validator.address,
          pool: pool.address,
        }),
      });
      const json = await res.json();
      console.log(json);
      setVoteSuccess(true);
    } catch (e) {
      console.error(`Error voting: ${e}`);
      setVoteSuccess(false);
    }
    setLoading(false);
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
        disabled={!validator || !pool || loading}
        onClick={() => vote()}
      >
        Vote
      </Button>
    </div>
  );
}
