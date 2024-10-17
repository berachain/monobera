import React from "react";
import { type Token } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { type Address } from "viem";

import { TokenDialog, TokenIcon } from "./";

type Props = {
  token: Token | undefined;
  onTokenSelection?: (token: Token | undefined) => void;
  selectedTokens?: (Token | undefined)[];
  customTokenList?: (Token | undefined)[];
  selectable: boolean;
  filter?: Address[];
  className?: string;
  btnClassName?: string;
  walletAddress?: Address;
  filteredTokenTags?: string[];
  filteredSymbols?: string[];
};

export function SelectToken({
  token = undefined,
  onTokenSelection = undefined,
  selectedTokens = undefined,
  customTokenList = undefined,
  walletAddress,
  selectable,
  filter = [],
  className = "",
  btnClassName = "",
  filteredTokenTags = [],
  filteredSymbols = [],
}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("w-fit max-w-[150px]", className)}>
      <Button
        className={cn(
          "flex h-10 w-full shrink-0 gap-1 border-border bg-background p-2 text-secondary-foreground shadow",
          btnClassName,
        )}
        variant={"outline"}
        onClick={() => selectable && setOpen(true)}
      >
        {token ? (
          <div className="justify-start flex flex-row gap-1 items-center">
            <TokenIcon address={token.address} />
            <span className="w-fit max-w-[140px] overflow-hidden truncate">
              {token?.symbol}{" "}
            </span>
          </div>
        ) : (
          <p
            className="flex flex-row items-center whitespace-nowrap px-1 text-base font-medium"
            suppressHydrationWarning
          >
            {" "}
            Select <span className="ml-1 hidden md:inline"> a token</span>
            {/* <Icons.chevronDown className="ml-1 h-4 w-4" />{" "} */}
          </p>
        )}
        {selectable && <Icons.chevronDown className="h-4 w-4" />}
      </Button>

      {selectable && (
        <TokenDialog
          open={open}
          onSelectedToken={(token: Token | undefined) =>
            onTokenSelection?.(token)
          }
          walletAddress={walletAddress}
          setOpen={setOpen}
          selectedTokens={selectedTokens ?? []}
          focusedToken={token}
          customTokens={customTokenList}
          filter={filter}
          filteredTokenTags={filteredTokenTags}
          filteredSymbols={filteredSymbols}
        />
      )}
    </div>
  );
}
