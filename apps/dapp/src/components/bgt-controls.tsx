import React from "react";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";

import { History } from "./bgt-activity";

export function BgtControls() {
  return (
    <div className="flex flex-row items-center ">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">
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
