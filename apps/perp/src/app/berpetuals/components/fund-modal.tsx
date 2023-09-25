import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

const EndAdornment = (
  <div className="flex items-center gap-1">
    <Avatar className="h-5 w-5">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback className="font-bold">Bera Icon</AvatarFallback>
    </Avatar>
    <div className="font-medium text-muted-foreground">BERA</div>
  </div>
);
export function FundModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex w-full flex-col gap-4 p-4 md:w-[382px]">
        <div className="text-xl font-semibold leading-7">
          ⚡ One-Click Trading{" "}
        </div>
        <div className="text-sm font-normal leading-5 text-muted-foreground">
          Fund your 1-click trading account with at least 1.0 BERA token to
          provide reserves for gas fees.
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium leading-tight text-muted-foreground">
            Fund Your One-Click Account
          </div>
          <Input
            placeholder="0.00"
            type="number"
            endAdornment={EndAdornment}
            value={amount}
            onChange={(e) =>
              setAmount(
                Number(e.target.value) === 0
                  ? undefined
                  : Number(e.target.value),
              )
            }
          />
          <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            <Icons.wallet className="h-3 w-3 " /> 69,9442.09
            <span className="cursor-pointer underline">MAX</span>
          </div>
        </div>

        <Button className="w-full" onClick={() => onOpenChange(false)}>
          Enter Amount
        </Button>
      </DialogContent>
    </Dialog>
  );
}
