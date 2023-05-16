import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@bera/ui/dialog";
import Image from "next/image";
import React from "react";
import { tokens, type Token } from "~/assets/tokens";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelectedToken: (token: Token) => void;
  selectedFrom: Token;
  selectedTo: Token;
};

export default function TokenDialog({
  open,
  onSelectedToken,
  setOpen,
  selectedFrom,
  selectedTo,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] px-4">
        <DialogHeader>
          <DialogTitle>Token search</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {tokens
            .filter(
              (token) =>
                token.address !== selectedFrom.address &&
                token.address !== selectedTo.address
            )
            .map((token) => (
              <Button
                variant="ghost"
                key={token.name}
                className="flex items-center gap-2 text-left justify-start px-2"
                onClick={() => {
                  onSelectedToken(token);
                  setOpen(false);
                }}
              >
                <Image
                  width={30}
                  height={30}
                  src={token.logoURI}
                  alt={token.name}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{token.symbol}</span>
                  <span className="text-xs text-gray-400">{token.name}</span>
                </div>
              </Button>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
