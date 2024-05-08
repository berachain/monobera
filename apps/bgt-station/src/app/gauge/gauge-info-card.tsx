import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import Link from "next/link";

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
      <div className="relative flex flex-col sm:flex-row border-b border-border bg-muted">
        <div className="border-b sm:border-none">
          <div className="border-b sm:border-r border-border px-4 py-5">
            <div className="text-xs leading-5 text-muted-foreground">
              Active Gauges Vaults
            </div>
            <div className="inline-flex h-7 items-end gap-1">
              <span className="text-2xl font-semibold leading-6">142</span>
              <span className="leading-5 text-muted-foreground">(690.42M)</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 sm:border-r border-border px-4 py-3">
            <div className="text-xs leading-5 text-muted-foreground">
              Top 3 Validators
            </div>
            {fakeValidators.map((validator, index) => (
              <div
                className="flex h-7 items-center gap-2 rounded-full border border-border bg-background px-2 w-fit"
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
        <div className="flex flex-col justify-between px-4 py-5 gap-4">
          <div>
            <div className="text-xs leading-5 text-muted-foreground">
              Est. Yearly BGT Distribution
            </div>
            <div className="mt-2 flex h-8 items-center gap-2 rounded-full bg-success-foreground bg-opacity-10 px-2 text-success-foreground w-fit">
              <Icons.bgt className="h-6 w-6" />
              <b>69.42K Yearly</b>
            </div>
          </div>
          <div>
            <div className="text-xs leading-5 text-muted-foreground">
              My Claimable BGT
            </div>
            <Link
              className="underline cursor-pointer text-warning-foreground"
              href="/rewards"
            >
              420.69 BGT
            </Link>
          </div>
        </div>
        <Image //please make this the right bear, ty mista coin :3
          src={`${cloudinaryUrl}/bears/m7abj0nxzpkh5mcuz5g2`}
          className="absolute bottom-0 right-0 scale-x-[-1] hidden lg:block"
          alt="proposal-bear"
          width={200}
          height={300}
        />
      </div>

      <div className="flex flex-col md:flex-row w-full item-start md:items-center justify-between p-4 gap-4">
        <div className="text-sm leading-5 text-muted-foreground">
          Estimates are updated weekly.
          <br />
          Checkout each validator for <br />
          their bribes distribution breakdown
        </div>
        <div className="flex w-full flex-col gap-2 rounded-sm border border-warning-foreground bg-warning px-3 py-2 md:w-[200px] items-start md:items-end">
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
