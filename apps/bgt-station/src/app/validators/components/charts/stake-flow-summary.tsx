import { useMemo } from "react";
import { FormattedNumber } from "@bera/shared-ui";
import { BeraChart } from "@bera/ui/bera-chart";
import { ChartConfig, ChartContainer, ChartTooltip } from "@bera/ui/chart";
import { Icons } from "@bera/ui/icons";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
} from "@bera/ui/recharts";
import { Skeleton } from "@bera/ui/skeleton";
import uniqolor from "uniqolor";
import { Address } from "viem";

export const StakeFlowSummary = ({
  validatorAddress,
}: {
  validatorAddress: Address;
}) => {
  const pieChartDataMocked = {
    in: {
      value: 30,
      color: "#4ADE80",
    },
    out: {
      value: 70,
      color: "#F87171",
    },
  };

  const dataP = useMemo(() => {
    return {
      labels: ["Delegation-In", "Delegation-Out"],
      datasets: [
        {
          hoverBorderWidth: 10,
          borderRadius: 8,
          spacing: 5,
          borderWidth: 0,
          backgroundColor: [
            pieChartDataMocked.in.color,
            pieChartDataMocked.out.color,
          ],
          hoverBorderColor: [
            `${pieChartDataMocked.in.color}52`,
            `${pieChartDataMocked.out.color}52`,
          ],
          data: [pieChartDataMocked.in.value, pieChartDataMocked.out.value],
        },
      ],
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex w-full flex-col lg:flex-row items-center gap-8 text-sm font-normal leading-normal text-muted-foreground">
        <div className="flex w-full flex-1 flex-col gap-4">
          <div className="flex justify-between">
            <span className="text-md font-semibold">Delegation-In</span>
            <span className="text-md font-semibold text-green-400">
              + 18,524.14
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-md font-semibold ">Delegation-Out</span>
            <span className="text-md font-semibold text-red-400">
              - 28,524.14
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-md font-semibold ">Net Delegation</span>
            <span className="text-md font-semibold text-red-400">
              - 20,524.14
            </span>
          </div>
        </div>
        {/* <GlobalGaugeWeightChart
          gaugeWeights={validator?.cuttingBoard.weights}
          totalAmountStaked={validator?.amountStaked ?? "0"}
          globalAmountStaked={"10000000"}
          isLoading={isLoading}
          showTotal={false}
        /> */}
        <div className="h-[200px] w-[200px] relative mx-auto">
          <BeraChart
            data={dataP}
            options={{
              responsive: true,
              cutout: "70%",
              radius: "95%",
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
            type="doughnut"
          />
        </div>
      </div>
    </div>
  );
};
