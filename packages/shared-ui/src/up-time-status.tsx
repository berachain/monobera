"use client";

import React from "react";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";

// enum ServerStatusEnuem {
//   OPERATIONAL = "Operational",
//   HALTED = "Service Halted",
//   INTERRUPTION = "Service Interruption",
// }

enum GasSpeedEnum {
  LOW = "🐢-Low",
  MARKET = "🦊-Market",
  FAST = "🏎️-Fast",
  APE = "🦧-Ape",
}

// const getStatusColor = (status: ServerStatusEnuem) => {
//   switch (status) {
//     case ServerStatusEnuem.OPERATIONAL:
//       return "bg-success-foreground";
//     case ServerStatusEnuem.HALTED:
//       return "bg-destructive-foreground";
//     case ServerStatusEnuem.INTERRUPTION:
//       return "bg-warning-foreground";
//     default:
//       return "bg-success-foreground";
//   }
// };

export function UpTimeStatus() {
  // const status = ServerStatusEnuem.INTERRUPTION;
  const gasAmount = 178;
  const [gasSpeed, setGasSpeed] = React.useState<GasSpeedEnum>(
    GasSpeedEnum.FAST,
  );
  const [open, setOpen] = React.useState(false);
  return (
    <div className="fixed bottom-0 flex w-full justify-between border-y border-border bg-background px-4 py-2">
      <div className="flex items-center gap-2">
        {/* <div className={cn("h-3 w-3 rounded-full", getStatusColor(status))} />
        <div className="text-xs font-medium leading-3 text-muted-foreground">
          {status}
        </div> */}
      </div>
      <Popover open={open}>
        <PopoverTrigger onClick={() => setOpen(true)}>
          <div className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-3 text-muted-foreground">
            <div className=" text-success-foreground">{gasAmount}</div>
            <Icons.fuel className="h-4 w-4" />
            {gasSpeed.split("-")[1]}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[134px] p-0" forceMount>
          {Array.from(Object.values(GasSpeedEnum)).map((item) => (
            <div
              key={item}
              className="flex h-8 cursor-pointer items-center justify-center text-center text-sm font-medium leading-tight hover:bg-muted "
              onClick={() => {
                setGasSpeed(item as GasSpeedEnum);
                setOpen(false);
              }}
            >
              {item.replace("-", "   ")}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
