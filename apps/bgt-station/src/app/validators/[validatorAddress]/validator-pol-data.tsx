import { type Validator } from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@bera/ui/tabs";
import GlobalGaugeWeightChart from "~/components/global-gauge-weight-chart";
import { validatorIncentivesColumns } from "./validator-incentives-columns";
import { useAggregatedBribes } from "../../../hooks/useAggregatedBribes";
export const ValidatorPolData = ({
  validator,
}: {
  validator: Validator;
}) => {
  const aggregatedBribes = useAggregatedBribes(validator);
  return (
    <div className="w-full flex flex-col lg:flex-row mt-6 gap-6">
      <div className="w-full">
        <Tabs defaultValue="gauges">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gauges">Gauges</TabsTrigger>
            <TabsTrigger value="incentives">Incentives</TabsTrigger>
          </TabsList>
          <TabsContent value={"gauges"} className="mt-6">
            {/* <DataTable columns={validatorGaugeColumns} data={validator.cuttingboard}  /> */}
          </TabsContent>

          <TabsContent value={"incentives"} className="mt-6">
            <DataTable
              columns={validatorIncentivesColumns}
              data={aggregatedBribes}
            />
          </TabsContent>
        </Tabs>
      </div>
      <GlobalGaugeWeightChart
        gaugeWeights={validator.cuttingboard}
        totalAmountStaked={validator.amountStaked}
        globalAmountStaked={"10000000"}
      />
    </div>
  );
};
