import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { truncateHash } from "@bera/berajs";
import { GetFriendsOfTheChef } from "@bera/graphql";
import { SearchInput } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Skeleton } from "@bera/ui/skeleton";

export const UpdateFriendsOfChef = () => {
  const [open, setOpen] = useState(false);
  const [gauge, setGauge] = useState<any | undefined>(undefined);
  const [keyword, setKeyword] = useState<string>("");
  const { data, loading } = useQuery(GetFriendsOfTheChef);
  const friendsOfChef = useMemo(() => {
    return (data?.friendsOfTheChefs ?? []).filter((gauge: any) =>
      gauge.id.toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [keyword, data?.friendsOfTheChefs]);

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
        <div className="flex flex-col gap-2 justify-center">
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
    </>
  );
};
