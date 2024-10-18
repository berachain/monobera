import { Dispatch, SetStateAction, useEffect } from "react";
import { cn } from "@bera/ui";
import { Address, isAddress } from "viem";

import {
  CustomProposalActionErrors,
  ProposalAction,
  ProposalErrorCodes,
  ProposalTypeEnum,
} from "~/app/governance/types";
import { InputWithLabel } from "@bera/ui/input";
import { useIsFriendOfTheChef } from "@bera/berajs";
import { beraChefAddress } from "@bera/config";

export const UpdateFriendsOfChef = ({
  action: gauge,
  setAction,
  errors,
}: {
  action: ProposalAction & { type: ProposalTypeEnum.UPDATE_REWARDS_GAUGE };
  setAction: Dispatch<SetStateAction<ProposalAction>>;
  errors: CustomProposalActionErrors;
}) => {
  const { data: isFriendOfTheChef, isLoading } = useIsFriendOfTheChef(
    gauge.vault,
  );

  useEffect(() => {
    setAction({
      ...gauge,
      target: beraChefAddress,

      isFriend: !isFriendOfTheChef,
    });
  }, [isFriendOfTheChef, isLoading]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <InputWithLabel
          variant="black"
          label="Gauge Address"
          value={gauge?.vault}
          error={
            errors.vault === ProposalErrorCodes.REQUIRED
              ? "A Vault Must Be Chosen"
              : errors.vault === ProposalErrorCodes.INVALID_ADDRESS
                ? "Invalid gauge address."
                : errors.vault
          }
          onChange={async (e) => {
            setAction({
              ...gauge,
              vault: e.target.value as Address,
            });
          }}
        />
        {/* <div className="text-sm font-semibold leading-tight">Select gauge</div>
        <GaugeSelector selectedGauge={gauge} setGauge={setAction} />
        <FormError>
          {errors.vault === ProposalErrorCodes.REQUIRED
            ? "A Vault Must Be Chosen"
            : errors.vault === ProposalErrorCodes.INVALID_ADDRESS
              ? "Invalid gauge address."
              : errors.vault}
        </FormError> */}
      </div>

      {gauge && (
        <div>
          <div className="mb-2 text-sm font-semibold leading-tight">Update</div>
          <div className="rounded-md border border-border p-3">
            <div className="flex gap-2 text-sm font-semibold">
              {isFriendOfTheChef ? "Remove" : "Add"} status:{" "}
              {isAddress(gauge.vault ?? "") ? (
                <span
                  className={cn(
                    isFriendOfTheChef
                      ? "text-destructive-foreground"
                      : "text-success-foreground",
                  )}
                >
                  Receiving Emissions
                </span>
              ) : (
                <span>–</span>
              )}
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Update this reward vault to be {isFriendOfTheChef ? "in-" : ""}
              eligible to receive emissions.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
