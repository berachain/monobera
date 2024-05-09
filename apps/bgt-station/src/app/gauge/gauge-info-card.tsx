import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cloudinaryUrl } from "@bera/config";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";


const fakeValidators = [
  {
    icon: <Icons.bgt className="h-4 w-4" />,
    name: "Validator 1",
    bgtAmount: 100,
  },
  {
    icon: <Icons.bgt className="h-4 w-4" />,
    name: "Validator 1",
    bgtAmount: 100,
  },
  {
    icon: <Icons.bgt className="h-4 w-4" />,
    name: "Validator 1",
    bgtAmount: 100,
  },
];

export default function GaugeInfoCard() {
  return (
    <Card className="flex w-full flex-col overflow-hidden rounded-lg">
      <div className="relative flex flex-col border-b border-border bg-muted sm:flex-row">
        <div className="w-full border-b sm:border-none">
          <div className="border-b border-border px-4 py-5 sm:border-r">
            <div className="text-xs leading-5 text-muted-foreground">
              Active Gauges Vaults
            </div>
            <div className="inline-flex h-7 items-end gap-1">
              <span className="text-2xl font-semibold leading-6">142</span>
              <span className="font-medium leading-5 text-muted-foreground">
                (690.42M)
              </span>
            </div>
            <div className="mt-1 flex w-fit items-center gap-1 rounded-sm border border-border bg-background p-1 pr-2">
              <Icons.bexFav className="h-4 w-4" />
              <Icons.bendFav className="h-4 w-4" />
              <Icons.berpsFav className="h-4 w-4" />
              <span className="text-sm leading-5 text-muted-foreground">
                {" "}
                +69
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1 border-border px-4 py-3 sm:border-r">
            <div className="text-xs leading-5 text-muted-foreground">
              Top 3 Validators
            </div>
            {fakeValidators.map((validator, index) => (
              <div
                className="flex h-7 w-fit items-center gap-2 rounded-full border border-border bg-background px-2"
                key={index}
              >
                {validator.icon}
                <span className="text-xs font-medium">{validator.name}</span>
                <span className="text-[10px] text-muted-foreground">
                  BGT/Year: {validator.bgtAmount}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-100 flex w-full flex-col justify-between gap-4 px-4 py-5">
          <div>
            <div className="text-xs leading-5 text-muted-foreground">
              Est. Yearly BGT Distribution
            </div>
            <div className="mt-2 flex h-8 w-fit items-center gap-2 rounded-full bg-success-foreground bg-opacity-10 px-2 text-success-foreground">
              <Icons.bgt className="h-6 w-6" />
              <b>69.42K Yearly</b>
            </div>
          </div>
          <div>
            <div className="text-xs leading-5 text-muted-foreground">
              My Claimable BGT
            </div>
            <Link
              className="cursor-pointer text-warning-foreground underline"
              href="/rewards"
            >
              420.69 BGT
            </Link>
          </div>
        </div>
        <Image //please make this the right bear, ty mista coin :3
          src={`${cloudinaryUrl}/bears/m7abj0nxzpkh5mcuz5g2`}
          className="absolute bottom-0 right-0 hidden scale-x-[-1] md:block"
          alt="proposal-bear"
          width={200}
          height={300}
        />
      </div>

      <div className="flex md:flex-row flex-col border-b border-border bg-muted">
        <div className="flex-1 px-5 py-3">
          <div className="text-xs leading-5 text-muted-foreground">
            Active Bribes
          </div>
          <div className="flex items-center gap-2 text-sm font-bold leading-5">
            690.42K
            <span className="whitespace-nowrap font-medium text-muted-foreground">
              (420 Active Gauges)
            </span>
          </div>
          <div className="mt-2 flex w-fit items-center gap-1 rounded-full border border-border bg-background px-2 py-1">
            <Icons.bgt className="h-4 w-4" />
            <Icons.honey className="h-4 w-4" />
            <Icons.bera className="h-4 w-4" />
            <span className="text-xs leading-5 text-muted-foreground">
              {" "}
              +420,69
            </span>
          </div>
        </div>
        <div className="flex-1 border-y md:border-x border-border px-5 py-3 flex justify-center flex-col gap-2">
          <div className="text-xs leading-5 text-muted-foreground">
            Total Circulating BGT
          </div>
          <div className="flex items-center gap-1 text-sm font-bold leading-5">
            150.69 Million
            <Icons.bgt className="h-4 w-4" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 px-5 py-3 justify-center ">
          <div className="text-xs leading-5 text-muted-foreground">
            Total No. of Validators
          </div>
          <div className="w-fit rounded-full bg-success-foreground bg-opacity-10 px-2 py-1 text-sm font-medium leading-[18px] text-success-foreground">
            69 Active
          </div>
        </div>
      </div>

      <div className="item-start flex w-full flex-col justify-between gap-4 p-4 md:flex-row md:items-center">
        <div className="text-sm leading-5 text-muted-foreground">
          Estimates are updated weekly.
          <br />
          Checkout each validator for <br />
          their bribes distribution breakdown
        </div>
        <div className="flex w-full flex-col items-start gap-2 rounded-sm border border-warning-foreground bg-warning px-3 py-2 md:w-[200px] md:items-end">
          <div className="w-fit text-[10px] text-warning-foreground">
            Est. Avg. Return per Proposed block
          </div>
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <Icons.honey className="h-6 w-6" />
            <span>69,420.98</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
