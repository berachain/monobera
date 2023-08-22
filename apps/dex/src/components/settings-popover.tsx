import React from "react";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";

import SwapSettings from "./swap-settings";

export function SettingsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="h-6 w-6 rounded-full p-0 text-primary"
        >
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
