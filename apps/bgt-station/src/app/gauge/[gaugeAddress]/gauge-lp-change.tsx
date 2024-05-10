import { title } from "process";
import { useState } from "react";
import { TokenInput } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

export const GaugueLPChange = () => {
  const [depositAmount, setDepositAmount] = useState<`${number}`>("0");
  const [withdrawAmount, setWithdrawAmount] = useState<`${number}`>("0");
  return (
    <div className="w-full">
      <Tabs defaultValue="deposit" className="flex w-full flex-col gap-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>
        <TabsContent value="deposit">
          <div className="flex flex-col gap-4 rounded-md border border-border p-4">
            <div>
              <div className="text-lg font-semibold leading-7">
                Deposit Receipt Tokens
              </div>
              <div className="mt-1 text-sm leading-5">
                Deposit you receipt token to earn BGT rewards
              </div>
              <div className="mt-4 rounded-md border border-border bg-muted">
                <TokenInput
                  selected={undefined}
                  amount={depositAmount}
                  balance={"420.69"}
                  hidePrice
                  showExceeding={true}
                  selectable={false}
                  setAmount={(amount) =>
                    setDepositAmount(amount as `${number}`)
                  }
                />
              </div>
            </div>
            <Info />
            <Button>Deposit</Button>
          </div>
        </TabsContent>
        <TabsContent value="withdraw">
          <div className="flex flex-col gap-4 rounded-md border border-border p-4">
            <div>
              <div className="text-lg font-semibold leading-7">
                Withdraw Receipt Tokens
              </div>
              <div className="mt-1 text-sm leading-5">
                Withdrawing your receipt tokens will also claim your outstanding
                BGT rewards
              </div>
              <div className="mt-4 rounded-md border border-border bg-muted">
                <TokenInput
                  selected={undefined}
                  amount={withdrawAmount}
                  balance={"420.69"}
                  hidePrice
                  showExceeding={true}
                  selectable={false}
                  setAmount={(amount) =>
                    setWithdrawAmount(amount as `${number}`)
                  }
                />
              </div>
            </div>
            <div>
                need slider
              </div>
            <Info />
            <Button>Withdraw</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Info = () => {
  const data = [
    { title: "Expected BGT Rewards", value: "0.00 BGT" },
    { title: "Expected BGT Rewards", value: "0.00 BGT" },
    { title: "Expected BGT Rewards", value: "0.00 BGT" },
  ];
  return (
    <div className="border-boder flex flex-col gap-2 rounded-md border bg-muted px-4 py-3">
      {data.map((d, index) => (
        <div className="flex items-center justify-between" key={index}>
          <div className="text-xs leading-5 text-muted-foreground">
            {d.title}
          </div>
          <div className="front-medium text-xs leading-5">{d.value}</div>
        </div>
      ))}
    </div>
  );
};
