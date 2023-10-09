import { Tooltip } from "@bera/shared-ui";

import Card from "~/components/card";
import LineChart from "~/components/line-chart";

export default function InterestRateOvertime() {
  return (
    <div className="w-full">
      <div className="text-2xl font-semibold leading-loose">
        Interest Rate Overtime
      </div>
      <Card className="flex flex-col gap-8 p-9">
        <div className="flex gap-8">
          <div className="flex flex-col gap-[6px]">
            <div className="font-medium">Interest Rate Modal</div>
            <div className="text-sm font-normal leading-normal text-muted-foreground">
              Total Borrowed <Tooltip text="" />
            </div>
            <div className=" text-xl font-semibold leading-7">54.29%</div>
          </div>
        </div>

        <div>
          <LineChart
            labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
            data={[
              {
                data: [-60, -20, -60, 60, 0, 20, -20],
                title: "Borrow APR, Variable",
                color: "#292524",
              },
              {
                data: [0, 20, 0, -20, -60, -20, 20],
                title: "Utilization Rate",
                color: "#059669",
              },
            ]}
          />
        </div>
      </Card>
    </div>
  );
}
