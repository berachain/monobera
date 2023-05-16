import PreviewDialog from "./preview-dialog";
import { SettingsPopover } from "./settings-popover";
import TokenDialog from "./token-dialog";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Label } from "@bera/ui/label";
import { Switch } from "@bera/ui/switch";
import Image from "next/image";
import React from "react";
import { type Token } from "~/assets/tokens";

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
          <div className="flex justify-between center">
            Swap <SettingsPopover />
          </div>
        </CardHeader>
        <CardContent>
          <div className="py-4">
            <div className="flex gap-2 flex-col">
              <div className="relative">
                <Button
                  variant="secondary"
                  className="absolute top-3 left-3 flex gap-2"
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
                  <Icons.chevronDown className="w-4 h-4" />
                </Button>
                <Input
                  type="text"
                  placeholder="0.0"
                  className="text-right text-lg py-8 px-5"
                />
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 rounded-full"
                  onClick={() => {
                    setSelectedFrom(selectedTo);
                    setSelectedTo(selectedFrom);
                  }}
                >
                  <Icons.swap className="w-8 h-8" />
                </Button>
                <div className="w-full h-0.5 bg-slate-400" />
              </div>
              <div className="relative">
                <Button
                  variant="secondary"
                  className="absolute top-3 left-3 flex gap-2"
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
                  <Icons.chevronDown className="w-4 h-4" />
                </Button>
                <Input
                  type="text"
                  placeholder="0.0"
                  className="text-right text-lg py-8 px-5"
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
