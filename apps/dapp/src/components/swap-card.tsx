import React from "react";
import Image from "next/image";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Progress } from "@bera/ui/progress";
import { set } from "date-fns";
import { useReadLocalStorage } from "usehooks-ts";

import { BERA_BALANCE, LOCAL_STORAGE_KEYS } from "~/utils/constants";
import { type Token } from "~/assets/tokens";
import PreviewDialog from "./preview-dialog";
import { SettingsPopover } from "./settings-popover";
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
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [choosingFrom, setChoosingFrom] = React.useState(false);
  const [fromAmount, setFromAmount] = React.useState(0);
  const [toAmount, setToAmount] = React.useState(0);
  const walletAddress = useReadLocalStorage(LOCAL_STORAGE_KEYS.WALLET_ADDRESS);
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
            <div
              className={cn(
                "flex flex-row flex-wrap justify-between gap-3 rounded-lg border border-input bg-input p-3",
                focused && "border-border",
              )}
            >
              <Button
                className="hover:text-primary-text flex shrink-0 gap-2 hover:bg-transparent"
                variant="ghost"
                onClick={() => {
                  setOpen(true);
                  setChoosingFrom(true);
                }}
              >
                <Image
                  width={24}
                  height={24}
                  src={selectedFrom.logoURI}
                  alt={selectedFrom.name}
                  className="rounded-full"
                />
                {selectedFrom.symbol}
                <Icons.chevronDown className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                step="any"
                min="0"
                placeholder="0.0"
                className="w-100 grow border-0 p-0 text-right text-lg outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={fromAmount > 0 ? fromAmount : ""}
                onFocus={() => {
                  setFocused(true);
                }}
                onBlur={() => {
                  setFocused(false);
                }}
                onChange={(e) => {
                  setFromAmount(Number(e.target.value));
                  setToAmount(Number(e.target.value) * 2);
                }}
              />
              {walletAddress && fromAmount > 0 ? (
                <div className="w-full">
                  <div className="flex justify-between">
                    <p>Balance: {BERA_BALANCE}</p>
                    <p>$420.69</p>
                  </div>

                  <Progress value={59} className="h-2" />
                </div>
              ) : null}
            </div>

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

            <div className="relative mb-4">
              <Button
                variant="ghost"
                className="hover:text-primary-text absolute left-3 top-3 flex gap-2 hover:bg-transparent"
                onClick={() => {
                  setOpen(true);
                  setChoosingFrom(false);
                }}
              >
                <Image
                  width={24}
                  height={24}
                  src={selectedTo.logoURI}
                  alt={selectedTo.name}
                  className="rounded-full"
                />
                {selectedTo.symbol}
                <Icons.chevronDown className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                step="any"
                min="0"
                placeholder="0.0"
                className="px-5 py-8 text-right text-lg"
                value={toAmount > 0 ? toAmount : ""}
                onChange={(e) => {
                  setToAmount(Number(e.target.value));
                  setFromAmount(Number(e.target.value) / 2);
                }}
              />
            </div>

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
