import {
  ActiveIncentive,
  usePollGauges,
  usePollValidatorInfo,
  type Validator,
} from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import GlobalGaugeWeightChart from "~/components/global-gauge-weight-chart";
import { validator_gauge_columns } from "~/columns/gauge-incentives-columns";
import { validatorGaugeColumns } from "./validator-gauge-columns";
import { ActiveIncentiveWithVault } from "./validator";
import { blockTime } from "@bera/config";
import { useMemo } from "react";
import { useValidatorEstimatedBgtPerYear } from "~/hooks/useValidatorEstimatedBgtPerYear";

export const getActiveIncentivesArray = (
  validator: Validator,
): ActiveIncentiveWithVault[] => {
  return validator?.activeIncentives.map((incentive: ActiveIncentive) => {
    const vaultId = incentive.id.split("-")[0];
    const cuttingBoard = validator?.cuttingBoard.weights.find(
      (cb: any) => cb.receiver.toLowerCase() === vaultId.toLowerCase(),
    );
    if (!cuttingBoard) return;
    return {
      cuttingBoard: cuttingBoard,
      token: incentive.token,
      amountLeft: incentive.amountLeft,
      incentiveRate: incentive.incentiveRate,
    };
  }) as ActiveIncentiveWithVault[];
};
export const ValidatorPolData = ({
  validator,
  isLoading,
  isValidating,
}: {
  validator: Validator;
  isLoading: boolean;
  isValidating: boolean;
}) => {
  const {
    gaugeList,
    isLoading: isGaugeListLoading,
    isValidating: isGaugeListValidating,
  } = usePollGauges({ validatorId: validator.id });

  const activeIncentivesArray: ActiveIncentiveWithVault[] =
    getActiveIncentivesArray(validator);

  const estimatedBgtPerYear = useValidatorEstimatedBgtPerYear(validator);

  return (
    <div className="mt-6 flex w-full flex-col gap-6 lg:flex-row">
      <div className="w-full">
        <Tabs defaultValue="gauges">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gauges">Gauges</TabsTrigger>
            <TabsTrigger value="incentives">Incentives</TabsTrigger>
          </TabsList>
          <TabsContent value={"gauges"} className="mt-6">
            <DataTable
              loading={isGaugeListLoading}
              validating={isGaugeListValidating}
              columns={validatorGaugeColumns}
              data={gaugeList ?? []}
            />
          </TabsContent>
          <TabsContent value={"incentives"} className="mt-6">
            <DataTable
              loading={isLoading}
              validating={isValidating}
              columns={validator_gauge_columns}
              data={activeIncentivesArray ?? []}
              className="w-full overflow-x-scroll"
            />
          </TabsContent>
        </Tabs>
      </div>
      <GlobalGaugeWeightChart
        gaugeWeights={validator.cuttingBoard.weights}
        totalAmountStaked={validator.amountStaked}
        globalAmountStaked={"10000000"}
        isLoading={isLoading}
        showTotal={false}
      />
    </div>
  );
};
