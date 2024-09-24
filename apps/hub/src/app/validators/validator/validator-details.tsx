import React from "react";
import Link from "next/link";
import { truncateHash, type Validator } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import {
  FormattedNumber,
  Tooltip,
  ValidatorIcon,
  apyTooltipText,
} from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

export default function ValidatorDetails({
  validator,
}: {
  validator: Validator;
}) {
  const validatorDataItems = [
    {
      title: "APY",
      value: (
        <div className="text-xl font-semibold">
          <FormattedNumber
            value={(validator.apy ?? 0) / 10000}
            showIsSmallerThanMin
            percent
          />
        </div>
      ),
      tooltipText: apyTooltipText(),
    },
    {
      title: "Voting Power",
      value: (
        <span className="text-xl font-semibold">
          <FormattedNumber
            value={validator.amountStaked ?? "0"}
            showIsSmallerThanMin
            symbol="BGT"
          />
          <span className="ml-1 text-sm text-muted-foreground">{"("}</span>

          <FormattedNumber
            className="text-sm text-muted-foreground"
            value={validator ? validator.votingPower / 100 : 0}
            showIsSmallerThanMin
            percent
          />
          <span className="text-sm text-muted-foreground">{")"}</span>
        </span>
      ),
      tooltipText:
        "Represents the influence in network governance based on the amount delegated to this validator",
    },
    {
      title: "Commission",
      value: (
        <FormattedNumber
          className="text-xl font-semibold"
          value={validator.commission ?? 0}
          showIsSmallerThanMin
          percent
        />
      ),
      tooltipText: "Amount of validator rewards retained by this validator",
    },
    {
      title: "Website",
      value: (
        <span className="text-ellipsis text-xl font-semibold hover:underline">
          <Link href={validator.metadata?.website ?? ""}>
            {validator.metadata?.website ?? ""}
          </Link>
        </span>
      ),
      tooltipText: undefined,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <Link
        className="flex items-center gap-1 text-sm font-medium leading-[14px] text-muted-foreground hover:cursor-pointer"
        href="/validators"
      >
        <Icons.arrowLeft className="relative h-4 w-4" />
        Validators
      </Link>
      <div className="mt-2 flex w-full flex-col justify-between gap-6 border-b  border-border pb-6 lg:flex-row ">
        <div className="items-left w-full flex-col justify-evenly gap-4">
          <div className="flex w-full items-center justify-start gap-2 text-xl font-bold leading-[48px]">
            <ValidatorIcon
              address={validator.id}
              className="h-12 w-12"
              imgOverride={validator.metadata?.logoURI}
            />
            {validator.metadata?.name ?? truncateHash(validator.id ?? "")}
          </div>
          <div className="my-4 flex w-full flex-row gap-1 text-muted-foreground">
            Hex Address:
            <span className="flex flex-row gap-1 text-foreground hover:underline">
              <Link href={`${blockExplorerUrl}/address/${validator.id}`}>
                {truncateHash(validator.id ?? "")}
              </Link>
              <Icons.externalLink className="h-4 w-4 self-center" />
            </span>
          </div>

          <div className="w-full overflow-hidden text-ellipsis text-foreground">
            {validator.metadata?.Description ?? ""}
          </div>
        </div>
        <div className="items-left w-full flex-col justify-between gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {validatorDataItems.map((item, index) => (
              <div
                className="relative flex flex-col items-start justify-start"
                key={index}
              >
                <div className="flex flex-row items-center gap-1 text-muted-foreground">
                  {item.title}{" "}
                  {item.tooltipText && <Tooltip text={item.tooltipText} />}
                </div>
                <div className="mt-1 w-full overflow-hidden text-ellipsis text-foreground">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
