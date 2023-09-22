"use client";

import { useMemo, useState } from "react";
import { formatUsd } from "@bera/berajs";
import { SearchInput } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";

import {
  DEFAULT_INSTRUMENT,
  generateRandomInstruments,
  type Instrument,
} from "./mock-data-generator";

export function InstrumentDropdown({
  selectedInstrument,
}: {
  selectedInstrument?: Instrument;
}) {
  const [instrument, setInstrument] = useState(
    selectedInstrument ?? DEFAULT_INSTRUMENT,
  );
  const instrumentsList = useMemo(() => generateRandomInstruments(), []);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={(open) => setDropdownOpen(open)}>
      <DropdownMenuTrigger className="flex h-[65px] w-full cursor-pointer items-center justify-between border-b border-border px-8 py-4 hover:bg-muted lg:border-r">
        <div className="flex items-center gap-2 font-semibold leading-7">
          {dropdownOpen ? (
            <>Choose Market</>
          ) : (
            <>
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={instrument.logoURI}
                  className="rounded-full"
                />
                <AvatarFallback>{instrument.name}</AvatarFallback>
              </Avatar>
              {instrument.name}
            </>
          )}
        </div>
        <div className="text-xs font-medium text-muted-foreground">
          {!dropdownOpen ? (
            <>
              All Markets <Icons.chevronDown className="inline-block h-3 w-3" />
            </>
          ) : (
            <>
              Close <Icons.chevronUp className="inline-block h-3 w-3" />
            </>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="-mt-1 w-screen rounded-none border-border bg-background p-0 lg:w-[400px] lg:border-r ">
        <SearchInput
          className="w-full rounded-none border-none"
          placeholder="Search for a market"
        />
        <div className="h-screen-250 flex flex-col gap-1 overflow-y-scroll border-t border-border">
          {instrumentsList.map((instrument, index) => (
            <DropdownMenuItem
              key={index}
              className=" flex h-[60px] items-center justify-between px-4 hover:bg-muted"
              onClick={() => setInstrument(instrument)}
            >
              <div className="flex items-center gap-2 font-medium">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={instrument.logoURI}
                    className="rounded-full"
                  />
                  <AvatarFallback>{instrument.name}</AvatarFallback>
                </Avatar>
                <div>{instrument.name}</div>
              </div>
              <div className="font-medium">
                {formatUsd(instrument.amount)}
                <div
                  className={cn(
                    "text-right text-xs",
                    instrument.change24H < 0
                      ? "text-destructive-foreground"
                      : "text-success-foreground",
                  )}
                >
                  {instrument.change24H > 0 && "+"} {instrument.change24H}%
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
