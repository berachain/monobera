"use client";

import React, { useEffect, useState } from "react";
import {
  useBeraJs,
  usePollAssetWalletBalance,
  useSelectedAssetWalletBalance,
  useTokenInformation,
  useTokens,
  type Token,
} from "@bera/berajs";
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

import { TokenIcon } from "./token-icon";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelectedToken: (token: Token) => void;
  selectedTokens: (Token | undefined)[];
  focusedToken: Token | undefined;
};

export function TokenDialog({
  open,
  onSelectedToken,
  setOpen,
  selectedTokens,
  focusedToken = undefined,
}: Props) {
  const [search, setSearch] = useState("");
  const [addTokenOpen, setAddTokenOpen] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [pendingAddition, setPendingAddition] = useState<boolean>(false);
  const { tokenList, addNewToken } = useTokens();
  const { read, tokenInformation } = useTokenInformation();
  const [filteredTokens, setFilteredTokens] = useState<Token[] | undefined>(
    tokenList,
  );

  useEffect(() => {
    setFilteredTokens(tokenList);
  }, [tokenList]);

  usePollAssetWalletBalance();

  useEffect(() => {
    const filtered = tokenList?.filter(
      (token) =>
        token.name.toLowerCase().includes(search.toLowerCase()) ||
        token.symbol.toLowerCase().includes(search.toLowerCase()) ||
        token.address.toLowerCase().includes(search.toLowerCase()),
    );

    if (isAddress(search) && filtered?.length === 0) {
      void read({ address: search }).catch((error) => {
        setError(error);
      });
      setPendingAddition(true);
      return;
    }
    setPendingAddition(false);
    setFilteredTokens(filtered);
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
    setError(undefined);
  };

  const onAddToken = (token: Token) => {
    addNewToken(token);
    onSelectedToken(token);
    setSearch("");
    setError(undefined);
    setAddTokenOpen(false);
    setOpen(false);
  };

  const onAddTokenCancel = () => {
    setSearch("");
    setError(undefined);
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
        <DialogContent className="max-h-[400px] max-w-[425px] px-4">
          <DialogHeader>
            <DialogTitle>Token search</DialogTitle>
          </DialogHeader>
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setError(undefined);
            }}
            placeholder="Search by name, symbol or address"
          />
          <div className="max-h-[300px] gap-4 overflow-y-auto py-4">
            {!error
              ? filteredTokens?.length
                ? filteredTokens?.map((token, i) => (
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
                      pendingAddition={pendingAddition}
                    />
                  ))
                : "No tokens found"
              : "Address is invalid"}
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
  pendingAddition: boolean;
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
  pendingAddition,
}: RowProps) => {
  const { isConnected } = useBeraJs();
  const tokenBalance = Number(
    useSelectedAssetWalletBalance(token?.address ?? "")?.formattedBalance || 0,
  );
  return (
    <div className="mb-1">
      <Button
        variant="outline"
        className={cn(
          "flex h-auto w-full items-center justify-start gap-2 p-4 text-left shadow",
          isTokenSelected && "cursor-default opacity-50",
        )}
        onClick={() => {
          !isTokenSelected && onTokenSelect(token);
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
        {!pendingAddition && isConnected && (
          <div className="ml-auto">
            <p>{tokenBalance}</p>
          </div>
        )}
        <Dialog open={addTokenOpen} onOpenChange={setAddTokenOpen}>
          <DialogContent className="flex max-w-[425px] flex-col items-center justify-center gap-2 px-4">
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
    </div>
  );
};
