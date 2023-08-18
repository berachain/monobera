import { Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

import Card from "~/components/card";
import DonutChart from "~/components/donut-chart";
import LineChart from "~/components/line-chart";

export default function TotalBorrowed() {
  const ticker = "ETH";
  const info = [
    {
      title: "Reserve factor",
      value: "15.00%",
      tooltip:
        "The Maximum LTV ratio represents the maximum borrowing power of a specific collateral. For example, if a collateral has an LTV of 75%, the user can borrow up to 0.75 worth of ETH in the principal currency for every 1 ETH worth of collateral.",
    },
    {
      title: "Collector contract",
      value: (
        <>
          View Contract{" "}
          <Icons.external className="inline h-4 w-4 text-muted-foreground hover:cursor-pointer" />
        </>
      ),
    },
  ];
  const color = "#FCD34D ";
  return (
    <div className="w-full">
      <div className="text-2xl font-semibold leading-loose">
        Total Borrowed {ticker}
      </div>
      <Card className="flex flex-col gap-8 p-9">
        <div className="flex gap-8">
          <DonutChart percentage={16.85} color={color} />

          <div className="flex flex-col gap-[6px]">
            <div className="text-sm font-normal leading-normal text-muted-foreground">
              Total Borrowed
            </div>
            <div className=" text-xl font-semibold leading-7">
              $303.21K of 1.80M
            </div>
            <div className="text-xs font-medium leading-tight text-muted-foreground">
              $570.07M of 3.38B
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <div className="text-sm font-normal leading-normal text-muted-foreground">
              Borrow cap
              <Tooltip text="?" />
            </div>
            <div className=" text-xl font-semibold leading-7">
              $1.49 Million
            </div>
            <div className="text-xs font-medium leading-tight text-muted-foreground">
              $2.63 Bollion
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <div className="text-sm font-normal leading-normal text-muted-foreground">
              APY, variable
              <Tooltip text="Variable interest rate will fluctuate based on the market conditions. Recommended for short-term positions." />
            </div>
            <div className="text-xl font-semibold leading-7">3.69%</div>
          </div>
        </div>

        <div>
          <LineChart
            labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
            data={[
              {
                data: [-60, -20, -60, 60, 0, 20, -20],
                title: "Borrow APR, Variable",
                color: color,
              },
            ]}
          />
        </div>

        <div>
          <div className="mb-4 font-medium">Collateral Usage</div>
          <div className="flex flex-col gap-4 md:flex-row">
            {info.map((item) => (
              <Card
                className="flex flex-1 justify-between bg-muted px-4 py-2 md:flex-col"
                key={item.title}
              >
                <div className="flex items-center gap-[6px] text-xs text-muted-foreground md:text-sm">
                  {item.title}
                  {item.tooltip && <Tooltip text={item.tooltip} />}
                </div>
                <div className="text-lg font-semibold leading-7 md:mt-[6px]">
                  {item.value}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
