import React from "react";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import { type Token } from "~/assets/tokens";
import PreviewDialog from "./preview-dialog";
import { SettingsPopover } from "./settings-popover";
import SwapInput from "./swap-input";
import TokenDialog from "./token-dialog";

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
  const [choosingFrom, setChoosingFrom] = React.useState(false);
  const [fromAmount, setFromAmount] = React.useState(0);
  const [toAmount, setToAmount] = React.useState(0);
  const [open, setOpen] = React.useState(false);
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
              setChoosing={setChoosingFrom}
              amount={fromAmount}
              setAmount={(amount) => {
                setFromAmount(Number(amount));
                setToAmount(Number(amount) * 2);
              }}
              setOpen={setOpen}
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
              setChoosing={() => setChoosingFrom(false)}
              amount={toAmount}
              setAmount={(amount) => {
                setToAmount(Number(amount));
                setFromAmount(Number(amount) / 2);
              }}
              setOpen={setOpen}
              hideBalance
            />

            <PreviewDialog
              toToken={selectedTo}
              fromToken={selectedFrom}
              fromAmount={fromAmount}
              toAmount={toAmount}
            />
          </div>

          {/* <div className="flex items-center space-x-2">
            <Switch id="gasless-mode" />
            <Label htmlFor="airplane-mode">Swap gasless by signature</Label>
          </div> */}
        </CardContent>
      </Card>
      <TokenDialog
        open={open}
        onSelectedToken={choosingFrom ? setSelectedFrom : setSelectedTo}
        setOpen={setOpen}
        selectedFrom={selectedFrom}
        selectedTo={selectedTo}
      />
    </>
  );
}
