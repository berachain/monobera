import { useCallback } from "react";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Address } from "viem";

import { BgtDelegated } from "./charts/bgt-delegated";
import { IncentivesEarned } from "./charts/incentives-earned";
import { StakeFlow } from "./charts/stake-flow";
import { StakeFlowSummary } from "./charts/stake-flow-summary";
import { ValidatorRewards } from "./charts/validator-rewards";
import { ValidatorIncentivesTable } from "./validator-incentives-table";
import { DelegatedAddressTable } from "./delegated-address-table";

export const ValidatorAnalytics = ({
  validatorAddress,
}: {
  validatorAddress: Address;
}) => {
  const handleExportData = useCallback(() => {
    console.log("Exporting data");
  }, []);
  return (
    <div className="flex flex-col">
      <div className="my-8 grid w-full grid-cols-1 gap-x-0 gap-y-4 md:grid-cols-2 md:gap-x-4">
        <BgtDelegated validatorAddress={validatorAddress} />
        <ValidatorRewards validatorAddress={validatorAddress} />
        <IncentivesEarned validatorAddress={validatorAddress} />
        <ValidatorIncentivesTable validatorAddress={validatorAddress} />
        <StakeFlow validatorAddress={validatorAddress} />
        <StakeFlowSummary validatorAddress={validatorAddress} />
      </div>
      <div className="flex w-full justify-end">
        <Button
          className="flex border border-border p-2 "
          variant="ghost"
          size={"sm"}
          onClick={handleExportData}
        >
          {"Export"}
          <Icons.download className=" ml-2 h-4 w-4" />
        </Button>
      </div>
      <DelegatedAddressTable validatorAddress={validatorAddress} />
    </div>
  );
};
