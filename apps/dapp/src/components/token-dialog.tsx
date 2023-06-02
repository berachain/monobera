import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTokenInformation, type Token } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@bera/ui/dialog";
import { Input } from "@bera/ui/input";
import { isAddress } from "viem";

import useTokens from "~/hooks/useTokens";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelectedToken: (token: Token) => void;
  selectedTokens: Token[];
};

export default function TokenDialog({
  open,
  onSelectedToken,
  setOpen,
  selectedTokens,
}: Props) {
  const { tokenList } = useTokens();
  const { read, tokenInformation } = useTokenInformation();
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(tokenList);

  const [search, setSearch] = useState("");

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
  }, [read, search, tokenList]);

  useEffect(() => {
    setFilteredTokens([tokenInformation]);
  }, [tokenInformation]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          {filteredTokens
            .filter((token) => !selectedTokens.includes(token))
            .map((token, i) => (
              <Button
                variant="ghost"
                key={i}
                className="flex items-center justify-start gap-2 px-2 text-left"
                onClick={() => {
                  onSelectedToken(token);
                  setOpen(false);
                }}
              >
                <Image
                  width={30}
                  height={30}
                  src={`/icons/${token?.symbol.toLowerCase()}.jpg`}
                  alt={token?.symbol}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{token?.symbol}</span>
                </div>
              </Button>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
