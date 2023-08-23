"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { truncateHash, usePollActiveValidators } from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { ValidatorIcon } from "@bera/shared-ui/src/validator-icon";
import { Badge } from "@bera/ui/badge";
import { Icons } from "@bera/ui/icons";
import { formatUnits, type Address } from "viem";

import GlobalGaugeWeight from "~/components/global-gauge-weight";
import BribeList from "./bribe-list";
import BribesAndEmissions from "./bribes-and-emissions";
import Uptime from "./uptime";
import ValidatorActivitiesTable from "./validator-activities-table";
import ValidatorDetails from "./validator-details";

// need
// const DynamicChart = dynamic(() => import("~/components/cutting-board-chart"), {
//   loading: () => <p>Loading...</p>,
//   ssr: false,
// });

export default function Validator({
  validatorAddress,
  cuttingBoard,
}: {
  validatorAddress: Address;
  cuttingBoard: any;
}) {
  const router = useRouter();

  console.log("cuttingBoard", cuttingBoard);
  const { useActiveValidator, usePercentageDelegated } =
    usePollActiveValidators();
  const validator = useActiveValidator(validatorAddress);
  const percentageDelegated = usePercentageDelegated(validatorAddress);
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

          <div className="flex w-full items-center justify-center gap-2 text-3xl font-bold leading-[48px] md:text-5xl ">
            <ValidatorIcon address={validatorAddress} className="h-12 w-12" />
            {validator?.description.moniker}
          </div>

          <div className="flex items-center justify-center gap-1">
            {validator?.status === "BOND_STATUS_BONDED" ? (
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
        <div className="mt-8 flex flex-col gap-16 md:flex-row md:gap-4">
          <ValidatorDetails
            address={validatorAddress}
            decription={<>{validator?.description.details}</>}
            commissions={
              (
                Number(
                  formatUnits(
                    validator?.commission.commissionRates.rate ?? 0n,
                    18,
                  ),
                ) * 100
              ).toString() + "%"
            }
            uptime={"99%"}
            votingPower={`${percentageDelegated?.toFixed(2) ?? 0}%`}
            website={validator?.description.website ?? ""}
          />
          <Uptime />
        </div>
      </div>
      <BribesAndEmissions />

      <div className="">
        <div className="mb-4 flex items-center text-lg font-semibold leading-7">
          Average Gauge Weight <Tooltip text="Bribes and emissions" />
        </div>
        <GlobalGaugeWeight globalCuttingBoard={[]} />
      </div>

      <div className="">
        <div className="mb-4 flex items-center text-lg font-semibold leading-7">
          Bribes
        </div>
        <BribeList />
      </div>

      <ValidatorActivitiesTable validatorAddress={validatorAddress} />
    </div>
  );
}
