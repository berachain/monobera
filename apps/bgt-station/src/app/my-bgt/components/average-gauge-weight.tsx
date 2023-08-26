import { usePollDelegatorValidators } from "@bera/berajs";

import GlobalGaugeWeight from "~/components/global-gauge-weight";
import Nothing from "../nothing";

export default function AverageGaugeWeight() {
  const { useTotalValidatorsDelegated } = usePollDelegatorValidators();
  const total = useTotalValidatorsDelegated();

  return (
    <div>
      {total !== 0 ? (
        <GlobalGaugeWeight globalCuttingBoard={[]} />
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
