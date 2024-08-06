import {
  useUserValidatorsSubgraph,
  type SubgraphUserValidator,
} from "@bera/berajs";
import { Skeleton } from "@bera/ui/skeleton";

import { useHandleConfirmation } from "../useHandleConfirmation";
import { ConfirmationCard } from "./confirmation-card";

export const BoostQueue = () => {
  const { data = [] } = useUserValidatorsSubgraph();
  const queuedList = data.filter((validator: SubgraphUserValidator) => {
    return parseFloat(validator.amountQueued) !== 0;
  });

  const {
    hasSubmittedTxn,
    isActivationLoading,
    ActivateModalPortal,
    isCancelLoading,
    CancelModalPortal,
    handleTransaction,
  } = useHandleConfirmation();

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {ActivateModalPortal}
      {CancelModalPortal}
      {!queuedList ? (
        <div>
          <Skeleton className="h-28 w-full rounded-md" />
          <Skeleton className="h-28 w-full rounded-md" />
        </div>
      ) : (
        <>
          {queuedList?.map(
            (validator: SubgraphUserValidator, index: number) => (
              <ConfirmationCard
                key={validator.coinbase}
                userValidator={validator}
                index={index}
                hasSubmittedTxn={hasSubmittedTxn[index] ?? false}
                isTxnLoading={isActivationLoading || isCancelLoading}
                handleTransaction={handleTransaction}
              />
            ),
          )}
          {!queuedList?.length && (
            <div className="text-muted-foreground">No validators in queue</div>
          )}
        </>
      )}
    </div>
  );
};
