import { type CuttingBoardWeight } from "@bera/berajs";
import { GaugeIcon } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";

export const GaugeOverview = ({
  totalGauges,
  featuredGauges,
  isLoading,
}: {
  totalGauges: number;
  featuredGauges: CuttingBoardWeight[];
  isLoading: boolean;
}) => {
  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-[35px] w-[75px]" />
      ) : (
        <div className="inline-flex h-7 items-end gap-1">
          <span className="text-2xl font-semibold leading-6">
            {totalGauges}
          </span>
        </div>
      )}
      {!isLoading ? (
        <div className="mt-1 flex w-fit items-center gap-1 rounded-sm border border-border bg-background p-1 pr-2">
          {featuredGauges.map((gauge: CuttingBoardWeight, index: number) => (
            <GaugeIcon
              key={index}
              address={gauge.receiver}
              size="md"
              overrideImage={gauge.receiverMetadata?.logoURI ?? ""}
            />
          ))}
          {totalGauges > 3 && (
            <span className="text-sm leading-5 text-muted-foreground">
              {" "}
              +{totalGauges - 3}
            </span>
          )}
        </div>
      ) : (
        <Skeleton className="mt-1 h-6 w-[75px]" />
      )}
    </div>
  );
};
