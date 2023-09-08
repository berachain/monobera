import { Skeleton } from "@bera/ui/skeleton";

import GlobalGaugeWeight from "~/components/global-gauge-weight";
import { useGlobalValidatorGaugeWeight } from "~/hooks/useGaugeWeights";
import { usePollPrices } from "~/hooks/usePollPrices";

export default function GlobalGaugeWeightInfo() {
  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const { data, isLoading } = useGlobalValidatorGaugeWeight();
  console.log(data);
  return (
    <div>
      <>
        {isLoading && prices === undefined ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <GlobalGaugeWeight gaugeWeights={data ?? []} />
        )}
      </>
    </div>
  );
}
