import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { DepositLP } from "./deposit-lp";
import { WithdrawLP } from "./withdraw-lp";

export const GaugueLPChange = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="deposit" className="flex w-full flex-col gap-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>
        <TabsContent value="deposit">
          <DepositLP />
        </TabsContent>
        <TabsContent value="withdraw">
          <WithdrawLP />
        </TabsContent>
      </Tabs>
    </div>
  );
};
