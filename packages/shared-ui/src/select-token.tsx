import React from "react";
import { type Token } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { useMediaQuery } from "usehooks-ts";

import { TokenDialog, TokenIcon } from "./";

type Props = {
  token: Token | undefined;
  onTokenSelection?: (token: Token) => void;
  selectedTokens?: (Token | undefined)[];
  selectable: boolean;
  weight?: number;
  className?: string;
};

export function SelectToken({
  token = undefined,
  onTokenSelection = undefined,
  selectedTokens = undefined,
  selectable,
  weight = undefined,
  className = "",
}: Props) {
  const [open, setOpen] = React.useState(false);
  const isMd = useMediaQuery("(min-width: 768px)");

  return (
    <div className={cn("my-4 w-fit", className)}>
      <Button
        className="flex h-fit shrink-0 gap-2 rounded-xl p-1 "
        variant={"outline"}
        onClick={() => selectable && setOpen(true)}
      >
        {token ? (
          <>
            <TokenIcon token={token} />
            {token?.symbol}{" "}
            {weight && <span className="text-muted-foreground">{weight}%</span>}
            {selectable && <Icons.chevronDown className="h-4 w-4" />}
          </>
        ) : (
          <p className="flex flex-row items-center whitespace-nowrap px-2 py-1 text-sm font-medium">
            {" "}
            {isMd ? "Select a token " : "Select"}
            <Icons.chevronDown className="ml-2 h-4 w-4" />{" "}
          </p>
        )}
      </Button>

      {selectable && (
        <TokenDialog
          open={open}
          onSelectedToken={(token: Token) =>
            onTokenSelection && onTokenSelection(token)
          }
          setOpen={setOpen}
          selectedTokens={selectedTokens ?? []}
          focusedToken={token}
        />
      )}
    </div>
  );
}
