import { Dispatch, SetStateAction, useMemo, useState } from "react";
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
import { ProposalAction, ProposalTypeEnum } from "~/app/governance/types";

export const GaugeSelector = ({
  selectedGauge: gauge,
  setGauge,
}: {
  selectedGauge:
    | (ProposalAction & { type: ProposalTypeEnum.UPDATE_REWARDS_GAUGE })
    | undefined;
  setGauge: Dispatch<SetStateAction<ProposalAction>>;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const { data: friendsData, loading } = useQuery(GetFriendsOfTheChef);
  const { data: gaugesMetadata } = useGaugesMetadata();

  const Vaults = useMemo(() => {
    return (friendsData?.vaults ?? []).filter(
      (vault: any) =>
        vault.id.toLowerCase().includes(keyword.toLowerCase()) ||
        vault.stakingToken.id.toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [keyword, friendsData]);

  const selectedGaugeMetadata = gauge?.target
    ? gaugesMetadata?.[getAddress(gauge?.target.toLowerCase())]
    : undefined;

  const selectedGraphVault = Vaults.find(
    (vault: any) => vault.id === gauge?.target?.toLowerCase(),
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div>
        {loading ? (
          <Skeleton className="h-16 w-full" />
        ) : (
          <DialogTrigger asChild>
            <div className="rounded-md border border-border p-3 hover:bg-muted">
              {gauge?.target && gauge.receiptToken ? (
                <div>
                  <div className="flex gap-2 text-sm font-semibold">
                    <GaugeIcon
                      address={gauge.target}
                      overrideImage={selectedGaugeMetadata?.logoURI}
                    />
                    <Link
                      href={`${blockExplorerUrl}/address/${gauge.target}`}
                      className="underline"
                      target="_blank"
                    >
                      {selectedGaugeMetadata?.name ??
                        truncateHash(gauge?.target ?? "0x")}
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
                      href={`${blockExplorerUrl}/address/${selectedGraphVault.receiptToken}`}
                      className="text-foreground underline"
                      target="_blank"
                    >
                      {truncateHash(gauge.receiptToken)}
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
                  const queriedGauge = friendsData.friendsOfTheChefs.find(
                    (friend: { id: Address; isFriend: boolean }) =>
                      friend.id === vault.id,
                  );

                  if (!queriedGauge) {
                    setGauge((g) => ({
                      ...g,
                      target: vault.id,
                      receiptToken: vault.stakingToken.id,
                      isFriend: false,
                    }));
                  } else {
                    setGauge((g) => ({
                      ...g,
                      target: queriedGauge.id,
                      receiptToken: vault.stakingToken.id,
                      isFriend: queriedGauge.isFriend,
                    }));
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
                  Staking Token Address: {truncateHash(vault.stakingToken.id)}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
