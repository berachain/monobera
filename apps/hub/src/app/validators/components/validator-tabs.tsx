import { useState } from "react";
import { useBeraJs, type Validator } from "@bera/berajs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bera/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { ValidatorOverview } from "../validator/validator-overview";
import { ValidatorPolData } from "../validator/validator-pol-data";
import { ValidatorAnalytics } from "./validator-analytics";
import { ValidatorConfiguration } from "./validator-configuration";
import { ValidatorEvents } from "./validator-events";

export const ValidatorTabs = ({ validator }: { validator: Validator }) => {
  const { account } = useBeraJs();
  const isValidatorWallet = account === validator.coinbase;
  const [dayRange, setDayRange] = useState("30");

  return (
    <Tabs className="mt-4" defaultValue="overview">
      <div className="mb-6 flex w-full flex-col justify-between gap-6 sm:flex-row">
        <TabsList variant="ghost">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {isValidatorWallet && (
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          )}
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          {/* <TabsTrigger value="events">Events</TabsTrigger> */}
        </TabsList>
        <TabsContent value="analytics">
          <Select onValueChange={(value: string) => setDayRange(value)}>
            <SelectTrigger className="flex w-[120px] items-center justify-between rounded-md border border-border">
              <SelectValue placeholder={"30 Days"} defaultValue={"30"} />
            </SelectTrigger>
            <SelectContent className="rounded-md border-2">
              <SelectItem
                value={"30"}
                className="cursor-pointer rounded-md hover:bg-muted hover:text-foreground focus:text-foreground"
              >
                30 Days
              </SelectItem>
              <SelectItem
                value={"60"}
                className="cursor-pointer rounded-md hover:bg-muted hover:text-foreground focus:text-foreground"
              >
                60 Days
              </SelectItem>
              <SelectItem
                value={"90"}
                className="cursor-pointer rounded-md hover:bg-muted hover:text-foreground focus:text-foreground"
              >
                90 Days
              </SelectItem>
            </SelectContent>
          </Select>
        </TabsContent>
      </div>

      <TabsContent value="overview">
        <ValidatorOverview validator={validator} />
        <ValidatorPolData validator={validator} />
      </TabsContent>
      <TabsContent value="configuration">
        <ValidatorConfiguration validatorAddress={validator.coinbase} />
      </TabsContent>
      <TabsContent value="analytics">
        <ValidatorAnalytics
          dayRange={dayRange}
          validatorAddress={validator.coinbase}
        />
      </TabsContent>
      {/* TODO: Uncomment this when we have the events data */}
      {/* <TabsContent value="events">
        <ValidatorEvents validatorAddress={validator.coinbase} />
      </TabsContent> */}
    </Tabs>
  );
};
