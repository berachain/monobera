import React from "react";
import { Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Input } from "@bera/ui/input";
import { Switch } from "@bera/ui/switch";
import { Toggle } from "@bera/ui/toggle";
import { useLocalStorage } from "usehooks-ts";

import { LOCAL_STORAGE_KEYS } from "~/utils/constants";

export default function SwapSettings() {
  const [slippageTolerance, setSlippageTolerance] = useLocalStorage(
    LOCAL_STORAGE_KEYS.SLIPPAGE_TOLERANCE,
    0.5,
  );

  const [useSignatures, setUseSignatures] = useLocalStorage(
    LOCAL_STORAGE_KEYS.USE_SIGNATURES,
    false,
  );

  function isNotPreset() {
    return ![0.5, 1, 2].includes(slippageTolerance);
  }

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="flex items-center gap-1 font-medium leading-none">
          Slippage tolerance
          <Tooltip text="Add to library" />
        </h4>
      </div>
      <div className="grid grid-cols-4 gap-1">
        <Toggle
          variant="outline"
          pressed={slippageTolerance === 0.5}
          onPressedChange={() => setSlippageTolerance(0.5)}
        >
          0.5%
        </Toggle>
        <Toggle
          variant="outline"
          pressed={slippageTolerance === 1}
          onPressedChange={() => setSlippageTolerance(1)}
        >
          1.0%
        </Toggle>
        <Toggle
          variant="outline"
          pressed={slippageTolerance === 2}
          onPressedChange={() => setSlippageTolerance(2)}
        >
          2.0%
        </Toggle>
        <Input
          type="number"
          step="any"
          min="0"
          className={cn(
            " text-right",
            isNotPreset() && "border-primary-foreground",
          )}
          placeholder="0.1"
          defaultValue={
            isNotPreset() && slippageTolerance > 0 ? slippageTolerance : ""
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSlippageTolerance(Number(e.target.value))
          }
        />
      </div>
      <div className="space-y-2">
        <h4 className="flex items-center gap-1 font-medium leading-none">
          Use signatures
          <Tooltip text="Add to library" />
        </h4>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="use-signatures"
          checked={useSignatures}
          onCheckedChange={(checked) => setUseSignatures(checked)}
        />
      </div>
    </div>
  );
}
