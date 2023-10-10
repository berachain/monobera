import Link from "next/link";
import { formatter, type Token } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { TokenIcon, Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

import Card from "~/components/card";

export default function TokenInfoCard({
  token,
  reserve,
  liquidity,
  utilization,
  oraclePrice,
}: {
  token: Token;
  reserve: number;
  liquidity: number;
  utilization: number;
  oraclePrice: number;
}) {
  const info = [
    {
      title: "Reserve Size",
      amount: `$${formatter.format(reserve)}`,
    },
    {
      title: "Available Liquidity",
      amount: `$${formatter.format(liquidity)}`,
    },
    {
      title: "Utilization Ratio",
      amount: `${(utilization * 100).toFixed(2)}%`,
      tooltip: "Utilization Ratio",
    },
    {
      title: "Oracle Price",
      amount: `$${formatter.format(oraclePrice)}`,
    },
  ];
  return (
    <Card className="flex flex-col gap-6 lg:flex-row lg:justify-between">
      <div className="flex items-center gap-4">
        <TokenIcon token={token} size="2xl" />
        <div className="text-center text-3xl font-semibold leading-9">
          {token.name}
        </div>
        <div className="flex gap-2">
          <Link
            className="h-fit w-fit rounded-full border border-border bg-muted p-2 hover:cursor-pointer md:rounded-xl"
            href={`${blockExplorerUrl}/address/${token.address}`}
            target="_blank"
          >
            <Icons.external className="relative h-4 w-4 text-muted-foreground" />
          </Link>
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
