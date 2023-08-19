import { useState } from "react";
import Image from "next/image";
import { Tooltip } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

export default function BorrowModalContent() {
  const maxBorrowAmout = 10000;
  const apyOptions = { stable: "10.69", variable: "6.69" };

  const [apySelected, setApySelected] = useState(apyOptions.variable);
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg font-semibold leading-7">Borrow</div>

      <Image
        src={"/supply.png"}
        alt="supply-img"
        className="h-36 w-96"
        width={100}
        height={100}
      />
      <Tabs
        defaultValue={apyOptions.variable}
        onValueChange={(value: string) => setApySelected(value)}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value={apyOptions.stable}>
            Stable APY: {apyOptions.stable}%
          </TabsTrigger>
          <TabsTrigger value={apyOptions.variable}>
            Variable APY: {apyOptions.variable}%
          </TabsTrigger>
        </TabsList>
      </Tabs>

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
          {maxBorrowAmout}
          <span
            className="underline hover:cursor-pointer"
            onClick={() => setAmount(maxBorrowAmout)}
          >
            MAX
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground ">LTV Health Ratio</div>
          <div className="">0 {"<->"} 1.69</div>
          {/* i didnt make this cause design doesnt make sense 2 me */}
        </div>
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground ">Estimated Value</div>
          <div className="">$12,669.42</div>
        </div>
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground ">Variable Borrow APY</div>
          <div className="text-yellow-600">{apySelected}%</div>
        </div>
      </div>

      <Button disabled={amount === 0 || amount > maxBorrowAmout}>
        {amount === 0 ? "Enter Amount" : "Borrow"}
      </Button>
    </div>
  );
}
