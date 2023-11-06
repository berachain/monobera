import { usePollPrices } from "@bera/berajs";
import { Skeleton } from "@bera/ui/skeleton";

import GlobalGaugeWeight from "~/components/global-gauge-weight";
import { useGlobalValidatorGaugeWeight } from "~/hooks/useGaugeWeights";

export default function GlobalGaugeWeightInfo() {
  const { usePrices } = usePollPrices();
  const { data: prices } = usePrices();
  const { data, isLoading } = useGlobalValidatorGaugeWeight();
  return (
    <div>
      <>
        {(isLoading || !data || !data.length || !prices) ? (
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
          <GlobalGaugeWeight gaugeWeights={data??[]} />
        )}
      </>
    </div>
  );
}
