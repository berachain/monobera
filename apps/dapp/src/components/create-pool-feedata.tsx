import React from "react";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Input } from "@bera/ui/input";
import { Toggle } from "@bera/ui/toggle";

type Props = {
  swapFee: number;
  setSwapFee: (feeData: number) => void;
  onContinue: () => void;
};

export function CreatePoolFeeData({ swapFee, setSwapFee, onContinue }: Props) {
  function isNotPreset() {
    return ![0.1, 0.3, 1].includes(swapFee);
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="center flex justify-between">
            Set pool fees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h4 className="flex items-center gap-1 font-medium leading-none">
              Initial Swap Fee
            </h4>
            <p>
              0.30% is best for most weighted pools with established tokens. Go
              higher for more exotic tokens.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-1">
            <Toggle
              variant="outline"
              pressed={swapFee === 0.1}
              onPressedChange={() => setSwapFee(0.1)}
            >
              0.1%
            </Toggle>
            <Toggle
              variant="outline"
              pressed={swapFee === 0.3}
              onPressedChange={() => setSwapFee(0.3)}
            >
              0.3%
            </Toggle>
            <Toggle
              variant="outline"
              pressed={swapFee === 1}
              onPressedChange={() => setSwapFee(1)}
            >
              1.0%
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSwapFee(Number(e.target.value))
              }
            />
          </div>
          <Button className="mt-4 w-full" onClick={onContinue}>
            Continue
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
