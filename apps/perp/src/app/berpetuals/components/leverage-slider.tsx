import { useCallback } from "react";
import { Input } from "@bera/ui/input";
import { Slider } from "@bera/ui/slider";
import BigNumber from "bignumber.js";

export function LeverageSlider({
  defaultValue,
  onValueChange,
  maxLeverage = 150,
}: {
  defaultValue?: number;
  onValueChange?: (value: string) => void;
  maxLeverage?: number;
}) {
  const handleInputChange = useCallback((e: { target: { value: string } }) => {
    const value = BigNumber(e.target.value);
    if (value.gt(maxLeverage)) {
      onValueChange?.(maxLeverage.toString());
    } else {
      onValueChange?.(e.target.value);
    }
  }, []);

  return (
    <div className="mt-4 w-full min-w-full">
      <div className="flex items-center justify-between pl-2 align-middle text-xs font-medium">
        Leverage Slider
        <Input
          type="number"
          className="h-8 w-14 bg-background p-4 text-xs"
          outerClassName="w-fit"
          value={defaultValue === 0 ? undefined : defaultValue}
          min={1}
          max={maxLeverage}
          onKeyDown={(e) =>
            (e.key === "-" || e.key === "e" || e.key === "E") &&
            e.preventDefault()
          }
          maxLength={3}
          onChange={handleInputChange}
        />
      </div>
      <div className="mt-4 flex w-full gap-4 pl-2 pr-6">
        <Slider
          defaultValue={[defaultValue ?? 1]}
          value={[Math.floor(((defaultValue ?? 1) * 100) / maxLeverage)]}
          max={maxLeverage}
          min={1}
          markers={[0, 0, 0, 0, 0].map((_, index) => {
            return Math.floor((maxLeverage * (index + 1)) / 5);
          })}
          onValueChange={(value: any) => {
            if (value[0] === 1) {
              onValueChange?.("2");
              return;
            }
            onValueChange?.(
              Math.floor((maxLeverage * (value ?? 1)) / 100).toString(),
            );
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}
