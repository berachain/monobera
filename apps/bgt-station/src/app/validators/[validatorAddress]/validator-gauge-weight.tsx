import { Skeleton } from "@bera/ui/skeleton";

import GlobalGaugeWeight from "~/components/global-gauge-weight";
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
          <GlobalGaugeWeight gaugeWeights={data ?? []} />
        )}
      </>
    </div>
  );
}
