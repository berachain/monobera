import { Tooltip } from "@bera/shared-ui";

import { type RateItem } from "~/utils/getServerSideData";
import Card from "~/components/card";
import LineChart from "~/components/line-chart";

type graph = {
  "24H": RateItem[];
  "7D": RateItem[];
  "30D": RateItem[];
  ALL_TIME: RateItem[];
};

export default function InterestRateOvertime({
  reserveData,
  graphData,
}: {
  reserveData: any;
  graphData: {
    borrow: graph;
    utilization: graph;
  };
}) {
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
            {reserveData.borrowVariableAPR}
            <div className=" text-xl font-semibold leading-7">54.29%</div>
          </div>
        </div>

        <div>
          <LineChart
            data={[
              {
                data: graphData.borrow,
                title: "Borrow APR, Variable",
                color: "#292524",
              },
              {
                data: graphData.utilization,
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
