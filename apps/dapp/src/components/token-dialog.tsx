"use client";

import React, { useEffect, useState } from "react";
import {
  usePollAssetWalletBalance,
  useSelectedAssetWalletBalance,
  useTokenInformation,
  useTokens,
  type Token,
} from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Balancer } from "react-wrap-balancer";
import { isAddress } from "viem";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelectedToken: (token: Token) => void;
  selectedTokens: (Token | undefined)[];
  focusedToken: Token | undefined;
};

export default function TokenDialog({
  open,
  onSelectedToken,
  setOpen,
  selectedTokens,
  focusedToken = undefined,
}: Props) {
  const [search, setSearch] = useState("");
  const [addTokenOpen, setAddTokenOpen] = useState(false);

  const { tokenList, addNewToken } = useTokens();
  const { read, tokenInformation } = useTokenInformation();
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(tokenList);
  usePollAssetWalletBalance();

  useEffect(() => {
    const filteredTokens = tokenList.filter(
      (token) =>
        token.name.toLowerCase().includes(search.toLowerCase()) ||
        token.symbol.toLowerCase().includes(search.toLowerCase()) ||
        token.address.toLowerCase().includes(search.toLowerCase()),
    );

    if (isAddress(search) && filteredTokens.length === 0) {
      void read({ address: search });
      return;
    }
    setFilteredTokens(filteredTokens);
  }, [read, search]); // Include 'filteredTokens' in the dependency array

  useEffect(() => {
    if (tokenInformation) {
      setFilteredTokens([tokenInformation]);
    }
  }, [tokenInformation]);

  const onTokenSelect = (token: Token) => {
    if (!token.default) {
      setAddTokenOpen(true);
      return;
    }
    onSelectedToken(token);
    setOpen(false);
    setSearch("");
  };

  const onAddToken = (token: Token) => {
    addNewToken(token);
    onSelectedToken(token);
    setSearch("");
    setAddTokenOpen(false);
    setOpen(false);
  };

  const onAddTokenCancel = () => {
    setSearch("");
    setAddTokenOpen(false);
    setOpen(false);
  };

  function isTokenSelected(token: Token): boolean {
    return selectedTokens.some(
      (selectedToken) => selectedToken?.address === token.address,
    );
  }

  const handleOpenChange = () => {
    if (open) {
      setSearch("");
      setAddTokenOpen(false);
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="px-4 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Token search</DialogTitle>
          </DialogHeader>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, symbol or address"
          />
          <div className="grid gap-4 py-4">
            {filteredTokens.map((token, i) => (
              <TokenDialogRow
                key={i}
                token={token}
                isTokenSelected={isTokenSelected(token)}
                focusedToken={focusedToken}
                addTokenOpen={addTokenOpen}
                setAddTokenOpen={setAddTokenOpen}
                onAddToken={onAddToken}
                onAddTokenCancel={onAddTokenCancel}
                onTokenSelect={onTokenSelect}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

type RowProps = {
  token: Token;
  isTokenSelected: boolean;
  focusedToken: Token | undefined;
  addTokenOpen: boolean;
  setAddTokenOpen: (addTokenOpen: boolean) => void;
  onAddToken: (token: Token) => void;
  onAddTokenCancel: () => void;
  onTokenSelect: (token: Token) => void;
};
const TokenDialogRow = ({
  token,
  isTokenSelected,
  focusedToken,
  addTokenOpen,
  setAddTokenOpen,
  onAddToken,
  onAddTokenCancel,
  onTokenSelect,
}: RowProps) => {
  const tokenBalance = Number(
    useSelectedAssetWalletBalance(token?.address ?? "")?.formattedBalance || 0,
  );
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex w-full items-center justify-start gap-2 px-2 text-left",
        isTokenSelected && "opacity-50",
      )}
      onClick={() => {
        onTokenSelect(token);
      }}
    >
      <div className="relative">
        <TokenIcon token={token} />
        {focusedToken?.address === token.address && (
          <div className="absolute bottom-0 right-0 mr-[-4px] mt-[10px] flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white">
            <Icons.check className="h-3 w-3 " />
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-medium">{token?.symbol}</span>
      </div>

      {focusedToken?.address === token.address && (
        <div className="absolute ml-auto"></div>
      )}
      <div className="ml-auto">
        <p>{tokenBalance}</p>
      </div>
      <Dialog open={addTokenOpen} onOpenChange={setAddTokenOpen}>
        <DialogContent className="flex flex-col items-center justify-center gap-2 px-4 sm:max-w-[300px]">
          <TokenIcon token={token} />
          <Badge variant="destructive" className="w-fit gap-1">
            <Icons.warning className="h-4 w-4" />
            Warning
          </Badge>
          <Balancer className="text-center text-xs">
            {`This token doesn't appear on the active token list(s). Anyone can
            create a token, including creating fake versions of existing tokens
            that claim to represent projects`}
          </Balancer>
          <Button onClick={() => onAddToken(token)} size="sm">
            I understand
          </Button>
          <Button size="sm" variant="ghost" onClick={onAddTokenCancel}>
            cancel
          </Button>
        </DialogContent>
      </Dialog>
    </Button>
  );
};
