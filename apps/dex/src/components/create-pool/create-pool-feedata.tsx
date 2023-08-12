"use client";

import React, { useState } from "react";
import { cn } from "@bera/ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Input } from "@bera/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

type Props = {
  swapFee: number;
  error: Error | undefined;
  setSwapFee: (feeData: number) => void;
  onContinue: () => void;
};

enum Types {
  VALUE = "value",
  CUSTOM = "custom",
}

enum VALUES {
  FIVE_BPS = "0.05",
  TEN_BPS = "0.10",
  THIRTY_BPS = "0.30",
  ONE_PERCENT = "1",
  CUSTOM = "custom",
}
export function CreatePoolFeeData({ error, setSwapFee, onContinue }: Props) {
  const [type, setType] = useState(Types.VALUE);
  const [customValue, setCustomValue] = useState("0.3");
  const handleFeeChange = (value: string) => {
    setSwapFee(Number(value));
  };
  return (
    <Card className="w-[350px] sm:w-[480px]">
      <CardHeader>
        <CardTitle className="center text-md flex p-0 font-semibold sm:text-lg">
          Set pool fees
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Tabs
          defaultValue={VALUES.THIRTY_BPS}
          onValueChange={(value: string) => {
            if (value === Types.CUSTOM) {
              setType(Types.CUSTOM);
              setSwapFee(Number(customValue));
            }
            if (value !== Types.CUSTOM) {
              setType(Types.VALUE);
              handleFeeChange(value);
            }
          }}
        >
          <TabsList className="w-full">
            <TabsTrigger value={VALUES.FIVE_BPS} className="w-full ">
              0.05%
            </TabsTrigger>
            <TabsTrigger value={VALUES.TEN_BPS} className="w-full">
              0.10%
            </TabsTrigger>
            <TabsTrigger value={VALUES.THIRTY_BPS} className="w-full ">
              0.30%
            </TabsTrigger>
            <TabsTrigger
              value={VALUES.ONE_PERCENT}
              className="w-full  min-w-[30px]"
            >
              1%
            </TabsTrigger>
            <TabsTrigger value={VALUES.CUSTOM} className="w-full">
              Custom
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Input
          type="number"
          step="any"
          className="h-[40px] w-full pl-1 pr-6 text-right"
          disabled={type !== Types.CUSTOM}
          placeholder={customValue}
          defaultValue={customValue}
          endAdornment={
            <p
              className={cn(
                "ml-2 self-center pl-1 text-xs text-foreground",
                type !== Types.CUSTOM && "opacity-50",
              )}
            >
              %
            </p>
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setType(Types.CUSTOM);
            setCustomValue(e.target.value);
            handleFeeChange(e.target.value);
          }}
        />
        <p className="text-sm font-medium text-muted-foreground">
          0.05% to 0.10% is recommended for stable pairings
        </p>
        {error && (
          <Alert variant="destructive" className="my-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error && error.message}</AlertDescription>
          </Alert>
        )}
        <Button
          className="w-full"
          onClick={onContinue}
          disabled={error !== undefined}
        >
          Next
        </Button>
      </CardContent>
    </Card>
  );
}
