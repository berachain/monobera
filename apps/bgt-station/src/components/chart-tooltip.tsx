import uniqolor from "uniqolor";
import { GaugeIcon } from "~/app/validators/validators-table";

export function ChartTooltip({ gauge }: { gauge: any }) {
  if (!gauge) return null;
  const otherInfo = "BERPS HONEY VAULT";
  return (
    <div className="z-1000 flex min-w-[220px] gap-2 rounded-md border p-3 backdrop-blur-md">
      <div
        className="h-20 w-1 rounded-full"
        style={{ background: uniqolor(gauge.address).color }}
      />
      <div className="flex w-full flex-col justify-between whitespace-nowrap ">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 text-sm font-semibold leading-5">
            {(gauge.percentage * 100).toFixed(2)}%
            <div className="text-sm font-normal leading-5 text-muted-foreground">
              (4.46M BGT)
            </div>
          </div>
          <div className="flex h-[18px] items-center rounded-xs bg-muted-foreground bg-opacity-10 p-1 text-[10px]">
            #01
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-1">
          <div className="text-forgeound flex flex-row items-center gap-2 whitespace-nowrap font-bold leading-5">
            <GaugeIcon address={gauge.address} />
            {gauge.name}
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap text-xs leading-4 text-muted-foreground">
            <GaugeIcon address={gauge.address} className="h-4 w-4" />{" "}
            {otherInfo}
          </div>
        </div>
      </div>
    </div>
  );
}
