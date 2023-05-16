import SwapSettings from "./swap-settings";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
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
      <PopoverContent className="w-80" align="end">
        <SwapSettings />
      </PopoverContent>
    </Popover>
  );
}
