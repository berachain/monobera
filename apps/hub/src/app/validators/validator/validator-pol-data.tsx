import { ActiveIncentive, usePollGauges, type Validator } from "@bera/berajs";
import { SimpleTable, useAsyncTable } from "@bera/shared-ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import GlobalGaugeWeightChart from "~/components/global-gauge-weight-chart";
import { validator_gauge_columns } from "~/columns/gauge-incentives-columns";
import { getValidatorGaugeColumns } from "~/columns/validator-gauge-columns";
import { type ActiveIncentiveWithVault } from "~/types/validators";

export const getActiveIncentivesArray = (
  validator: Validator | undefined,
): ActiveIncentiveWithVault[] => {
  if (!validator) return [];
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
export const ValidatorPolData = ({ validator }: { validator: Validator }) => {
  const {
    gaugeList,
    isLoading: isGaugeListLoading,
    isValidating: isGaugeListValidating,
  } = usePollGauges({ validatorId: validator?.id });

  const activeIncentivesArray: ActiveIncentiveWithVault[] =
    getActiveIncentivesArray(validator);

  const gaugesTable = useAsyncTable({
    fetchData: async () => {},
    columns: getValidatorGaugeColumns(validator as Validator),
    data: gaugeList ?? [],
    additionalTableProps: {
      manualSorting: false,
      meta: {
        loading: isGaugeListLoading,
        loadingText: "Loading...",
        validating: isGaugeListValidating,
      },
    },
  });

  const incentivesTable = useAsyncTable({
    fetchData: async () => {},
    columns: validator_gauge_columns,
    data: activeIncentivesArray ?? [],
    additionalTableProps: {
      manualSorting: false,
      meta: {
        // loading: isLoading,
        loadingText: "Loading...",
        // validating: isValidating,
      },
    },
  });

  return (
    <div className="mt-6 flex w-full flex-col gap-6 lg:flex-row">
      <div className="w-full">
        <Tabs defaultValue="gauges">
          <TabsList variant="ghost" className="">
            <TabsTrigger value="gauges">Gauges</TabsTrigger>
            <TabsTrigger value="incentives">Incentives</TabsTrigger>
          </TabsList>
          <TabsContent value={"gauges"} className="mt-6">
            <SimpleTable
              table={gaugesTable}
              // variant="ghost"
              wrapperClassName={"w-full"}
              flexTable
              dynamicFlex
              showToolbar={false}
            />
          </TabsContent>
          <TabsContent value={"incentives"} className="mt-6">
            <SimpleTable
              table={incentivesTable}
              // variant="ghost"
              wrapperClassName={"w-full"}
              flexTable
              dynamicFlex
              showToolbar={false}
            />
          </TabsContent>
        </Tabs>
      </div>
      <GlobalGaugeWeightChart
        gaugeWeights={validator?.cuttingBoard.weights}
        totalAmountStaked={validator?.amountStaked ?? "0"}
        globalAmountStaked={"10000000"}
        isLoading={false}
        showTotal={false}
      />
    </div>
  );
};
