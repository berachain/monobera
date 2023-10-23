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
    <div className="mt-8 w-full min-w-full">
      <div className="text-xs font-medium">Leverage Slider</div>
      <div className="mt-4 flex gap-4">
        <Slider
          defaultValue={[defaultValue ?? 1]}
          value={[Math.floor(((defaultValue ?? 1) * 100) / maxLeverage)]}
          max={maxLeverage}
          min={1}
          markers={[0, 0, 0, 0, 0, 0].map((_, index) => {
            return Math.floor((maxLeverage * (index + 1)) / 6);
          })}
          onValueChange={(value: any) => {
            console.log("vallly", value);
            if (value[0] === 1) {
              console.log("v213214allly", value);
              onValueChange?.(2);
              return;
            }
            onValueChange?.(Math.floor((maxLeverage * (value ?? 1)) / 100));
          }}
          className="w-full"
        />

        <Input
          type="number"
          className="h-8 w-14 bg-background p-2 text-xs"
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
    </div>
  );
}
