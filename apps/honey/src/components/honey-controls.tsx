import React from "react";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export function HoneyControls() {
  return (
    <div className="flex flex-row items-center gap-5">
      <Button variant="outline">
        <Icons.honeyLogo className="h-4 w-4" />
        <span className="ml-3">69</span>
      </Button>
    </div>
  );
}
