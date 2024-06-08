import { type CuttingBoardWeight } from "@bera/berajs";
import { GaugeIcon, MarketIcon } from "@bera/shared-ui";
import uniqolor from "uniqolor";

export type CuttingBoardWeightMega = CuttingBoardWeight & {
  percentage: number;
  id: number;
};

export function ChartTooltip({
  gauge,
}: {
  gauge: CuttingBoardWeightMega | undefined;
}) {
  if (!gauge) return null;
  return (
    <div className="z-1000 flex min-w-[220px] gap-2 rounded-md border p-3 backdrop-blur-md">
      <div
        className="h-20 w-1 rounded-full"
        style={{ background: uniqolor(gauge.receiver).color }}
      />
      <div className="flex w-full flex-col justify-between whitespace-nowrap ">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 text-sm font-semibold leading-5">
            {(gauge.percentage * 100).toFixed(2)}%
            {/* <div className="text-sm font-normal leading-5 text-muted-foreground">
              <FormattedNumber value={gauge.amount} compact /> BGT
            </div> */}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-1">
          <div className="text-forgeound flex flex-row items-center gap-2 whitespace-nowrap font-bold leading-5">
            <GaugeIcon
              address={gauge.receiverMetadata?.vaultAddress ?? ""}
              overrideImage={gauge.receiverMetadata?.logoURI ?? ""}
            />{" "}
            {gauge.receiverMetadata?.name ?? ""}
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap text-xs leading-4 text-muted-foreground">
            <MarketIcon
              market={gauge.receiverMetadata?.product ?? ""}
              className="h-4 w-4"
            />{" "}
            {gauge.receiverMetadata?.product ?? ""}
          </div>
        </div>
      </div>
    </div>
  );
}
