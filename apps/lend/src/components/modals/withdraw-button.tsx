import { useState } from "react";
import Image from "next/image";
import { Tooltip } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

export default function WithdrawBtn() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex-1 px-3 py-2">
        Withdraw
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-fit p-8">
          <WithdrawModalContent />
        </DialogContent>
      </Dialog>
    </>
  );
}

const WithdrawModalContent = () => {
  const userBalance = 420.69;
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg font-semibold leading-7">Withdraw</div>

      <Image
        src={"/supply.png"}
        alt="supply-img"
        className="h-36 w-96"
        width={100}
        height={100}
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-sm font-semibold leading-tight">
          Amount <Tooltip text="amount" />{" "}
        </div>
        <Input
          type="number"
          id="forum-discussion-link"
          placeholder="0.0"
          endAdornment={"ETH"}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <div className="flex h-3 w-full items-center justify-end gap-1 text-[10px] text-muted-foreground">
          <Icons.wallet className="relative inline-block h-3 w-3 " />
          {userBalance}
          <span
            className="underline hover:cursor-pointer"
            onClick={() => setAmount(userBalance)}
          >
            MAX
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground ">Estimated Value</div>
          <div className="">$12,669.42</div>
        </div>
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground ">Supply APY</div>
          <div className="text-success-foreground">6.69%</div>
        </div>
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground ">LTV Health Ratio</div>
          <div className="">0 {"<->"} infinite</div>
          {/* i didnt make this cause design doesnt make sense 2 me */}
        </div>
      </div>

      <Button disabled={amount === 0 || amount > userBalance}>
        {amount === 0 ? "Enter Amount" : "Withdraw"}
      </Button>
    </div>
  );
};
