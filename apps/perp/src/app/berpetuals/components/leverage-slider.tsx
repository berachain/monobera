import { Input } from "@bera/ui/input";
import { Slider } from "@bera/ui/slider";

export function LeverageSlider({
  defaultValue,
  onValueChange,
  maxLeverage = 150,
}: {
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  maxLeverage?: number;
}) {
  return (
    <div className="mt-6 w-full min-w-full">
      <div className="flex items-center justify-between pl-2 align-middle text-xs font-medium">
        Leverage Slider
        <Input
          type="number"
          className="h-8 w-14 bg-background p-4 text-xs"
          outerClassName="w-fit"
          value={defaultValue === 0 ? undefined : defaultValue}
          min={1}
          max={maxLeverage}
          onKeyDown={(e) => e.key === "-" && e.preventDefault()}
          maxLength={5}
          onChange={(e: any) => {
            const inputValue = Number(e.target.value);
            onValueChange?.(inputValue);
          }}
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
              onValueChange?.(2);
              return;
            }
            onValueChange?.(Math.floor((maxLeverage * (value ?? 1)) / 100));
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}
