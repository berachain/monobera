import { useState } from "react";
import { useQuery } from "@apollo/client";
import { BERA_CHEF_ABI } from "@bera/berajs";
import { beraChefAddress } from "@bera/config";
import { GetFriendsOfTheChef } from "@bera/graphql";
import { ActionButton } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Address, encodeFunctionData } from "viem";

import { ProposalTypeEnum } from "../../types";
import { useCreateProposal } from "../useCreateProposal";
import { GaugeSelector } from "./gauge-selector";

export const UpdateFriendsOfChef = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [gauge, setGauge] = useState<
    { vault: Address; receiptToken: Address; isFriend: boolean } | undefined
  >(undefined);
  const encodedData = gauge
    ? encodeFunctionData({
        abi: BERA_CHEF_ABI,
        functionName: "updateFriendsOfTheChef",
        args: [gauge.vault, !gauge.isFriend],
      })
    : "0x";

  const { ModalPortal, submitProposal } = useCreateProposal([
    [beraChefAddress],
    [0],
    [encodedData],
    `#${ProposalTypeEnum.FRIENDS_OF_CHEF}# ${title}\n${description}`,
  ]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold leading-tight">Select Gauge</div>
        <GaugeSelector gauge={gauge} setGauge={setGauge} />
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
                    ? " text-destructive-foreground"
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

      <ActionButton>
        <Button
          type="submit"
          className="w-full"
          onClick={submitProposal}
          disabled={title.length === 0 || !gauge}
        >
          Submit
        </Button>
      </ActionButton>
      {ModalPortal}
    </>
  );
};
