import React from "react";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";

import { BgtActivity } from "./bgt-activity";

export function BgtControls() {
  return (
    <div className="mr-5 flex flex-row items-center gap-5">
      <Button variant="outline">
        <Icons.honey />
        <span className="ml-3">69</span>
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">
            <Icons.activity />
            <span className="sr-only">Open popover</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <BgtActivity />
        </PopoverContent>
      </Popover>
    </div>
  );
}
