import React from "react";
import { useRouter } from "next/navigation";
import { Tooltip } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

export default function ValidatorDetails({
  address,
  decription,
  commissions,
  uptime,
  votingPower,
  website,
}: {
  address: string;
  decription: React.ReactNode;
  commissions: string;
  uptime: string;
  votingPower: string;
  website: string;
}) {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-4 text-lg font-semibold leading-7">
      Details
      <Card className="flex flex-col p-8">
        <div className=" text-sm font-normal leading-normal text-muted-foreground">
          {decription}
        </div>

        <div className="mt-4 flex justify-between text-sm font-medium leading-[14px]">
          <div>
            Commission <Tooltip text="Commission" />
          </div>
          <div className="text-muted-foreground">{commissions}</div>
        </div>

        <div className="mt-4 flex justify-between text-sm font-medium leading-[14px]">
          <div>
            Uptime <Tooltip text="Uptime" />
          </div>
          <div className="text-muted-foreground">{uptime}</div>
        </div>

        <div className="mt-4 flex justify-between text-sm font-medium leading-[14px]">
          <div>
            Voting Power <Tooltip text="Voting Power" />
          </div>
          <div className="text-muted-foreground">{votingPower}</div>
        </div>

        <div className="mt-4 flex justify-between text-sm font-medium leading-[14px]">
          <div>
            Website <Tooltip text="Commission" />
          </div>
          <a
            className="text-info-foreground hover:underline"
            href={website}
            target="_blank"
          >
            {website}
          </a>
        </div>
        <div
          className="mt-4 flex flex-col justify-between gap-4 sm:flex-row"
          onClick={() =>
            router.push(`/delegate?action=delegate&validator=${address}`)
          }
        >
          <Button className="flex-1">
            Delegate <Icons.add className="relative ml-1 h-4 w-4" />
          </Button>
          <Button
            className="flex-1"
            variant="outline"
            onClick={() =>
              router.push(`/delegate?action=redelegate&validator=${address}`)
            }
          >
            {" "}
            Redelegate
            <Icons.redo className="relative ml-1 h-4 w-4" />
          </Button>
          <Button
            className="flex-1"
            variant="outline"
            onClick={() =>
              router.push(`/delegate?action=unbond&validator=${address}`)
            }
          >
            {" "}
            Unbond
            <Icons.minus className="relative ml-1 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
