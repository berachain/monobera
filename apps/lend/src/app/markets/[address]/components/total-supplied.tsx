import { Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { formatEther } from "viem";

import { type RateItem } from "~/utils/getServerSideData";
import Card from "~/components/card";
import DonutChart from "~/components/donut-chart";
import LineChart from "~/components/line-chart";

export default function TotalSupplied({
  reserveData,
  graphData,
}: {
  reserveData: any;
  graphData: {
    "24H": RateItem[];
    "7D": RateItem[];
    "30D": RateItem[];
    ALL_TIME: RateItem[];
  };
}) {
  const ticker = "ETH";
  const info = [
    {
      title: "Max LTV",
      value: "$570.64M",
      tooltip:
        "The Maximum LTV ratio represents the maximum borrowing power of a specific collateral. For example, if a collateral has an LTV of 75%, the user can borrow up to 0.75 worth of ETH in the principal currency for every 1 ETH worth of collateral.",
    },
    {
      title: "Liquidation Threshold",
      value: "$300.64M",
      tooltip:
        "This represents the threshold at which a borrow position will be considered undercollateralized and subject to liquidation for each collateral. For example, if a collateral has a liquidation threshold of 80%, it means that the position will be liquidated when the debt value is worth 80% of the collateral value.",
    },
    {
      title: "Liquidation Penalty",
      value: "42.69%",
      tooltip:
        "When a liquidation occurs, liquidators repay up to 50% of the outstanding borrowed amount on behalf of the borrower. In return, they can buy the collateral at a discount and keep the difference as a bonus.",
    },
  ];
  const color = "#059669";
  return (
    <div>
      <div className="text-2xl font-semibold leading-loose">
        Total Supplied {ticker}
      </div>
      <Card className="flex flex-col gap-8 p-6 md:p-9">
        <div className="flex justify-between md:justify-start md:gap-8">
          <DonutChart percentage={16.85} color={color} />

          <div className="flex flex-col gap-[6px]">
            <div className="text-xs font-normal leading-normal text-muted-foreground md:text-sm">
              Total Supplied
            </div>
            <div className="font-semibold leading-7 md:text-xl">
              $303.21K of 1.80M
            </div>
            <div className="text-xs font-medium leading-tight text-muted-foreground">
              $570.07M of 3.38B
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <div className="text-xs font-normal leading-normal text-muted-foreground md:text-sm">
              APY
            </div>
            {reserveData ? (
              <div className="font-semibold leading-7 md:text-xl">
                {Number(formatEther(reserveData.currentLiquidityRate)).toFixed(
                  2,
                )}
                %
              </div>
            ) : (
              <Skeleton className="h-7 w-20" />
            )}
          </div>
        </div>

        <div>
          <LineChart
            data={[
              {
                data: graphData,
                title: "Supply APR",
                color: color,
              },
            ]}
          />
        </div>

        <div>
          <div className="mb-4 font-medium">
            Collateral Usage
            <span className="text-xs font-medium leading-tight text-success-foreground">
              <Icons.check className="ml-3 mr-1 inline h-4 w-4" />
              Can be used as collateral
            </span>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            {info.map((item) => (
              <Card
                className="flex flex-1 justify-between bg-muted px-4 py-2 md:flex-col"
                key={item.title}
              >
                <div className="flex items-center gap-[6px] text-xs text-muted-foreground md:text-sm">
                  {item.title}
                  <Tooltip text={item.tooltip} />{" "}
                </div>
                <div className=" text-lg font-semibold leading-7 md:mt-[6px]">
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
