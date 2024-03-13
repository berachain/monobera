import { Skeleton } from "@bera/ui/skeleton";

import GlobalGaugeWeightTable from "~/components/global-gauge-weight-table";
import { useGlobalValidatorGaugeWeight } from "~/hooks/useGaugeWeights";
import GlobalGaugeWeightChart from "./global-gauge-weight-chart";

export default function GlobalGaugeWeightInfo() {
  const prices = undefined;
  const { data, isLoading } = useGlobalValidatorGaugeWeight();
  return (
    <div>
      <>
        {isLoading || !data || !data.length || !prices ? (
          <div className="flex flex-col gap-16 md:flex-row">
            <Skeleton className="h-[300px] w-[300px] flex-shrink-0 rounded-full" />
            <div className="mt-10 flex w-full flex-col gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ) : (
          <div className="mt-8 flex w-full flex-col items-center gap-16 lg:flex-row ">
            <GlobalGaugeWeightChart gaugeWeights={data ?? []} />
            <GlobalGaugeWeightTable gaugeWeights={data ?? []} />
          </div>
        )}
      </>
    </div>
  );
}
