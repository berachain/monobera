"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { truncateHash, usePollActiveValidators } from "@bera/berajs";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Badge } from "@bera/ui/badge";
import { Icons } from "@bera/ui/icons";

import Uptime from "./uptime";
import ValidatorDetails from "./validator-details";

// need
// const DynamicChart = dynamic(() => import("~/components/cutting-board-chart"), {
//   loading: () => <p>Loading...</p>,
//   ssr: false,
// });

export default function Validator({
  validatorAddress,
}: {
  validatorAddress: string;
}) {
  const router = useRouter();
  // const { usePollSelectedValidatorCuttingBoard } = usePollActiveValidators();
  // const cuttingBoard = usePollSelectedValidatorCuttingBoard(validatorAddress);
  // console.log("cb", cuttingBoard, validatorAddress);

  return (
    <div className="container mb-10 flex max-w-[1078px] flex-col gap-16">
      <div>
        <div className="flex flex-col gap-3">
          <div
            className="flex items-center gap-1 text-sm font-medium leading-[14px] text-primary-foreground hover:cursor-pointer"
            onClick={() => router.push("/validators")}
          >
            <Icons.arrowLeft className="relative h-4 w-4" />
            Validators
          </div>

          <div className="flex w-full items-center justify-center gap-2 text-5xl font-bold leading-[48px] ">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="font-bold">
                validator avatar
              </AvatarFallback>
            </Avatar>
            Validator name
          </div>

          <div className="flex items-center justify-center gap-1">
            {true ? (
              <Badge variant="success" className="px-2 py-1">
                Active
              </Badge>
            ) : (
              <Badge variant="secondary" className="px-2 py-1">
                Inactive
              </Badge>
            )}
            <div className="text-sm font-medium leading-[14px] text-muted-foreground">
              Hex address: {truncateHash(validatorAddress, 6)}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <ValidatorDetails
            address={validatorAddress}
            decription={
              <>
                Season 4 lays the groundwork to align the entire community
                around Collective Intents. Intents are directional goals that
                allow the Collective to align and focus. Intent #4 is:
                Governance Accessibility. Season 4 lays the groundwork to align
                the entire community around Collective Intents. Intents are
                directional goals that allow the Collective to align and focus.
                Intent #4 is: Governance Accessibility.{" "}
              </>
            }
            commissions={"20%"}
            uptime={"99%"}
            votingPower={"69.42M (6.9%)"}
            website={"https://berachain.com/"}
          />
          <Uptime />
        </div>
      </div>
    </div>
  );
}
