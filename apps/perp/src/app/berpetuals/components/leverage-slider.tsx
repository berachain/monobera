import { useState } from "react";
import { Input } from "@bera/ui/input";
import { Slider } from "@bera/ui/slider";

export function LeverageSlider({
  defaultValue = 0,
  onValueChange,
}: {
  defaultValue?: number;
  onValueChange?: (value: number) => void;
}) {
  const [sliderValue, setSliderValue] = useState([defaultValue / 1.5]);
  return (
    <div className="mt-8">
      <div className="text-xs font-medium">Leverage Slider</div>
      <div className="mt-4 flex gap-4">
        <Slider
          defaultValue={sliderValue}
          value={sliderValue}
          max={150}
          markers={[25, 50, 75, 100, 125, 150]}
          onValueChange={(value) => {
            setSliderValue([Number(value)]);
            onValueChange?.(Number(value) ?? 0 * 1.5);
          }}
          className="w-full"
        />
        <Input
          type="number"
          className="h-8 w-12 bg-background p-2 text-xs"
          value={sliderValue[0]! * 1.5}
          onChange={(e) => {
            setSliderValue([Number(e.target.value) / 1.5]);
            onValueChange?.(Number(e.target.value) ?? 0);
          }}
        />
      </div>
    </div>
  );
}
