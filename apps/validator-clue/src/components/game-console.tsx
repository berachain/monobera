"use client";

import Link from "next/link";
import { useBeraJs } from "@bera/berajs";
import { cn } from "@bera/ui";
import { useLocalStorage } from "usehooks-ts";

import { tabEnum, type tabEnum as tabEnumT } from "../app/types";
import ConnectWallet from "./connect-wallet";
import Game from "./game";
import Rules from "./rules";
import SIWE from "./siwe";
import Vote from "./vote";

export default function GameConsole({
  tab,
  ...props
}: {
  tab: tabEnumT;
  validators: any[];
  pools: any[];
  obituaries: any[];
}) {
  const { isConnected, account } = useBeraJs();
  const [authToken, _] = useLocalStorage<{ token: string; address: string }>(
    "VALCLUE_AUTH_TOKEN",
    { token: "", address: "" },
  );

  const getContent = () => {
    if (tab === tabEnum.GAME) return <Game {...props} />;
    else if (tab === tabEnum.RULES) return <Rules />;
    else {
      if (!isConnected) return <ConnectWallet />;
      else if (
        authToken.token === "" ||
        authToken.address === "" ||
        authToken.address !== account
      )
        return <SIWE />;
      else return <Vote {...props} />;
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
          <Item1 />
        </Link>
        <Link
          href="/?tab=votes"
          className={cn(
            "h-11 w-11 cursor-pointer rounded-sm border border-border bg-white p-[10px] text-foreground",
            tab === tabEnum.VOTES && "bg-muted",
          )}
        >
          <Item2 />
        </Link>
        <Link
          href="/?tab=rules"
          className={cn(
            "h-11 w-11 cursor-pointer rounded-sm border border-border bg-white p-[10px] text-foreground",
            tab === tabEnum.RULES && "bg-muted",
          )}
        >
          <Item3 />
        </Link>
      </div>
      <div className="h-[400px] w-full flex-auto">{getContent()}</div>
    </div>
  );
}

const Item1 = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="11.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="6.25" y="0.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10.75" y="0.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="11.5" y="0.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="6.25" y="1.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7" y="1.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="16" y="1.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="16.75" y="1.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="11.5" y="2.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7" y="3" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="3" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10.75" y="3" width="0.75" height="0.75" fill="#713F12" />
    <rect x="11.5" y="3" width="0.75" height="0.75" fill="#713F12" />
    <rect x="12.25" y="3" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="3" width="0.75" height="0.75" fill="#713F12" />
    <rect x="16" y="3" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7" y="3.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="3.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="3.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10" y="3.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10.75" y="3.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="11.5" y="3.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="12.25" y="3.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="13" y="3.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="3.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="3.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="16" y="3.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7" y="4.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="4.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="4.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="9.25" y="4.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10" y="4.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10.75" y="4.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="12.25" y="4.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="13" y="4.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="13.75" y="4.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="4.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="4.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="16" y="4.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7" y="5.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="5.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="9.25" y="5.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10" y="5.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="13" y="5.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="13.75" y="5.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="5.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="16" y="5.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7" y="6" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="6" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="6" width="0.75" height="0.75" fill="#713F12" />
    <rect x="16" y="6" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7" y="6.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="6.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="6.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="16" y="6.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7" y="7.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="7.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="7.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="7.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="8.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="8.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="8.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="8.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="9" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="9" width="0.75" height="0.75" fill="#713F12" />
    <rect x="9.25" y="9" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10" y="9" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10.75" y="9" width="0.75" height="0.75" fill="#713F12" />
    <rect x="11.5" y="9" width="0.75" height="0.75" fill="#713F12" />
    <rect x="12.25" y="9" width="0.75" height="0.75" fill="#713F12" />
    <rect x="13" y="9" width="0.75" height="0.75" fill="#713F12" />
    <rect x="13.75" y="9" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="9" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="9" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="9.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="9.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="9.25" y="9.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10" y="9.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10.75" y="9.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="11.5" y="9.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="12.25" y="9.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="13" y="9.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="13.75" y="9.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="9.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="9.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="12" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="12" width="0.75" height="0.75" fill="#713F12" />
    <rect x="9.25" y="12" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10" y="12" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10.75" y="12" width="0.75" height="0.75" fill="#713F12" />
    <rect x="11.5" y="12" width="0.75" height="0.75" fill="#713F12" />
    <rect x="12.25" y="12" width="0.75" height="0.75" fill="#713F12" />
    <rect x="13" y="12" width="0.75" height="0.75" fill="#713F12" />
    <rect x="13.75" y="12" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="12" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="12" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="12.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="12.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="12.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="12.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="13.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="13.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="13.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="13.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1.75" y="14.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="2.5" y="14.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="3.25" y="14.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="4" y="14.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="4.75" y="14.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="5.5" y="14.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="6.25" y="14.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7" y="14.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="14.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="14.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10.75" y="14.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="11.5" y="14.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="14.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="14.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1" y="15" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1.75" y="15" width="0.75" height="0.75" fill="#713F12" />
    <rect x="2.5" y="15" width="0.75" height="0.75" fill="#713F12" />
    <rect x="3.25" y="15" width="0.75" height="0.75" fill="#713F12" />
    <rect x="4" y="15" width="0.75" height="0.75" fill="#713F12" />
    <rect x="4.75" y="15" width="0.75" height="0.75" fill="#713F12" />
    <rect x="5.5" y="15" width="0.75" height="0.75" fill="#713F12" />
    <rect x="6.25" y="15" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7" y="15" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="15" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="15" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10.75" y="15" width="0.75" height="0.75" fill="#713F12" />
    <rect x="11.5" y="15" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="15" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="15" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1" y="15.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1.75" y="15.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="15.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="15.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="11.5" y="15.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="15.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="15.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="16" y="15.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="16.75" y="15.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="17.5" y="15.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="18.25" y="15.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="19" y="15.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="19.75" y="15.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="20.5" y="15.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="21.25" y="15.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1.75" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="11.5" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="16" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="16.75" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="17.5" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="18.25" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="19" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="19.75" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="20.5" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="21.25" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="22" y="16.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1" y="17.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1.75" y="17.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="17.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="17.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="11.5" y="17.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="17.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="17.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="21.25" y="17.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="22" y="17.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1" y="18" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1.75" y="18" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="18" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="18" width="0.75" height="0.75" fill="#713F12" />
    <rect x="11.5" y="18" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="18" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="18" width="0.75" height="0.75" fill="#713F12" />
    <rect x="21.25" y="18" width="0.75" height="0.75" fill="#713F12" />
    <rect x="22" y="18" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1" y="18.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1.75" y="18.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="18.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="18.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="18.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="18.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="21.25" y="18.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="22" y="18.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1" y="19.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1.75" y="19.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="19.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="19.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="19.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="19.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="21.25" y="19.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="22" y="19.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1" y="20.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1.75" y="20.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="20.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="20.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="20.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="20.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="21.25" y="20.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="22" y="20.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1" y="21" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1.75" y="21" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="21" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="21" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="21" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="21" width="0.75" height="0.75" fill="#713F12" />
    <rect x="21.25" y="21" width="0.75" height="0.75" fill="#713F12" />
    <rect x="22" y="21" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1" y="21.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1.75" y="21.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="21.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="21.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="21.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="21.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="21.25" y="21.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="22" y="21.75" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1" y="22.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1.75" y="22.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="22.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="22.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="22.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="22.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="21.25" y="22.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="22" y="22.5" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="1.75" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="2.5" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="3.25" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="4" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="4.75" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="5.5" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="6.25" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="7.75" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="8.5" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="9.25" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="10.75" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="11.5" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="12.25" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="13" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="13.75" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="14.5" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="15.25" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="16" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="16.75" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="17.5" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="18.25" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="19" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="19.75" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="20.5" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="21.25" y="23.25" width="0.75" height="0.75" fill="#713F12" />
    <rect x="22" y="23.25" width="0.75" height="0.75" fill="#713F12" />
  </svg>
);

const Item2 = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 5V4H6V5H5V17H19V5H18ZM16 9H15V10H14V11H13V12H12V13H10V12H9V11H8V10H9V9H10V10H12V9H13V8H14V7H15V8H16V9Z"
      fill="#713F12"
    />
    <path
      d="M23 15V19H22V20H2V19H1V15H2V14H4V16H3V18H21V16H20V14H22V15H23Z"
      fill="#713F12"
    />
  </svg>
);
const Item3 = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_6115_22219)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3H20V5H22V11H20V19H18V5H6V3ZM14 17V15H6V5H4V15H2V17V19H4V21H18V19H16V17H14ZM14 17V19H4V17H14ZM8 7H16V9H8V7ZM16 11H8V13H16V11Z"
        fill="#713F12"
      />
    </g>
    <defs>
      <clipPath id="clip0_6115_22219">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
