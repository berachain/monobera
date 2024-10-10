import { FormattedNumber } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { formatEther } from "viem";

interface IProgressBar {
  color: string;
  width?: number; // 1 = 0.01  50 = 50%
  votesCount: string;
}

interface IProgressBarProps {
  className?: string;
  dataList: IProgressBar[];
}

export function ProgressBarChart({
  dataList,
  className,
  ...props
}: IProgressBarProps) {
  return (
    <div {...props} className={cn("flex flex-col gap-2", className)}>
      <div className="relative flex h-4 justify-between text-xs font-bold">
        {Number(dataList[0].votesCount) > 0 && (
          <FormattedNumber
            value={formatEther(BigInt(dataList[0].votesCount))}
            className="absolute left-0 text-success-foreground"
            visibleDecimals={1}
          />
        )}
        {Number(dataList[1].votesCount) > 0 && (
          <FormattedNumber
            value={formatEther(BigInt(dataList[1].votesCount))}
            className="absolute right-0 text-destructive-foreground"
            visibleDecimals={1}
          />
        )}
        {Number(dataList[2].votesCount) > 0 && (
          <FormattedNumber
            value={formatEther(BigInt(dataList[2].votesCount))}
            className="absolute left-[50%] -translate-x-[50%] transform text-muted-foreground"
            visibleDecimals={1}
          />
        )}
      </div>
      <div className="relative">
        <div className="h-2 w-full rounded-full bg-secondary-foreground" />
        {dataList.map((data, i) => (
          <div
            key={(data.width, data.color)}
            className={"absolute left-0 top-0 h-2 rounded-full"}
            style={{
              width: `${data.width ?? 0}%`,
              backgroundColor: data.color,
              zIndex: 10 + (5 - i * 1),
            }}
          />
        ))}
      </div>
    </div>
  );
}
