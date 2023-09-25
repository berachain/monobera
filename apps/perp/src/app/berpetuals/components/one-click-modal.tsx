import { useState } from "react";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";

export function OneClickModal({
  open,
  onOpenChange,
  oneClick,
  modeSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  oneClick: boolean;
  modeSelect: (mode: boolean) => void;
}) {
  const [oneClickMode, setOneClickMode] = useState<boolean>(oneClick);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex w-full flex-col gap-4 p-4 md:w-[342px]">
        <div className="text-lg font-semibold leading-7">Trading Mode</div>
        <div
          className={cn(
            "relative cursor-pointer rounded-xl border border-border p-3 hover:bg-muted",
            oneClickMode && "border-amber-800",
          )}
          onClick={() => setOneClickMode(true)}
        >
          <div className="flex w-full items-center justify-between">
            <div className="font-medium">
              One-Click Trading{" "}
              <span className="ml-1 h-5 w-fit rounded-full border border-border px-2 py-1 text-xs">
                ⚡ Recommended
              </span>
            </div>
            <SelectBtn selected={oneClickMode} />
          </div>
          <div className="mt-2 pr-11 text-sm leading-5">
            Sign one approval txn and fund your wallet with at-least{" "}
            <b>1.0 BERA</b>.
          </div>
          <div className="mt-6 flex items-center gap-1 text-sm font-semibold leading-tight">
            <Icons.checkCircle className="h-4 w-4 text-success-foreground" />{" "}
            Instant Execution
          </div>
          <div className="mt-2 flex items-center gap-1 text-sm font-semibold leading-tight">
            <Icons.checkCircle className="h-4 w-4 text-success-foreground" />
            No Wallet Pop-ups
          </div>
        </div>
        <div
          className={cn(
            "relative cursor-pointer rounded-xl border border-border p-3 hover:bg-muted",
            !oneClickMode && "border-amber-800",
          )}
          onClick={() => setOneClickMode(false)}
        >
          <div className="flex w-full items-center justify-between">
            <div className="text-lg font-semibold leading-7">
              Sign Every Txn
            </div>
            <SelectBtn selected={!oneClickMode} />
          </div>
          <div className="mt-2 pr-11 text-sm leading-5">
            Every order will require a signature
          </div>
        </div>
        <Button
          variant={"secondary"}
          onClick={() => {
            modeSelect(oneClickMode);
            onOpenChange(false);
          }}
        >
          Select a mode
        </Button>
      </DialogContent>
    </Dialog>
  );
}

const SelectBtn = ({ selected }: { selected: boolean }) => {
  return selected ? (
    <div className=" h-4 w-4 rounded-full border-4 border-amber-500 bg-amber-800" />
  ) : (
    <div className=" h-4 w-4 rounded-full border border-border  bg-background" />
  );
};
