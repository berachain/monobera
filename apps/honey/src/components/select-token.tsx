import React from "react";
import { type Token } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import TokenDialog from "~/components/token-dialog";
import { TokenIcon } from "~/components/token-icon";

type Props = {
  token: Token | undefined;
  onTokenSelection?: (token: Token) => void;
  selectedTokens?: (Token | undefined)[];
  selectable: boolean;
  weight?: number;
};

export default function SelectToken({
  token = undefined,
  onTokenSelection = undefined,
  selectedTokens = undefined,
  selectable,
  weight = undefined,
}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="my-4 w-fit">
      <Button
        className="hover:text-primary-text flex shrink-0 gap-2 p-0 hover:bg-transparent"
        variant="ghost"
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
          <p className="flex flex-row items-center whitespace-nowrap">
            {" "}
            Select Token <Icons.chevronDown className="ml-2 h-4 w-4" />{" "}
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
