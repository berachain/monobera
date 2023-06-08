import React from "react";
import { usePollAssetWalletBalance, type Token } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import PreviewDialog from "./preview-dialog";
import { SettingsPopover } from "./settings-popover";
import SwapInput from "./swap-input";

type Props = {
  selectedFrom: Token;
  setSelectedFrom: (token: Token) => void;
  selectedTo: Token;
  setSelectedTo: (token: Token) => void;
};

export function SwapCard({
  selectedFrom,
  selectedTo,
  setSelectedFrom,
  setSelectedTo,
}: Props) {
  const [fromAmount, setFromAmount] = React.useState(0);
  const [toAmount, setToAmount] = React.useState(0);
  usePollAssetWalletBalance();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="center flex justify-between">
            Swap <SettingsPopover />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4">
            <SwapInput
              selected={selectedFrom}
              selectedTokens={[selectedFrom, selectedTo]}
              onTokenSelection={setSelectedFrom}
              amount={fromAmount}
              setAmount={(amount) => {
                setFromAmount(Number(amount));
                setToAmount(Number(amount) * 2);
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-full hover:bg-transparent"
              onClick={() => {
                setSelectedFrom(selectedTo);
                setSelectedTo(selectedFrom);
              }}
            >
              <Icons.swap className="h-8 w-8" />
            </Button>

            <SwapInput
              selected={selectedTo}
              selectedTokens={[selectedFrom, selectedTo]}
              onTokenSelection={setSelectedTo}
              amount={toAmount}
              setAmount={(amount) => {
                setToAmount(Number(amount));
                setFromAmount(Number(amount) / 2);
              }}
              hideBalance
            />

            {selectedFrom && selectedTo ? (
              <PreviewDialog
                toToken={selectedTo}
                fromToken={selectedFrom}
                fromAmount={fromAmount}
                toAmount={toAmount}
              />
            ) : null}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
