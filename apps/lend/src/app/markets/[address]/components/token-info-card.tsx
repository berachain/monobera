import { Tooltip } from "@bera/shared-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Icons } from "@bera/ui/icons";

import Card from "~/components/card";

export default function TokenInfoCard() {
  const info = [
    {
      title: "Reserve Size",
      amount: "$2.5K",
    },
    {
      title: "Available Liquidity",
      amount: "$300.64M",
    },
    {
      title: "Utilization Ratio",
      amount: "42.69%",
      tooltip: "Utilization Ratio",
    },
    {
      title: "Oracle Price",
      amount: "$1880.69",
    },
  ];
  return (
    <Card className="flex flex-col gap-6 lg:flex-row lg:justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>ticker</AvatarFallback>
        </Avatar>
        <div className="text-center text-3xl font-semibold leading-9">
          Ethereum
        </div>
        <div className="flex gap-2">
          <div className="h-fit w-fit rounded-full border border-border bg-muted p-2 hover:cursor-pointer md:rounded-xl">
            <Icons.external className="relative h-4 w-4 text-muted-foreground" />
          </div>
          <div className="h-fit w-fit rounded-full border border-border bg-muted p-2 hover:cursor-pointer md:rounded-xl">
            <Icons.wallet className="relative h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="grid w-full max-w-[608.5px] grid-cols-2 justify-between gap-4 md:flex">
        {info.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex items-center gap-1 text-xs font-normal leading-normal text-muted-foreground md:text-sm">
              {item.title}
              {item.tooltip && <Tooltip text={item.tooltip} />}
            </div>
            <div className="flex h-8 items-center gap-2 text-xl font-semibold leading-loose md:text-2xl">
              {item.amount}
              {index === 3 && (
                <div className="h-fit w-fit rounded-full border border-border bg-muted p-1 hover:cursor-pointer md:rounded-xl">
                  <Icons.external className="relative h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
