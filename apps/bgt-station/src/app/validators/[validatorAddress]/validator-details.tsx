import React from "react";
import Link from "next/link";
import { Tooltip } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { type Address } from "viem";

import { useFetchValidatorUptime } from "~/hooks/useFetchValidatorUptime";

export default function ValidatorDetails({
  address,
  decription,
  commissions,
  votingPower,
  website,
  vApy,
}: {
  address: string;
  decription: React.ReactNode;
  commissions: string;
  votingPower: string;
  website: string;
  vApy: string;
}) {
  const { data } = useFetchValidatorUptime(address as Address);

  return (
    <div className="flex w-full flex-col gap-4 text-lg font-semibold leading-7">
      Details
      <Card className="flex flex-col p-8">
        <div className="text-sm font-normal leading-normal text-muted-foreground md:flex md:h-[60px] md:items-end md:overflow-y-auto">
          {decription ? decription : <Skeleton className=" h-[14px] w-full" />}
        </div>

        <div className="mt-4 flex justify-between text-sm font-medium leading-[14px]">
          <div>
            Commission{" "}
            <Tooltip text="Amount of validator rewards retained by this validator." />
          </div>
          <div className="text-muted-foreground">{commissions}</div>
        </div>

        <div className="mt-4 flex justify-between text-sm font-medium leading-[14px]">
          <div>
            Uptime <Tooltip text="Percentage uptime over the last 100 blocks" />
          </div>
          <div className="text-muted-foreground">
            {data?.uptime ? data?.uptime : 0}%
          </div>
        </div>

        <div className="mt-4 flex justify-between text-sm font-medium leading-[14px]">
          <div>
            Voting Power{" "}
            <Tooltip text="Represents a delegator's influence in validator decisions." />
          </div>
          <div className="text-muted-foreground">{votingPower}</div>
        </div>

        <div className="mt-4 flex justify-between text-sm font-medium leading-[14px]">
          <div>
            vApy{" "}
            <Tooltip text="Projected measure of potential yearly earnings" />
          </div>
          <div className="text-muted-foreground">{vApy}%</div>
        </div>

        <div className="mt-4 flex justify-between text-sm font-medium leading-[14px]">
          <div>Website</div>
          <a
            className="text-info-foreground hover:underline"
            href={website}
            target="_blank"
          >
            {website}
          </a>
        </div>
        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row">
          <Link
            href={`/delegate?action=delegate&validator=${address}`}
            className="flex-1"
          >
            <Button className="w-full">
              Delegate <Icons.add className="relative ml-1 h-4 w-4" />
            </Button>
          </Link>
          <Link
            href={`/delegate?action=redelegate&validator=${address}`}
            className="flex-1"
          >
            <Button className="w-full" variant="outline">
              {" "}
              Redelegate
              <Icons.redo className="relative ml-1 h-4 w-4" />
            </Button>
          </Link>
          <Link
            href={`/delegate?action=unbond&validator=${address}`}
            className="flex-1"
          >
            <Button className="w-full" variant="outline">
              {" "}
              Unbond
              <Icons.minus className="relative ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
