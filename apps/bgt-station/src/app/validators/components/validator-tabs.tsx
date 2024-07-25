import { useSelectedValidator } from "@bera/berajs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { type Address } from "viem";

import { ValidatorAnalytics } from "./validator-analytics";
import { ValidatorConfiguration } from "./validator-configuration";
import { ValidatorEvents } from "./validator-events";
import { ValidatorOverview } from "./validator-overview";
import { ValidatorPolData } from "./validator-pol-data";

export const ValidatorTabs = ({
  validatorAddress,
}: {
  validatorAddress: Address;
}) => {
  const {
    data: validator,
    isLoading,
    isValidating,
  } = useSelectedValidator(validatorAddress);

  // TODO: Add a check for isValidatorWallet
  const isValidatorWallet = true;

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
        <div>
          {validator && (
            <ValidatorOverview validatorAddress={validatorAddress} />
          )}
          {validator && (
            <ValidatorPolData validatorAddress={validatorAddress} />
          )}
        </div>
      </TabsContent>
      <TabsContent value="configuration">
        <ValidatorConfiguration validatorAddress={validatorAddress} />
      </TabsContent>
      <TabsContent value="analytics">
        <ValidatorAnalytics validatorAddress={validatorAddress} />
      </TabsContent>
      <TabsContent value="events">
        <ValidatorEvents validatorAddress={validatorAddress} />
      </TabsContent>
    </Tabs>
  );
};
