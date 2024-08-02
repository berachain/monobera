import { useUserActiveValidators } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { Address } from "viem";

import { ConfirmationCard } from "../../components/confirmation-card";
import { useHandleConfirmation } from "../../useHandleConfirmation";
import { DelegateModal } from "./delegate-modal";
import { UnbondModal } from "./unbond-modal";

export const UserDelegation = ({ validator }: { validator: Address }) => {
  // U SHOULD USE SUBGRAOG VALID HERE 
  const { getSelectedUserValidator, isLoading } = useUserActiveValidators();
  const userValidator = getSelectedUserValidator(validator);
  const userStaked = userValidator?.userStaked;

  const {
    hasSubmittedTxn,
    isActivationLoading,
    ActivateModalPortal,
    isCancelLoading,
    CancelModalPortal,
    handleTransaction,
  } = useHandleConfirmation();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Your Delegations</div>
        <DelegateModal validator={validator} />
      </div>
      {isLoading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <>
          {!userValidator ? (
            <div className="flex h-full w-full items-center justify-center text-center text-sm font-medium leading-5 text-muted-foreground">
              You have no current or queued delegations
              <br />
              in this validator.
            </div>
          ) : (
            <>
              <div className="flex w-full justify-between rounded-sm border border-border p-4">
                <div className="font-medium leading-6">
                  <div className="flex items-center gap-1">
                    <FormattedNumber value={userStaked ?? "0"} />{" "}
                    <Icons.bgt className="ml-3 h-4 w-4" />
                    BGT
                  </div>
                  <div className="text-muted-foreground">Delegated</div>
                </div>
                <UnbondModal userValidator={userValidator} />
              </div>
              <hr />
              {ActivateModalPortal}
              {CancelModalPortal}
              <ConfirmationCard
                index={0} //@ts-ignore
                userValidator={userValidator}
                hasSubmittedTxn={hasSubmittedTxn[0] ?? false}
                isTxnLoading={isActivationLoading || isCancelLoading}
                handleTransaction={handleTransaction}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
