"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  useBeraJs,
  usePollWalletBalances,
  useTokenInformation,
  useTokens,
  type Token,
} from "@bera/berajs";
import { nativeTokenAddress } from "@bera/config";
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
import { isAddress, type Address } from "viem";

import { FormattedNumber } from "./formatted-number";
import { SearchInput } from "./search-input";
import { TokenChip } from "./token-chip";
import { TokenIcon } from "./token-icon";
import { AddTokenDialog } from "./add-token-dialog";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelectedToken: (token: Token | undefined) => void;
  selectedTokens: (Token | undefined)[];
  focusedToken: Token | undefined;
  customTokens?: (Token | undefined)[];
  filter?: string[];
  filteredTokenTags?: string[]; // list of tags excluded from visible token list
  filteredSymbols?: string[]; // list of symbols excluded from visible token list
  walletAddress?: Address;
};

export function TokenDialog({
  open,
  onSelectedToken,
  setOpen,
  selectedTokens,
  walletAddress,
  focusedToken = undefined,
  customTokens = undefined,
  filter = [],
  filteredTokenTags = [],
  filteredSymbols = [],
}: Props) {
  const [search, setSearch] = useState("");
  const [pendingAddition, setPendingAddition] = useState<boolean>(false);
  const [managingTokens, setManagingTokens] = useState<boolean>(false);
  const { data: tokenData, addNewToken, removeToken } = useTokens();
  const hasFilteredTag = (tags?: string[]) => {
    if (!tags) return false;
    let result = false;
    filteredTokenTags?.forEach((filteredTag) => {
      if (tags.includes(filteredTag)) {
        result = true;
      }
    });
    return result;
  };

  const { data: tokenInformation, error: tokenInformationError } =
    useTokenInformation({
      address: search as Address,
    });
  const [filteredTokens, setFilteredTokens] = useState<
    (Token | undefined)[] | undefined
  >(
    customTokens !== undefined
      ? customTokens
      : tokenData?.tokenList?.filter(
          (token: Token) =>
            !filter.includes(token.address) &&
            !hasFilteredTag(token.tags) &&
            !filteredSymbols.includes(token.symbol),
        ),
  );

  useMemo(() => {
    if (customTokens) {
      setFilteredTokens(customTokens);
    }
  }, [customTokens]);

  useEffect(() => {
    if (!customTokens) {
      // Only update the state if the filtered list is different from the current state
      const newFilteredTokens = tokenData?.tokenList?.filter(
        (token: Token) =>
          !filter.includes(token.address) &&
          !hasFilteredTag(token.tags) &&
          !filteredSymbols.includes(token.symbol),
      );
      if (
        JSON.stringify(newFilteredTokens) !== JSON.stringify(filteredTokens)
      ) {
        setFilteredTokens(newFilteredTokens);
      }
    }
  }, [tokenData?.tokenList]);

  useEffect(() => {
    setManagingTokens(false);
    setSearch("");
  }, [open]);

  useEffect(() => {
    if (!customTokens) {
      const filtered = tokenData?.tokenList?.filter(
        (token: Token) =>
          (token.name?.toLowerCase().includes(search.toLowerCase()) ||
            token.symbol?.toLowerCase().includes(search.toLowerCase()) ||
            token.address.toLowerCase().includes(search.toLowerCase())) &&
          !hasFilteredTag(token.tags) &&
          !filteredSymbols.includes(token.symbol),
      );

      if (isAddress(search) && filtered?.length === 0) {
        setPendingAddition(true);
        return;
      }
      setPendingAddition(false);
      setFilteredTokens(filtered);
    }
  }, [search]); // Include 'filteredTokens' in the dependency array

  useEffect(() => {
    if (tokenInformation) {
      setFilteredTokens([tokenInformation]);
    }
  }, [tokenInformation]);

  const onTokenSelect = (token: Token | undefined) => {
    onSelectedToken(token);
    setOpen(false);
    setSearch("");
  };

  const onAddToken = (token: Token | undefined) => {
    addNewToken(token);
    onSelectedToken(token);
    setSearch("");
    setOpen(false);
  };

  function isTokenSelected(token: Token | undefined): boolean {
    if (!token) return false;
    return selectedTokens.some(
      (selectedToken) => selectedToken?.address === token.address,
    );
  }

  const handleOpenChange = () => {
    if (open) {
      setSearch("");
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        {!managingTokens && (
          <DialogContent className="flex max-h-[100vh] max-w-[425px] flex-col gap-4 rounded-2xl px-6">
            <DialogHeader>
              <DialogTitle className="text-lg">Select a token</DialogTitle>
            </DialogHeader>
            {!customTokens && (
              <SearchInput
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search by name, symbol or address"
              />
            )}
            <div>
              {!customTokens && (
                <div className="flex flex-wrap gap-2">
                  {tokenData?.featuredTokenList
                    ?.filter((token: Token) => !filter.includes(token.address))
                    ?.map((token: Token) => {
                      return (
                        <TokenChip
                          key={token.address}
                          selected={isTokenSelected(token)}
                          onClick={() =>
                            !isTokenSelected(token) && onTokenSelect(token)
                          }
                        >
                          <TokenIcon address={token.address} size="md" />
                          {token.symbol}
                        </TokenChip>
                      );
                    })}
                </div>
              )}
            </div>
            <div className="h-px w-full border-x-0 border-b-0 border-t border-solid border-border" />
            <div className="max-h-[min(600px,60vh)] overflow-y-auto">
              {filteredTokens?.length ? (
                filteredTokens
                  ?.filter((token) => !filter.includes(token?.address ?? ""))
                  .map((token, i) => (
                    <TokenDialogRow
                      walletAddress={walletAddress}
                      key={`${token?.symbol}-${token?.name}-${token?.address}-${i}`}
                      token={token}
                      isTokenSelected={isTokenSelected(token)}
                      focusedToken={focusedToken}
                      onAddToken={onAddToken}
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
              )}
            </div>
            <div className="h-px w-full border-x-0 border-b-0 border-t border-solid border-border" />
            {!customTokens && (
              <div
                className="flex flex-row items-center justify-center gap-1 self-center text-xs text-muted-foreground hover:cursor-pointer hover:underline"
                onClick={() => setManagingTokens(true)}
              >
                <Icons.edit className="h-3 w-3" /> Manage custom tokens
              </div>
            )}
          </DialogContent>
        )}
        {managingTokens && (
          <DialogContent className="flex max-h-[100vh] w-full  flex-col">
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
              ({tokenData?.customTokenList?.length ?? 0}) Custom tokens
            </div>
            <div>
              {tokenData?.customTokenList?.map((token: Token) => {
                return (
                  <div
                    className="flex w-full flex-row items-center justify-between rounded-lg p-2 hover:bg-muted"
                    key={`${token.name}-${token.address}`}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <TokenIcon
                        address={token.address}
                        imgOverride={
                          token.address === nativeTokenAddress
                            ? token.logoURI
                            : undefined
                        }
                      />
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
  token: Token | undefined;
  isTokenSelected: boolean;
  focusedToken: Token | undefined;
  onAddToken: (token: Token | undefined) => void;
  onTokenSelect: (token: Token | undefined) => void;
  pendingAddition: boolean;
  walletAddress?: Address;
};
const TokenDialogRow = ({
  token,
  isTokenSelected,
  focusedToken,
  onAddToken,
  onTokenSelect,
  pendingAddition,
  walletAddress,
}: RowProps) => {
  const { isConnected } = useBeraJs();
  const { useSelectedWalletBalance } = usePollWalletBalances({
    walletAddress,
  });
  const t = useSelectedWalletBalance(token?.address ?? "0x");
  const { data: tokenData } = useTokens();
  const tokenExists = useMemo(() => {
    return tokenData?.tokenList?.some((t) => t.address === token?.address);
  }, [tokenData?.customTokenList]);
  const [addTokenOpen, setAddTokenOpen] = useState(false);

  return (
    <div>
      <Button
        variant="ghost"
        className={cn(
          "flex h-auto w-full items-center justify-start gap-2 p-4 text-left shadow-none",
          isTokenSelected && "cursor-default opacity-50",
        )}
        onClick={() => {
          if (addTokenOpen) return;
          if (isTokenSelected) return;
          if (!tokenExists) {
            setAddTokenOpen(true);
          } else {
            onTokenSelect(token);
          }
        }}
      >
        <div className="relative">
          <TokenIcon
            address={token?.address ?? ""}
            imgOverride={
              token?.address === nativeTokenAddress ? token.logoURI : undefined
            }
          />
          {focusedToken?.address === token?.address && (
            <div className="absolute bottom-0 right-0 mr-[-4px] mt-[10px] flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white">
              <Icons.check className="h-3 w-3 " />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium">{token?.symbol}</span>
        </div>

        {focusedToken?.address === token?.address && (
          <div className="absolute ml-auto" />
        )}
        {!pendingAddition && (walletAddress || isConnected) && (
          <div className="ml-auto truncate text-muted-foreground">
            <FormattedNumber
              value={t?.formattedBalance ?? "0"}
              visibleDecimals={2}
              compact={false}
            />
          </div>
        )}
        <AddTokenDialog
          token={token}
          onAddToken={onAddToken}
          open={addTokenOpen}
          onOpenChange={setAddTokenOpen}
        />
      </Button>
    </div>
  );
};
