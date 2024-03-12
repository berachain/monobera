import { Skeleton } from "@bera/ui/skeleton";

import GlobalGaugeWeightChart from "~/components/global-gauge-weight-chart";
import GlobalGaugeWeightTable from "~/components/global-gauge-weight-table";
import { useValidatorGaugeWeight } from "~/hooks/useGaugeWeights";

export default function ValidatorGaugeWeightInfo({
  validatorAddress,
}: {
  validatorAddress: string;
}) {
  const prices = undefined;

  const { data, isLoading } = useValidatorGaugeWeight(validatorAddress);
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
          <div className="mt-8 flex w-full flex-col items-center gap-16 lg:flex-row ">
            <GlobalGaugeWeightChart gaugeWeights={data ?? []} />
            <GlobalGaugeWeightTable gaugeWeights={data ?? []} />
          </div>
        )}
      </>
    </div>
  );
}
