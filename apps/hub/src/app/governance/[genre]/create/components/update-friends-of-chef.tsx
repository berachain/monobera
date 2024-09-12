import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@bera/ui";

import { GaugeSelector } from "./gauge-selector";
import { ProposalAction, ProposalTypeEnum } from "~/app/governance/types";

export const UpdateFriendsOfChef = ({
  action: gauge,
  setAction,
}: {
  action: ProposalAction & { type: ProposalTypeEnum.UPDATE_REWARDS_GAUGE };
  setAction: Dispatch<SetStateAction<ProposalAction>>;
}) => {
  // const encodedData = gauge
  //   ? encodeFunctionData({
  //       abi: BERA_CHEF_ABI,
  //       functionName: "updateFriendsOfTheChef",
  //       args: [gauge.receiptToken, !gauge.isFriend],
  //     })
  //   : "0x";

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold leading-tight">Select gauge</div>
        <GaugeSelector selectedGauge={gauge} setGauge={setAction} />
      </div>

      {gauge && (
        <div>
          <div className="mb-2 text-sm font-semibold leading-tight">Update</div>
          <div className="rounded-md border border-border p-3">
            <div className="flex gap-2 text-sm font-semibold">
              {gauge.isFriend ? "Remove" : "Add"} status:{" "}
              <span
                className={cn(
                  gauge.isFriend
                    ? "text-destructive-foreground"
                    : "text-success-foreground",
                )}
              >
                Receiving Emissions
              </span>
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Change this gauge to be in-eligible to receive emissions.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
