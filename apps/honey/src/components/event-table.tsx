"use client";

import { defaultBeraConfig, truncateHash, useTokens } from "@bera/berajs";
import { blockExplorerUrl, honeyTokenAddress } from "@bera/config";
import { type HoneyTxn } from "@bera/graphql";
import { FormattedNumber, TokenIcon } from "@bera/shared-ui";
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

const getTokenDisplay = (event: any, tokenDictionary: any) => {
  const honey = tokenDictionary?.[getAddress(honeyTokenAddress)];
  const collateral = tokenDictionary?.[getAddress(event.collateral)];

  if (event.txnType === "Mint") {
    return (
      <div className="space-evenly flex flex-row items-center">
        <div className="flex items-center gap-2">
          <TokenIcon address={collateral?.address} />
          <FormattedNumber
            value={formatUnits(
              BigInt(event.collateralAmount),
              collateral?.decimals ?? 18,
            )}
            compact={false}
            compactThreshold={999_999}
          />
        </div>
        <Icons.chevronRight className="mx-2" />
        <div className="flex items-center gap-2">
          <TokenIcon address={honeyTokenAddress} />
          <FormattedNumber
            value={formatUnits(
              BigInt(event.honeyAmount),
              honey?.decimals ?? 18,
            )}
            compact={false}
            compactThreshold={999_999}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="space-evenly flex flex-row items-center">
      <div className="flex items-center gap-2">
        <TokenIcon address={honeyTokenAddress} />
        <FormattedNumber
          value={formatUnits(BigInt(event.honeyAmount), honey?.decimals ?? 18)}
          compact={false}
          compactThreshold={999_999}
        />
      </div>
      <Icons.chevronRight className="mx-2" />
      <div className="flex items-center gap-2">
        <TokenIcon address={collateral?.address} />
        <FormattedNumber
          value={formatUnits(
            BigInt(event.collateralAmount),
            collateral?.decimals ?? 18,
          )}
          compact={false}
          compactThreshold={999_999}
        />
      </div>
    </div>
  );
};

export const EventTable = ({
  events,
  isLoading,
  arcade,
}: {
  // events: HoneyMint[] | HoneyRedemption[] ;
  events: HoneyTxn[];
  isLoading: boolean | undefined;
  arcade: boolean;
}) => {
  const { data: tokenData } = useTokens({
    config: beraJsConfig,
  });
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
          events.map((event: HoneyTxn) => {
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
                <TableCell
                  className={cn(
                    event.txnType === "Mint"
                      ? "text-success-foreground"
                      : " text-destructive-foreground",
                  )}
                >
                  {event.txnType}
                </TableCell>
                <TableCell>
                  <FormattedNumber
                    value={formatUnits(
                      BigInt(
                        event.txnType === "Mint"
                          ? event.honeyAmount
                          : event.collateralAmount,
                      ),
                      18,
                    )}
                    symbol="USD"
                    compact={false}
                    compactThreshold={999_999}
                  />
                </TableCell>
                <TableCell className="hidden font-medium sm:table-cell">
                  {getTokenDisplay(event, tokenData?.tokenDictionary)}
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
