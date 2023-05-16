import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Switch } from "@bera/ui/switch";
import { Toggle } from "@bera/ui/toggle";
import React from "react";
import useLocalStorage from "~/hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS, TRANSACTION_TYPES } from "~/utils/constants";

export default function SwapSettings() {
  const [slippageTolerance, setSlippageTolerance] = useLocalStorage(
    LOCAL_STORAGE_KEYS.SLIPPAGE_TOLERANCE,
    0.5
  );

  const [transactionType, setTransactionType] = useLocalStorage(
    LOCAL_STORAGE_KEYS.TRANSACTION_TYPE,
    TRANSACTION_TYPES.LEGACY
  );

  const [useSignatures, setUseSignatures] = useLocalStorage(
    LOCAL_STORAGE_KEYS.USE_SIGNATURES,
    false
  );

  function isNotPreset() {
    return ![0.5, 1, 2].includes(slippageTolerance);
  }

  return (
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
          type="text"
          className={cn(" text-right", isNotPreset() && "bg-accent")}
          placeholder="0.1"
          defaultValue={slippageTolerance}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSlippageTolerance(Number(e.target.value))
          }
        />
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
        <Toggle
          variant="outline"
          pressed={transactionType === TRANSACTION_TYPES.LEGACY}
          onPressedChange={() => setTransactionType(TRANSACTION_TYPES.LEGACY)}
        >
          Legacy
        </Toggle>
        <Toggle
          variant="outline"
          pressed={transactionType === TRANSACTION_TYPES.EIP_1559}
          onPressedChange={() => setTransactionType(TRANSACTION_TYPES.EIP_1559)}
        >
          EIP1559
        </Toggle>
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
        <Switch
          id="use-signatures"
          checked={useSignatures}
          onCheckedChange={(checked) => setUseSignatures(checked)}
        />
      </div>
    </div>
  );
}
