import { useState } from "react";
import { Input } from "@bera/ui/input";
import { Slider } from "@bera/ui/slider";

export function LeverageSlider({
  defaultValue = 0,
}: {
  defaultValue?: number;
}) {
  const [sliderValue, setSliderValue] = useState([defaultValue]);
  return (
    <div className="mt-8">
      <div className="text-xs font-medium">Leverage Slider</div>
      <div className="mt-4 flex gap-4">
        <Slider
          defaultValue={sliderValue}
          value={sliderValue}
          max={150}
          markers={[25, 50, 75, 100, 125, 150]}
          onValueChange={setSliderValue}
          className="w-full"
        />
        <Input
          type="number"
          className="h-8 w-12 bg-background p-2 text-xs"
          value={sliderValue[0]! * 1.5}
          onChange={(e) => setSliderValue([Number(e.target.value) / 1.5])}
        />
      </div>
    </div>
  );
}
