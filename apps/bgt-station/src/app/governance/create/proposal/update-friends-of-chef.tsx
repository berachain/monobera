import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { BERA_CHEF_ABI, truncateHash } from "@bera/berajs";
import { beraChefAddress } from "@bera/config";
import { GetFriendsOfTheChef } from "@bera/graphql";
import { ActionButton, SearchInput } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Skeleton } from "@bera/ui/skeleton";
import { Address, encodeFunctionData } from "viem";

import { ProposalTypeEnum } from "../../types";
import { useCreateProposal } from "../useCreateProposal";

export const UpdateFriendsOfChef = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const [gauge, setGauge] = useState<
    { id: Address; isFriend: boolean } | undefined
  >(undefined);

  const { data, loading } = useQuery(GetFriendsOfTheChef);

  const Vaults = useMemo(() => {
    return (data?.vaults ?? []).filter(
      (vault: any) =>
        vault.id.toLowerCase().includes(keyword.toLowerCase()) ||
        vault.stakingToken.id.toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [keyword, data]);

  const encodedData = gauge
    ? encodeFunctionData({
        abi: BERA_CHEF_ABI,
        functionName: "updateFriendsOfTheChef",
        args: [gauge.id, !gauge.isFriend],
      })
    : "0x";

  const { ModalPortal, submitProposal } = useCreateProposal([
    [beraChefAddress],
    [0],
    [encodedData],
    `#${ProposalTypeEnum.FRIENDS_OF_CHEF}# ${title}\n${description}`,
  ]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold leading-tight">Select Vault</div>
        {loading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <DropdownMenu open={open}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setOpen(true)}
              >
                {gauge
                  ? `Staking Token Address: ${truncateHash(gauge.id)}`
                  : "Select a Vault"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="max-h- w-[514px] p-4"
              onMouseLeave={() => setOpen(false)}
            >
              <SearchInput
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by staking token address or gauge address"
              />
              <DropdownMenuSeparator />
              {Vaults.map((vault: any) => (
                <Button
                  variant="ghost"
                  className="w-full font-medium"
                  onClick={() => {
                    const gauge = data.friendsOfTheChefs.find(
                      (friend: { id: Address; isFriend: boolean }) =>
                        friend.id === vault.id,
                    );
                    if (!gauge) {
                      setGauge({
                        id: vault.stakingToken.id,
                        isFriend: false,
                      });
                    } else {
                      setGauge(gauge);
                    }
                    setOpen(false);
                  }}
                >
                  {vault.id}
                </Button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {gauge && (
        <div className="flex flex-col justify-center gap-2">
          <div className="text-sm font-semibold leading-tight">
            Update To Friends of the Chef:{" "}
            <span
              className={cn(
                "text-lg font-semibold",
                gauge.isFriend
                  ? "text-destructive-foreground"
                  : "text-success-foreground",
              )}
            >
              {" "}
              {gauge.isFriend ? "Remove" : "Add"}
            </span>
          </div>
        </div>
      )}
      <ActionButton>
        <Button
          type="submit"
          className="w-full"
          onClick={submitProposal}
          disabled={title.length === 0 || !gauge}
        >
          Submit
        </Button>
      </ActionButton>
      {ModalPortal}
    </>
  );
};
