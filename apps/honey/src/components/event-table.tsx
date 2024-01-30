"use client";

import { formatUsd, truncateHash, useTokens } from "@bera/berajs";
import { blockExplorerUrl, honeyTokenAddress } from "@bera/config";
import { type HoneyMint, type HoneyRedemption } from "@bera/graphql";
import { TokenIcon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@bera/ui/table";
import { formatDistance } from "date-fns";
import { formatUnits, getAddress } from "viem";

function isMintData(obj: any): obj is HoneyMint {
  return obj.__typename === "HoneyMint";
}

function isBurnData(obj: any): obj is HoneyRedemption {
  return obj.__typename === "HoneyRedemption";
}

const getAction = (event: any) => {
  if (isMintData(event)) {
    return <p className="text-success-foreground">Mint</p>;
  }
  if (isBurnData(event)) {
    return <p className="text-destructive-foreground">Redeem</p>;
  }
  return <p>IDK</p>;
};

const getTokenDisplay = (event: any, tokenDictionary: any) => {
  const honey = tokenDictionary?.[getAddress(honeyTokenAddress)];

  if (isMintData(event)) {
    // this should be fixed once backend updated
    const tokenIn =
      tokenDictionary?.["0x6581e59A1C8dA66eD0D313a0d4029DcE2F746Cc5"];
    return (
      <div className="space-evenly flex flex-row items-center">
        <div className="flex items-center">
          <TokenIcon token={tokenIn} />
          <p className="ml-2">
            {Number(
              formatUnits(
                BigInt(event.collateralAmount),
                tokenIn?.decimals ?? 18,
              ),
            ).toFixed(4)}
          </p>
        </div>
        <Icons.chevronRight className="mx-2" />
        <div className="flex items-center">
          <TokenIcon token={honey} />
          <p className="ml-2">
            {Number(
              formatUnits(BigInt(event.mintAmount), honey?.decimals ?? 18),
            ).toFixed(4)}
          </p>
        </div>
      </div>
    );
  }
  if (isBurnData(event)) {
    // this should be fixed once backend updated
    const tokenOut =
      tokenDictionary?.["0x6581e59A1C8dA66eD0D313a0d4029DcE2F746Cc5"];
    return (
      <div className="space-evenly flex flex-row items-center">
        <div className="flex items-center">
          <TokenIcon token={honey} />
          <p className="ml-2">
            {Number(
              formatUnits(
                BigInt(event.collateralAmount),
                honey?.decimals ?? 18,
              ),
            ).toFixed(4)}
          </p>
        </div>
        <Icons.chevronRight className="mx-2" />
        <div className="flex items-center">
          <TokenIcon token={tokenOut} />
          <p className="ml-2">
            {Number(
              formatUnits(
                BigInt(event.collateralAmount),
                tokenOut?.decimals ?? 18,
              ),
            ).toFixed(4)}
          </p>
        </div>
      </div>
    );
  }
};

const getValue = (event: HoneyMint | HoneyRedemption) => {
  if (isMintData(event)) {
    return formatUnits(BigInt(event.mintAmount), 18);
  }
  if (isBurnData(event)) {
    return formatUnits(BigInt(event.collateralAmount), 18);
  }
  return 0;
};

export const EventTable = ({
  events,
  isLoading,
  arcade,
}: {
  events: HoneyMint[] | HoneyRedemption[];
  isLoading: boolean | undefined;
  arcade: boolean;
}) => {
  const { tokenDictionary } = useTokens();
  return (
    <Table>
      <TableHeader>
        <TableRow
          className={cn(
            arcade &&
              "border-b border-blue-300 bg-blue-100 text-blue-600 hover:bg-blue-100",
          )}
        >
          <TableHead className={cn(arcade && "text-blue-600")}>
            Action
          </TableHead>
          <TableHead className={cn(arcade && "text-blue-600")}>Value</TableHead>
          <TableHead
            className={cn("hidden sm:table-cell", arcade && "text-blue-600")}
          >
            Tokens
          </TableHead>
          <TableHead
            className={cn("hidden sm:table-cell", arcade && "text-blue-600")}
          >
            TxnHash
          </TableHead>
          <TableHead className={cn("text-center", arcade && "text-blue-600")}>
            Time
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events?.length && events[0] ? (
          events.map((event: HoneyMint | HoneyRedemption) => {
            if (!event) return null;
            return (
              <TableRow
                className={cn(
                  "hover:cursor-pointer",
                  arcade ? "hover:bg-blue-200" : "hover:bg-muted",
                )}
                key={event.id}
                onClick={() =>
                  window.open(
                    `${blockExplorerUrl}/tx/${event.id.split(":")[2]}`,
                    "_blank",
                  )
                }
              >
                <TableCell>{getAction(event)}</TableCell>
                <TableCell>{formatUsd(getValue(event) ?? "")}</TableCell>
                <TableCell className="hidden font-medium sm:table-cell">
                  {getTokenDisplay(event, tokenDictionary)}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {truncateHash(event.id.split(":")[2] ?? "")}
                </TableCell>
                <TableCell
                  className="overflow-hidden truncate whitespace-nowrap text-right "
                  suppressHydrationWarning
                >
                  {formatDistance(
                    new Date(Number(event.timestamp) * 1000 ?? 0),
                    new Date(),
                  )}{" "}
                  ago
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              {isLoading && (events === undefined || events.length === 0) ? (
                <p>Loading...</p>
              ) : (
                <p>No transactions found</p>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
