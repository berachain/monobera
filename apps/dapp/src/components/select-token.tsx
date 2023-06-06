import React from "react";
import { type Token } from "@bera/berajs";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import TokenDialog from "./token-dialog";

type Props = {
  token: Token | undefined;
  onTokenSelection: (token: Token) => void;
  selectedTokens: Token[];
};

export default function SelectToken({
  token = undefined,
  onTokenSelection,
  selectedTokens,
}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="my-4 w-[160px]">
      <Button
        className="hover:text-primary-text flex shrink-0 gap-2 p-0 hover:bg-transparent"
        variant="ghost"
        onClick={() => setOpen(true)}
      >
        {token ? (
          <>
            <Avatar className="h-12 w-12">
              <AvatarImage src={`/icons/${token?.symbol.toLowerCase()}.jpg`} />
              <AvatarFallback className="font-bold">
                {token?.symbol.slice(0, 3)}
              </AvatarFallback>
            </Avatar>
            {token?.symbol}
            <Icons.chevronDown className="h-4 w-4" />
          </>
        ) : (
          <p className="flex flex-row items-center whitespace-nowrap">
            {" "}
            Select Token <Icons.chevronDown className="ml-2 h-4 w-4" />{" "}
          </p>
        )}
      </Button>

      <TokenDialog
        open={open}
        onSelectedToken={(token: Token) => onTokenSelection(token)}
        setOpen={setOpen}
        selectedTokens={selectedTokens}
        focusedToken={token}
      />
    </div>
  );
}
