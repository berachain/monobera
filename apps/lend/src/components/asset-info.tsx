import { usePollReservesDataList } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";

import DonutChart from "~/components/donut-chart";

export default function AssetInfo({ asset }: { asset: any }) {
  const info = [
    {
      title: "Max LTV",
      value: `${(Number(asset?.formattedBaseLTVasCollateral) * 100).toFixed(
        2,
      )}%`,
    },
    {
      title: "Liquidation Threshold",
      value: `${(
        Number(asset?.formattedReserveLiquidationThreshold) * 100
      ).toFixed(2)}%`,
    },
    {
      title: "Liquidation Penalty",
      value: `${(Number(asset?.formattedReserveLiquidationBonus) * 100).toFixed(
        2,
      )}%`,
    },
  ];
  const color = "#FBBF24";

  return (
    <div className="w-[300px] p-4 capitalize">
      <div className="flex gap-4">
        <DonutChart
          percentage={
            Number(asset?.supplyCap) !== 0
              ? (Number(asset?.totalLiquidity) / Number(asset?.supplyCap)) * 100
              : 0
          }
          color={color}
        />

        <div className="flex flex-col gap-[6px]">
          <div className="text-xs font-normal leading-normal text-muted-foreground md:text-sm">
            Total Deposited
          </div>

          <div className="whitespace-nowrap font-semibold leading-7 md:text-xl">
            <FormattedNumber value={asset?.totalLiquidity} /> of{" "}
            <FormattedNumber value={asset?.supplyCap} />
          </div>

          <div className="text-xs font-medium leading-tight text-muted-foreground">
            <FormattedNumber value={asset?.totalLiquidityUSD} symbol="USD" /> of{" "}
            <FormattedNumber value={asset?.supplyCapUSD} symbol="USD" />
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-1">
        {info.map((item) => (
          <div
            className="flex h-5 w-full items-center justify-between"
            key={item.title}
          >
            <div className="text-xs font-normal text-muted-foreground">
              {item.title}
            </div>
            <div className="text-sm font-medium">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
