import { useState } from "react";
import { formatUsd } from "@bera/berajs";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { CustomizeInput } from "./customize-input";
import { LeverageSlider } from "./leverage-slider";

export function PositionSettings() {
  const [optionType, setOptionType] = useState<"market" | "limit">("market");
  return (
    <div className="w-full px-4 py-6">
      <Tabs
        defaultValue={optionType}
        onValueChange={(value) => setOptionType(value as "market" | "limit")}
        className="mb-4"
      >
        <TabsList className="w-full rounded-lg">
          <TabsTrigger
            value={"market"}
            key={"market"}
            className="w-full rounded-lg"
          >
            Market
          </TabsTrigger>

          <TabsTrigger
            value={"limit"}
            key={"limit"}
            className="w-full rounded-lg"
          >
            Limit
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-col gap-2">
        <CustomizeInput
          title="Amount"
          subTitle={
            <div className="flex items-center gap-1">
              Balance: 0.00
              <div className="cursor-pointer rounded bg-secondary px-1 py-[2px] text-[10px] text-secondary-foreground hover:bg-background">
                MAX
              </div>
            </div>
          }
          endAdornment={
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {" "}
              <Avatar className="h-5 w-5">
                <AvatarImage
                  src={
                    "https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/honey.png"
                  }
                  className="rounded-full"
                />
                <AvatarFallback>honey</AvatarFallback>
              </Avatar>{" "}
              HONEY
            </div>
          }
        />
        <CustomizeInput
          title="Quantity"
          subTitle={`Leverage: ${10.0}x`}
          endAdornment={
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {" "}
              <Avatar className="h-5 w-5">
                <AvatarImage
                  src={
                    "https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/honey.png"
                  }
                  className="rounded-full"
                />
                <AvatarFallback>BTC</AvatarFallback>
              </Avatar>{" "}
              HONEY
            </div>
          }
        />
        {optionType === "limit" && (
          <CustomizeInput
            title="Price"
            subTitle={`Mark: ${formatUsd(25316.12)}`}
            endAdornment={
              <div className="flex items-center text-sm text-muted-foreground">
                USD
              </div>
            }
          />
        )}
      </div>
      <LeverageSlider />
    </div>
  );
}
