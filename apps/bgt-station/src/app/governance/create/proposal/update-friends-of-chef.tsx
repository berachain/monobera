import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { truncateHash } from "@bera/berajs";
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
import { Address, encodeAbiParameters, parseAbiParameters } from "viem";

import { useCreateProposal } from "../useCreateProposal";

export const UpdateFriendsOfChef = ({
  description,
}: {
  description: string;
}) => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const [gauge, setGauge] = useState<
    { id: Address; isFriend: boolean } | undefined
  >(undefined);

  const { data, loading } = useQuery(GetFriendsOfTheChef);
  const friendsOfChef = useMemo(() => {
    return (data?.friendsOfTheChefs ?? []).filter((gauge: any) =>
      gauge.id.toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [keyword, data?.friendsOfTheChefs]);

  const encodedData = gauge
    ? encodeAbiParameters(
        parseAbiParameters("address receiver, bool isFriend"),
        [gauge.id, !gauge.isFriend],
      )
    : "0x";

  const { ModalPortal, submitProposal } = useCreateProposal([
    [beraChefAddress],
    [0],
    [encodedData],
    description,
  ]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold leading-tight">Gauge Address</div>
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
                {gauge ? truncateHash(gauge.id) : "Select a Gauge"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="max-h- w-[514px] p-4"
              onMouseLeave={() => setOpen(false)}
            >
              <SearchInput
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <DropdownMenuSeparator />
              {friendsOfChef.map((gauge: any) => (
                <Button
                  variant="ghost"
                  className="w-full font-medium"
                  onClick={() => {
                    setGauge(gauge);
                    setOpen(false);
                  }}
                >
                  {gauge.id}
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
        <Button type="submit" className="w-full" onClick={submitProposal}>
          Submit
        </Button>
      </ActionButton>
      {ModalPortal}
    </>
  );
};
