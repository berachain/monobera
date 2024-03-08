import { truncateHash, useGauges } from "@bera/berajs";
import { getAddress } from "viem";

import { GaugeIcon } from "~/app/validators/validators-table";

export const ChartTooltip: React.FC<{
  color: string;
  visible: boolean;
  gauge?: any;
}> = ({ color, visible, gauge }) => {
  if (!visible) return null;
  const { gaugeDictionary } = useGauges();
  const name = gaugeDictionary[getAddress(gauge.address)]?.name;

  return (
    <div
      className="z-1000 flex h-[68px] w-[320px] flex-row overflow-hidden rounded-md border bg-background"
      style={{ border: `1px solid ${color}` }}
    >
      <div
        className="text-md flex min-w-[90px] items-center justify-center font-semibold text-white"
        style={{ backgroundColor: color }}
      >
        {(gauge.percentage * 100).toFixed(2)}%
      </div>
      <div className="flex flex-col items-start justify-center p-3">
        <div className="text-md text-forgeound flex flex-row items-center justify-center gap-2 font-semibold">
          <GaugeIcon address={gauge.address ?? ""} />
          {name ?? "Test default gauge"}
        </div>
        <div className="flex items-start justify-center text-sm text-muted-foreground">
          {truncateHash(gauge.address)}
        </div>
      </div>
    </div>
  );
};
