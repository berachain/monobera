import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
import { Switch } from "@bera/ui/switch";
import React from "react";

export function SettingsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-6 h-6 rounded-full p-0">
          <Icons.settings />
          <span className="sr-only">Open popover</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none flex gap-1 items-center">
              Slippage tolerance
              <Button variant="ghost" className="w-5 h-5 rounded-full p-0">
                <Icons.tooltip className="h-3 w-3 text-muted-foreground" />
                <span className="sr-only">Help</span>
              </Button>
            </h4>
          </div>
          <div className="grid grid-cols-4 gap-1">
            <Button variant="outline" className="col-span-1">
              0.5%
            </Button>
            <Button variant="outline" className="col-span-1">
              1.0%
            </Button>
            <Button variant="outline" className="col-span-1">
              2.0%
            </Button>
            <Input type="text" className="col-span-1" placeholder="0.1" />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium leading-none flex gap-1 items-center">
              Transaction type
              <Button variant="ghost" className="w-5 h-5 rounded-full p-0">
                <Icons.tooltip className="h-3 w-3 text-muted-foreground" />
                <span className="sr-only">Help</span>
              </Button>
            </h4>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <Button variant="outline" className="col-span-1">
              Legacy
            </Button>
            <Button variant="outline" className="col-span-1">
              EIP1559
            </Button>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium leading-none flex gap-1 items-center">
              Use signatures
              <Button variant="ghost" className="w-5 h-5 rounded-full p-0">
                <Icons.tooltip className="h-3 w-3 text-muted-foreground" />
                <span className="sr-only">Help</span>
              </Button>
            </h4>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="use-signatures" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
