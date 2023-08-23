import React from "react";
import { Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Input } from "@bera/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { useLocalStorage } from "usehooks-ts";

import {
  DEFAULT_DEADLINE,
  DEFAULT_SLIPPAGE,
  LOCAL_STORAGE_KEYS,
} from "~/utils/constants";

export enum SELECTION {
  AUTO = "auto",
  CUSTOM = "custom",
}
export default function SwapSettings() {
  const [slippageToleranceType, setSlippageToleranceType] = useLocalStorage<
    number | string
  >(LOCAL_STORAGE_KEYS.SLIPPAGE_TOLERANCE_TYPE, SELECTION.AUTO);

  const [slippageToleranceValue, setSlippageToleranceValue] = useLocalStorage<
    number | string
  >(LOCAL_STORAGE_KEYS.SLIPPAGE_TOLERANCE_VALUE, DEFAULT_SLIPPAGE);

  const [deadlineType, setDeadlineType] = useLocalStorage<number | string>(
    LOCAL_STORAGE_KEYS.DEADLINE_TYPE,
    SELECTION.AUTO,
  );

  const [deadlineValue, setDeadlineValue] = useLocalStorage<number | string>(
    LOCAL_STORAGE_KEYS.DEADLINE_VALUE,
    DEFAULT_DEADLINE,
  );

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="flex items-center gap-1 font-medium leading-none">
          Slippage tolerance
          <Tooltip text="Maximum amount of slippage that can occur during a swap" />
        </h4>
      </div>
      <div className="flex h-[40px] w-full items-center justify-between gap-4">
        <Tabs
          className=" flex-shrink-0"
          defaultValue={slippageToleranceType as string}
          onValueChange={(value: string) => setSlippageToleranceType(value)}
        >
          <TabsList>
            <TabsTrigger value={SELECTION.AUTO}>Auto</TabsTrigger>
            <TabsTrigger value={SELECTION.CUSTOM}>Custom</TabsTrigger>
          </TabsList>
        </Tabs>
        <Input
          type="number"
          step="any"
          min={0.1}
          max={100}
          className="h-[40px] pr-8 text-right"
          disabled={slippageToleranceType === SELECTION.AUTO}
          placeholder="1"
          defaultValue={slippageToleranceValue}
          endAdornment={
            <p
              className={cn(
                "mr-2 self-center text-xs text-foreground",
                slippageToleranceType === SELECTION.AUTO && "opacity-50",
              )}
            >
              %
            </p>
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSlippageToleranceValue(Number(e.target.value))
          }
        />
      </div>
      <div className="space-y-2">
        <h4 className="flex items-center gap-1 font-medium leading-none">
          Transaction Deadline
          <Tooltip text="Maximum amount of time that can elapse during a swap" />
        </h4>
      </div>
      <div className="flex h-[40px] flex-row items-center gap-4">
        <Tabs
          defaultValue={deadlineType as string}
          onValueChange={(value: string) => setDeadlineType(value)}
        >
          <TabsList className="flex-shrink-0">
            <TabsTrigger value={SELECTION.AUTO}>Auto</TabsTrigger>
            <TabsTrigger value={SELECTION.CUSTOM}>Custom</TabsTrigger>
          </TabsList>
        </Tabs>
        <Input
          type="number"
          step="any"
          min={0.1}
          max={100}
          className="h-[40px] pl-1 pr-9 text-right"
          disabled={deadlineType === SELECTION.AUTO}
          placeholder="1"
          defaultValue={deadlineValue}
          endAdornment={
            <p
              className={cn(
                "ml-2 self-center pl-1 text-xs text-foreground",
                deadlineType === SELECTION.AUTO && "opacity-50",
              )}
            >
              min
            </p>
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDeadlineValue(Number(e.target.value))
          }
        />
      </div>
    </div>
  );
}
