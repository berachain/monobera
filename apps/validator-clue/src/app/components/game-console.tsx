"use client";

import Link from "next/link";
import { useBeraJs } from "@bera/berajs";
import { cn } from "@bera/ui";
import { useLocalStorage } from "usehooks-ts";

import { tabEnum, type tabEnum as tabEnumT } from "../types";
import ConnectWallet from "./connect-wallet";
import Game from "./game";
import Rules from "./rules";
import SIWE from "./siwe";
import Vote from "./vote";

export default function GameConsole({ tab }: { tab: tabEnumT }) {
  const { isConnected, account } = useBeraJs();
  const [authToken, _] = useLocalStorage<{ token: string; address: string }>(
    "VALCLUE_AUTH_TOKEN",
    { token: "", address: "" },
  );

  const getContent = () => {
    if (tab === tabEnum.GAME) return <Game />;
    else if (tab === tabEnum.RULES) return <Rules />;
    else {
      if (!isConnected) return <ConnectWallet />;
      else if (
        authToken.token === "" ||
        authToken.address === "" ||
        authToken.address !== account
      )
        return <SIWE />;
      else return <Vote />;
    }
  };
  return (
    <div className="flex w-full flex-col gap-4 xl:flex-row">
      <div className="flex w-full flex-row justify-between gap-8 rounded-sm border border-border p-4 xl:w-fit xl:flex-col xl:justify-normal">
        <Link
          href="/?tab=game"
          className={cn(
            "h-11 w-11 cursor-pointer rounded-sm border border-border bg-white p-[10px] text-foreground",
            tab === tabEnum.GAME && "bg-muted",
          )}
        >
          hi
        </Link>
        <Link
          href="/?tab=votes"
          className={cn(
            "h-11 w-11 cursor-pointer rounded-sm border border-border bg-white p-[10px] text-foreground",
            tab === tabEnum.VOTES && "bg-muted",
          )}
        >
          hi
        </Link>
        <Link
          href="/?tab=rules"
          className={cn(
            "h-11 w-11 cursor-pointer rounded-sm border border-border bg-white p-[10px] text-foreground",
            tab === tabEnum.RULES && "bg-muted",
          )}
        >
          hi
        </Link>
      </div>
      <div className="h-[380px] w-full flex-1">{getContent()}</div>
    </div>
  );
}
