import Link from "next/link";
import { formatter, type Token } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { TokenIcon, Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import Card from "~/components/card";

export default function TokenInfoCard({
  token,
  reserve,
  liquidity,
  utilization,
  oraclePrice,
}: {
  token: Token | undefined;
  reserve: number;
  liquidity: number;
  utilization: number;
  oraclePrice: number;
}) {
  const info = [
    {
      title: "Reserve Size",
      amount: !isNaN(reserve) ? (
        `$${formatter.format(reserve)}`
      ) : (
        <Skeleton className="h-8 w-16 " />
      ),
    },
    {
      title: "Available Liquidity",
      amount: !isNaN(liquidity) ? (
        `$${formatter.format(liquidity)}`
      ) : (
        <Skeleton className="h-8 w-16 " />
      ),
    },
    {
      title: "Utilization Ratio",
      amount: !isNaN(utilization) ? (
        `${(utilization * 100).toFixed(2)}%`
      ) : (
        <Skeleton className="h-8 w-16 " />
      ),
      tooltip: "Utilization Ratio",
    },
    {
      title: "Oracle Price",
      amount: oraclePrice ? (
        `$${formatter.format(oraclePrice)}`
      ) : (
        <Skeleton className="h-8 w-16 " />
      ),
    },
  ];
  return (
    <Card className="flex flex-col gap-6 lg:flex-row lg:justify-between">
      <div className="flex items-center gap-4">
        {token ? (
          <TokenIcon token={token} size="2xl" />
        ) : (
          <Skeleton className="h-12 w-12 rounded-full" />
        )}
        <div className="text-center text-3xl font-semibold leading-9">
          {token ? token.name : <Skeleton className="h-9 w-[200px]" />}
        </div>
        <div className="flex gap-2">
          <Link
            className="h-fit w-fit rounded-full border border-border bg-muted p-2 hover:cursor-pointer md:rounded-xl"
            href={`${blockExplorerUrl}/address/${token?.address}`}
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
