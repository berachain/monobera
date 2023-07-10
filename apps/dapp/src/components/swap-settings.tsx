import React from "react";
import { Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Input } from "@bera/ui/input";
import { Toggle } from "@bera/ui/toggle";
import { useLocalStorage } from "usehooks-ts";

import { LOCAL_STORAGE_KEYS } from "~/utils/constants";

export enum SELECTION {
  AUTO = "auto",
  CUSTOM = "custom",
}
export default function SwapSettings() {
  const [slippageTolerance, setSlippageTolerance] = useLocalStorage(
    LOCAL_STORAGE_KEYS.SLIPPAGE_TOLERANCE,
    SELECTION.AUTO as any,
  );
  const [deadline, setDeadline] = useLocalStorage(
    LOCAL_STORAGE_KEYS.DEADLINE,
    SELECTION.AUTO as any,
  );

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="flex items-center gap-1 font-medium leading-none">
          Slippage tolerance
          <Tooltip text="Maximum amount of slippage that can occur during a swap" />
        </h4>
      </div>
      <div className="grid grid-cols-4 gap-1">
        <Toggle
          variant="outline"
          pressed={slippageTolerance === SELECTION.AUTO}
          onPressedChange={() => setSlippageTolerance(SELECTION.AUTO)}
        >
          Auto
        </Toggle>
        <Toggle
          variant="outline"
          pressed={slippageTolerance !== SELECTION.AUTO}
          onPressedChange={() => setSlippageTolerance(0)}
        >
          Custom
        </Toggle>
        <Input
          type="number"
          step="any"
          min="0.1"
          max="100"
          className={cn("text-right", "border-primary-foreground")}
          disabled={slippageTolerance === SELECTION.AUTO}
          placeholder="1"
          defaultValue={slippageTolerance > 0 ? slippageTolerance : ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSlippageTolerance(Number(e.target.value))
          }
        />
        <p className="self-center text-sm">%</p>
      </div>
      <div className="space-y-2">
        <h4 className="flex items-center gap-1 font-medium leading-none">
          Transaction deadline
          <Tooltip text="The maximum amount of time a swap can take. " />
        </h4>
      </div>
      <div className="grid grid-cols-4 gap-1">
        <Toggle
          variant="outline"
          pressed={deadline === SELECTION.AUTO}
          onPressedChange={() => setDeadline(SELECTION.AUTO)}
        >
          Auto
        </Toggle>
        <Toggle
          variant="outline"
          pressed={deadline !== SELECTION.AUTO}
          onPressedChange={() => setDeadline(0)}
        >
          Custom
        </Toggle>
        <Input
          type="number"
          step="any"
          min="0"
          className={cn("text-right", "border-primary-foreground")}
          placeholder=" 1"
          disabled={deadline === SELECTION.AUTO}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDeadline(Number(e.target.value))
          }
        />
        <p className="self-center text-sm">min</p>
      </div>
    </div>
  );
}
