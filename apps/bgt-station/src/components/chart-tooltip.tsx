import { truncateHash } from "@bera/berajs";

export const ChartTooltip: React.FC<{
  color: string;
  visible: boolean;
  gauge?: any;
}> = ({ color, visible, gauge }) => {
  if (!visible) return null;

  return (
    <div
      className="flex h-[68px] w-[320px] flex-row overflow-hidden rounded-md border bg-foreground"
      style={{ border: `1px solid ${color}` }}
    >
      <div
        className="flex min-w-[90px] items-center justify-center text-sm font-semibold text-white"
        style={{ backgroundColor: color }}
      >
        {(gauge.percentage * 100).toFixed(2)}%
      </div>
      <div className="flex flex-col items-center justify-center p-3">
        <div className="text-md flex items-center justify-center font-semibold text-black">
          {truncateHash(gauge.address)}
        </div>
        <div className="flex items-center justify-center text-sm text-muted-foreground">
          {truncateHash(gauge.address)}
        </div>
      </div>
    </div>
  );
};
