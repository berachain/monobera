import { usePollDelegatorValidators } from "@bera/berajs";
import { cloudinaryUrl, docsUrl } from "@bera/config";
import { Skeleton } from "@bera/ui/skeleton";

import GlobalGaugeWeight from "~/components/global-gauge-weight";
import { useUserGaugeWeight } from "~/hooks/useGaugeWeights";
import { Banner } from "./banner";

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
            <GlobalGaugeWeight gaugeWeights={data ?? []} />
          )}
        </>
      ) : (
        <Banner
          img={`${cloudinaryUrl}/bears/j7rciiglmcozlxryug4z`}
          title="What is a gauge weight?"
          subtitle="We’ll teach you what all this de-fi jargon means."
          href={`${docsUrl}/getting-started/bgt-station-bgt.html#unbonding-bgt`}
        />
      )}
    </div>
  );
}
