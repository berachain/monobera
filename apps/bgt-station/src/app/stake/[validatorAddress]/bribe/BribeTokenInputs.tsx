"use client";

import React from "react";
import { type Token } from "@bera/berajs";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import BribeTokenInput from "./BribeTokenInput";
import { type ITokenBribe } from "./hooks/useCreateTokenBribes";

type Props = {
  tokenBribes: ITokenBribe[];
  proposals: number;
  selectedTokens: Token[];
  selectable?: boolean;
  onTokenSelection: (token: Token, index: number) => void;
  onRemove: (index: number) => void;
  onAddToken: () => void;
  onTokenBribeChange: (index: number, bribe: number, proposals: number) => void;
  onTokenTotalChange: (index: number, total: number, proposals: number) => void;
  error: Error | undefined;
};

export default function BribeTokenInputs({
  tokenBribes,
  proposals,
  error,
  selectedTokens,
  onAddToken,
  onTokenSelection,
  onRemove,
  onTokenBribeChange,
  onTokenTotalChange,
}: Props) {
  return (
    <div className="rounded-lg border p-4">
      <div>
        <div className="flex gap-4">
          <div className="flex w-3/4 justify-between">
            <p className="font-semibold text-backgroundSecondary">Token</p>
            <p className="text-right font-semibold text-backgroundSecondary">
              Per proposal
            </p>
          </div>
          <p className="w-1/4 font-semibold text-backgroundSecondary">Total</p>
        </div>
        {tokenBribes.map((tokenBribe: ITokenBribe, index: number) => (
          <BribeTokenInput
            tokenBribe={tokenBribe}
            proposals={proposals}
            onRemove={onRemove}
            key={index}
            index={index}
            onTokenBribeChange={onTokenBribeChange}
            onTokenTotalChange={onTokenTotalChange}
            onTokenSelection={onTokenSelection}
            selectedTokens={selectedTokens}
          />
        ))}
        {error && (
          <Alert variant="destructive" className="my-4">
            <Icons.warning className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error && error.message}</AlertDescription>
          </Alert>
        )}
        <Button
          variant="ghost"
          className="my-4 px-0"
          onClick={() => onAddToken()}
        >
          <Icons.add className="color-background mr-5 h-5 w-5 rounded-full bg-muted p-1" />
          Add a token
        </Button>
      </div>
    </div>
  );
}
