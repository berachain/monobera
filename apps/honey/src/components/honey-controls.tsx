import React from "react";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";

import { History } from "./honey-activity";

export function HoneyControls() {
  return (
    <div className="flex flex-row items-center gap-5">
      <Button variant="outline">
        <Icons.honeyLogo className="h-4 w-4" />
        <span className="ml-3">69</span>
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            <Icons.activity />
            <span className="sr-only">Open popover</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <History />
        </PopoverContent>
      </Popover>
    </div>
  );
}
