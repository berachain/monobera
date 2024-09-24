import { useBeraJs, type Validator } from "@bera/berajs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { ValidatorOverview } from "../validator/validator-overview";
import { ValidatorPolData } from "../validator/validator-pol-data";
import { ValidatorAnalytics } from "./validator-analytics";
import { ValidatorConfiguration } from "./validator-configuration";
import { ValidatorEvents } from "./validator-events";

export const ValidatorTabs = ({ validator }: { validator: Validator }) => {
  const { account } = useBeraJs();
  const isValidatorWallet = account === validator.coinbase;

  return (
    <Tabs className="mt-4" defaultValue="overview">
      <TabsList variant="ghost">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        {isValidatorWallet && (
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        )}
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="events">Events</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <ValidatorOverview validator={validator} />
        <ValidatorPolData validator={validator} />
      </TabsContent>
      <TabsContent value="configuration">
        <ValidatorConfiguration validatorAddress={validator.coinbase} />
      </TabsContent>
      <TabsContent value="analytics">
        <ValidatorAnalytics validatorAddress={validator.coinbase} />
      </TabsContent>
      <TabsContent value="events">
        <ValidatorEvents validatorAddress={validator.coinbase} />
      </TabsContent>
    </Tabs>
  );
};
