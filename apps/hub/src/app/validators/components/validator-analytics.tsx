import { Address } from "viem";

import { BgtDelegated } from "./charts/bgt-delegated";
import { IncentivesEarned } from "./charts/incentives-earned";
import { StakeFlow } from "./charts/stake-flow";
import { ValidatorRewards } from "./charts/validator-rewards";
import { DelegatedAddressTable } from "./delegated-address-table";

export const ValidatorAnalytics = ({
  validatorAddress,
  dayRange,
}: {
  validatorAddress: Address;
  dayRange: string;
}) => {
  // TODO: Add export button for validator data within their time period
  // const handleExportData = useCallback(() => {

  // }, []);

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex flex-col lg:flex-row">
          <BgtDelegated
            validatorAddress={validatorAddress}
            dayRange={parseInt(dayRange)}
          />
          <ValidatorRewards
            validatorAddress={validatorAddress}
            dayRange={parseInt(dayRange)}
          />
        </div>
        <IncentivesEarned
          validatorAddress={validatorAddress}
          dayRange={parseInt(dayRange)}
        />
        <StakeFlow
          validatorAddress={validatorAddress}
          dayRange={parseInt(dayRange)}
        />
      </div>
      {/* TODO: Add export button for validator data within their time period */}
      {/* <div className="flex w-full justify-end">
        <Button
          className="flex border border-border p-2 "
          variant="ghost"
          size={"sm"}
          onClick={handleExportData}
        >
          {"Export"}
          <Icons.download className=" ml-2 h-4 w-4" />
        </Button>
      </div> */}
      <DelegatedAddressTable validatorAddress={validatorAddress} />
    </div>
  );
};
