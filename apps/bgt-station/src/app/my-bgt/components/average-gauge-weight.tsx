import { usePollDelegatorValidators } from "@bera/berajs";

import GlobalGaugeWeight from "~/components/global-gauge-weight";
import { useUserGaugeWeight } from "~/hooks/useUserGaugeWeight";
import Nothing from "../nothing";

export default function AverageGaugeWeight() {
  const { useTotalValidatorsDelegated } = usePollDelegatorValidators();
  const total = useTotalValidatorsDelegated();
  const { data, isLoading } = useUserGaugeWeight();
  return (
    <div>
      {total !== 0 ? (
        <>
          {isLoading ? (
            <div>Loading</div>
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
