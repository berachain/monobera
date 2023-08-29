import { usePollDelegatorValidators } from "@bera/berajs";
import { Skeleton } from "@bera/ui/skeleton";

import GlobalGaugeWeight from "~/components/global-gauge-weight";
import { useUserGaugeWeight } from "~/hooks/useUserGaugeWeight";
import Nothing from "../nothing";

export default function AverageGaugeWeight() {
  const { useTotalValidatorsDelegated } = usePollDelegatorValidators();
  const total = useTotalValidatorsDelegated();
  const { data, isLoading } = useUserGaugeWeight();
  return (
    <div>
      {total ? (
        <>
          {isLoading ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <GlobalGaugeWeight
              globalCuttingBoard={data?.result ? data.result : []}
            />
          )}
        </>
      ) : (
        <Nothing
          message={
            "This section will be populated once you have delegated to some validators. "
          }
        />
      )}
    </div>
  );
}
