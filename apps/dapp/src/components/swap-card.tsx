import React from "react";
import Image from "next/image";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Label } from "@bera/ui/label";
import { Switch } from "@bera/ui/switch";

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
  const [choosingFrom, setChoosingFrom] = React.useState(false);
  return (
    <>
      <Card>
        <CardHeader>
          <div className="center flex justify-between">
            Swap <SettingsPopover />
          </div>
        </CardHeader>
        <CardContent>
          <div className="py-4">
            <div className="flex flex-col gap-2">
              <div className="relative">
                <Button
                  variant="secondary"
                  className="absolute left-3 top-3 flex gap-2"
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
                  type="text"
                  placeholder="0.0"
                  className="px-5 py-8 text-right text-lg"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 rounded-full"
                  onClick={() => {
                    setSelectedFrom(selectedTo);
                    setSelectedTo(selectedFrom);
                  }}
                >
                  <Icons.swap className="h-8 w-8" />
                </Button>
                <div className="h-0.5 w-full bg-slate-400" />
              </div>
              <div className="relative">
                <Button
                  variant="secondary"
                  className="absolute left-3 top-3 flex gap-2"
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
                  type="text"
                  placeholder="0.0"
                  className="px-5 py-8 text-right text-lg"
                />
              </div>
              <PreviewDialog />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="gasless-mode" />
            <Label htmlFor="airplane-mode">Swap gasless by signature</Label>
          </div>
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
