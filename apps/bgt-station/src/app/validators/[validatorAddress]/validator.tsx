"use client";

import React from "react";
import Link from "next/link";
import {
  truncateHash,
  usePollActiveValidators,
  usePollGlobalValidatorBribes,
} from "@bera/berajs";
import { Tooltip, ValidatorIcon } from "@bera/shared-ui";
import { Badge } from "@bera/ui/badge";
import { Icons } from "@bera/ui/icons";
import { formatUnits, type Address } from "viem";

import {
  useHistoricalBribes,
  type FormattedHistoricalBribes,
} from "~/hooks/useHistoricalBribes";
import { usePollPrices } from "~/hooks/usePollPrices";
import BribeList from "./bribe-list";
import BribesAndEmissions from "./bribes-and-emissions";
import Uptime from "./uptime";
import ValidatorActivitiesTable from "./validator-activities-table";
import ValidatorDetails from "./validator-details";
import ValidatorGaugeWeightInfo from "./validator-gauge-weight";

export default function Validator({
  validatorAddress,
  allEpochs,
}: {
  validatorAddress: Address;
  allEpochs: any;
}) {
  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const { usePolValidator } = usePollGlobalValidatorBribes(prices);
  const validator = usePolValidator(validatorAddress);
  const { usePercentageDelegated } = usePollActiveValidators();
  const percentageDelegated = usePercentageDelegated(validatorAddress);
  const { data, isLoading } = useHistoricalBribes(allEpochs);

  return (
    <div className="container relative mb-10 flex max-w-[1078px] flex-col gap-16">
      <div>
        <div className="flex flex-col gap-3">
          <Link
            className="flex items-center gap-1 text-sm font-medium leading-[14px] text-muted-foreground hover:cursor-pointer"
            href="/validators"
          >
            <Icons.arrowLeft className="relative h-4 w-4" />
            Validators
          </Link>
          <div className="absolute right-0 top-0">
            {validator?.status === "BOND_STATUS_BONDED" ? (
              <Badge
                variant="success"
                className="border-none bg-success px-2 py-1 text-xs"
              >
                Active
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="border-none bg-muted px-2 py-1 text-xs"
              >
                Inactive
              </Badge>
            )}
          </div>
          <div className="flex w-full items-center justify-center gap-2 text-3xl font-bold leading-[48px] md:text-5xl ">
            <ValidatorIcon address={validatorAddress} className="h-12 w-12" />
            {validator?.description.moniker ?? "Loading..."}
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            {/* <div className="text-sm font-medium leading-none text-muted-foreground">
              Hex address: {truncateHash(validatorAddress, 6)}
            </div> */}
            <div className="text-sm font-medium leading-none text-muted-foreground">
              Operator address:{" "}
              {validator
                ? truncateHash(validator?.operatorAddr, 6)
                : "Loading..."}
            </div>
            <div className="text-sm font-medium leading-none text-muted-foreground">
              Consensus address:{" "}
              {validator ? truncateHash(validator?.consAddr, 6) : "Loading..."}
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
            vApy={validator?.vApy ? validator.vApy.toFixed(2) : "0"}
          />
          <Uptime address={validatorAddress} />
        </div>
      </div>
      <BribesAndEmissions
        validatorAddress={validatorAddress}
        historicalBribes={data as FormattedHistoricalBribes[]}
        isLoading={isLoading}
      />

      <div className="">
        <div className="mb-4 flex items-center text-lg font-semibold leading-7">
          Cutting Board{" "}
          <Tooltip text="Where this validator's block rewards are being directed" />
        </div>
        <ValidatorGaugeWeightInfo validatorAddress={validatorAddress} />
      </div>
      <BribeList validatorAddress={validatorAddress} />
      <ValidatorActivitiesTable validatorAddress={validatorAddress} />
    </div>
  );
}
