import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { truncateHash, useGaugesMetadata } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { GetFriendsOfTheChef } from "@bera/graphql";
import { GaugeIcon, SearchInput } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Skeleton } from "@bera/ui/skeleton";
import { Address, getAddress } from "viem";

export const GaugeSelector = ({
  gauge,
  setGauge,
}: {
  gauge:
    | { vault: Address; receiptToken: Address; isFriend: boolean }
    | undefined;
  setGauge: (gauge: {
    vault: Address;
    receiptToken: Address;
    isFriend: boolean;
  }) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const { data, loading } = useQuery(GetFriendsOfTheChef);
  const { data: gaugesMetadata } = useGaugesMetadata();

  const Vaults = useMemo(() => {
    return (data?.vaults ?? []).filter(
      (vault: any) =>
        vault.id.toLowerCase().includes(keyword.toLowerCase()) ||
        vault.stakingToken.id.toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [keyword, data]);

  const selectGaugeMetadata = gauge
    ? gaugesMetadata?.[getAddress(gauge.vault)]
    : undefined;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div>
        {loading ? (
          <Skeleton className="h-16 w-full" />
        ) : (
          <DialogTrigger asChild>
            <div className="rounded-md border border-border p-3 hover:bg-muted">
              {gauge ? (
                <div>
                  <div className="flex gap-2 text-sm font-semibold">
                    <GaugeIcon
                      address={gauge.vault}
                      overrideImage={selectGaugeMetadata?.logoURI}
                    />
                    <Link
                      href={`${blockExplorerUrl}/address/${gauge.vault}`}
                      className="underline"
                      target="_blank"
                    >
                      {selectGaugeMetadata?.name ?? truncateHash(gauge.vault)}
                    </Link>
                    <span
                      className={cn(
                        gauge.isFriend
                          ? "text-success-foreground"
                          : "text-destructive-foreground",
                      )}
                    >
                      {gauge.isFriend
                        ? "Reciving Emissions"
                        : "Not Reciving Emissions"}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Staking Token Address:{" "}
                    <Link
                      href={`${blockExplorerUrl}/address/${gauge.receiptToken}`}
                      className="text-foreground underline"
                      target="_blank"
                    >
                      {truncateHash(gauge.receiptToken)}{" "}
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="font-medium text-sm text-muted-foreground text-center cursor-pointer">
                  No gauge selected
                </div>
              )}
            </div>
          </DialogTrigger>
        )}
      </div>
      <DialogContent>
        <DialogTitle>Select a Gauge</DialogTitle>
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search by staking token address or gauge address"
        />
        <div className="h-[60vh] overflow-scroll">
          {Vaults.map((vault: any) => {
            const gaugeMetadata = gaugesMetadata?.[getAddress(vault.id)];
            return (
              <div
                key={vault.id}
                className="my-1 w-full cursor-pointer rounded-md px-3 py-1 font-medium hover:bg-muted"
                onClick={() => {
                  const gauge = data.friendsOfTheChefs.find(
                    (friend: { id: Address; isFriend: boolean }) =>
                      friend.id === vault.id,
                  );
                  if (!gauge) {
                    setGauge({
                      vault: vault.id,
                      receiptToken: vault.stakingToken.id,
                      isFriend: false,
                    });
                  } else {
                    setGauge({
                      vault: gauge.id,
                      receiptToken: vault.stakingToken.id,
                      isFriend: gauge.isFriend,
                    });
                  }
                  setOpen(false);
                }}
              >
                <div className="flex gap-2 text-sm font-semibold">
                  <GaugeIcon
                    address={vault.id}
                    overrideImage={gaugeMetadata?.logoURI}
                  />
                  <div>{gaugeMetadata?.name ?? truncateHash(vault.id)}</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground ">
                  Staking Token Address: {truncateHash(
                    vault.stakingToken.id,
                  )}{" "}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
