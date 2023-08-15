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
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Balancer } from "react-wrap-balancer";
import { isAddress } from "viem";

import { SearchInput } from "./search-input";
import { TokenIcon } from "./token-icon";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelectedToken: (token: Token) => void;
  selectedTokens: (Token | undefined)[];
  focusedToken: Token | undefined;
  customTokens?: Token[];
};

export function TokenDialog({
  open,
  onSelectedToken,
  setOpen,
  selectedTokens,
  focusedToken = undefined,
  customTokens = undefined,
}: Props) {
  const [search, setSearch] = useState("");
  const [addTokenOpen, setAddTokenOpen] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [pendingAddition, setPendingAddition] = useState<boolean>(false);
  const [managingTokens, setManagingTokens] = useState<boolean>(false);
  const {
    tokenList,
    customTokenList,
    featuredTokenList,
    addNewToken,
    removeToken,
  } = useTokens();
  const { read, tokenInformation } = useTokenInformation();
  const [filteredTokens, setFilteredTokens] = useState<Token[] | undefined>(
    customTokens ? customTokens : tokenList,
  );

  useEffect(() => {
    if (!customTokens) {
      setFilteredTokens(tokenList);
    }
  }, [tokenList]);

  useEffect(() => {
    setManagingTokens(false);
    setSearch("");
    setError(undefined);
  }, [open]);
  usePollAssetWalletBalance();

  useEffect(() => {
    if (!customTokens) {
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
    }
  }, [read, search]); // Include 'filteredTokens' in the dependency array

  useEffect(() => {
    if (tokenInformation) {
      setFilteredTokens([tokenInformation]);
    }
  }, [tokenInformation]);

  const onTokenSelect = (token: Token) => {
    if (!token.default && !customTokens) {
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
        {!managingTokens && (
          <DialogContent className="flex max-h-[400px] max-w-[425px] flex-col gap-4 rounded-2xl px-4">
            <DialogHeader>
              <DialogTitle className="text-lg">Select a token</DialogTitle>
            </DialogHeader>
            {!customTokens && (
              <SearchInput
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setError(undefined);
                }}
                placeholder="Search by name, symbol or address"
              />
            )}
            {!customTokens && (
              <div className="flex flex-wrap gap-2">
                {featuredTokenList?.map((token) => {
                  return (
                    <Badge
                      key={token.address}
                      variant={"secondary"}
                      className={cn(
                        "w-fit",
                        isTokenSelected(token) && "opacity-50",
                      )}
                      onClick={() =>
                        !isTokenSelected(token) && onTokenSelect(token)
                      }
                    >
                      <TokenIcon token={token} className="h-6 w-6" />
                      {token.symbol}
                    </Badge>
                  );
                })}
              </div>
            )}
            <div className="h-px w-full border-x-0 border-b-0 border-t border-solid border-border" />
            <div className="max-h-[300px] overflow-y-auto ">
              {!error ? (
                filteredTokens?.length ? (
                  filteredTokens?.map((token, i) => (
                    <TokenDialogRow
                      key={i}
                      token={token}
                      isTokenSelected={isTokenSelected(token)}
                      focusedToken={focusedToken}
                      addTokenOpen={addTokenOpen}
                      setAddTokenOpen={onAddTokenCancel}
                      onAddToken={onAddToken}
                      onAddTokenCancel={onAddTokenCancel}
                      onTokenSelect={onTokenSelect}
                      pendingAddition={pendingAddition}
                    />
                  ))
                ) : (
                  <Alert variant={"info"}>
                    <AlertTitle>Token not found</AlertTitle>
                    <AlertDescription>
                      You can add tokens by searching for their address.
                    </AlertDescription>
                  </Alert>
                )
              ) : (
                <Alert variant={"destructive"}>
                  <AlertTitle>Invalid address</AlertTitle>
                  <AlertDescription>
                    Try again with a valid token address.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="h-px w-full border-x-0 border-b-0 border-t border-solid border-border" />
            {!customTokens && (
              <div
                className="flex flex-row items-center justify-center gap-1 self-center text-xs text-muted-foreground"
                onClick={() => setManagingTokens(true)}
              >
                <Icons.edit className="h-3 w-3" /> Manage custom tokens
              </div>
            )}
          </DialogContent>
        )}
        {managingTokens && (
          <DialogContent className="flex w-full flex-col">
            <DialogHeader>
              <DialogTitle className="flex flex-row items-center justify-start gap-2 text-lg">
                {" "}
                <Icons.chevronLeft onClick={() => setManagingTokens(false)} />
                Manage
              </DialogTitle>
            </DialogHeader>
            <p className="self-center text-sm font-medium">Custom tokens</p>
            <div className="h-px w-full border-x-0 border-b-0 border-t border-solid border-border" />
            <div className="text-xs font-medium text-muted-foreground">
              ({customTokenList?.length ?? 0}) Custom tokens
            </div>
            <div>
              {customTokenList?.map((token) => {
                return (
                  <div
                    className="flex w-full flex-row items-center justify-between rounded-lg p-2 hover:bg-muted"
                    key={token.address}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <TokenIcon token={token} className="h-6 w-6" />
                      <p className="text-sm font-medium text-muted-foreground">
                        {token.symbol}
                      </p>
                    </div>
                    <Icons.close
                      className="h-4 w-4"
                      onClick={() => removeToken(token)}
                    />
                  </div>
                );
              })}
            </div>
          </DialogContent>
        )}
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
  onTokenSelect,
  pendingAddition,
}: RowProps) => {
  const { isConnected } = useBeraJs();
  const tokenBalance = Number(
    useSelectedAssetWalletBalance(token?.address ?? "")?.formattedBalance || 0,
  );
  return (
    <div>
      <Button
        variant="ghost"
        className={cn(
          "flex h-auto w-full items-center justify-start gap-2 p-4 text-left shadow-none ",
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
          <div className="ml-auto text-muted-foreground ">
            <p>{tokenBalance}</p>
          </div>
        )}
        <Dialog open={addTokenOpen} onOpenChange={setAddTokenOpen}>
          <DialogContent className="flex flex-col items-center justify-center gap-3 px-4 md:w-[350px]">
            <Icons.tooltip
              style={{ height: "64px", width: "64px", color: "#DC2626 " }}
            />
            <p className="text-lg font-semibold">Import token</p>
            <Balancer className="text-center text-xs font-medium text-muted-foreground">
              {`This token doesn't appear on the active token list(s). Anyone can
            create a token, including creating fake versions of existing tokens
            that claim to represent projects`}
            </Balancer>
            <div className="flex w-full flex-col items-center gap-2 rounded-lg bg-muted p-2">
              <TokenIcon token={token} className="bg-muted-foreground" />
              <h4 className="text-sm font-semibold">{token?.name}</h4>
              <Balancer className="text-xs font-normal text-muted-foreground">
                {token.address}
              </Balancer>
              <Badge variant="destructive" className="w-fit gap-1">
                <Icons.tooltip className="h-4 w-4" />
                Unknown source
              </Badge>
            </div>

            <Button onClick={() => onAddToken(token)} className="w-full">
              Import
            </Button>
          </DialogContent>
        </Dialog>
      </Button>
    </div>
  );
};
