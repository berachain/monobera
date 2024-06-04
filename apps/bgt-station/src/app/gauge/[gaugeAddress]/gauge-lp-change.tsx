import { type Gauge, useTokenInformation } from "@bera/berajs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { DepositLP } from "./deposit-lp";
import { WithdrawLP } from "./withdraw-lp";

export const GaugueLPChange = ({ gauge }: { gauge: Gauge }) => {
  const { data: lpToken } = useTokenInformation({
    address: gauge.stakingTokenAddress,
  });
  const { data: lpReceiptToken } = useTokenInformation({
    address: gauge.vaultAddress,
  });

  return (
    <div className="w-full">
      <Tabs defaultValue="deposit" className="flex w-full flex-col gap-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>
        <TabsContent value="deposit">
          {lpToken && <DepositLP lpToken={lpToken} />}
        </TabsContent>
        <TabsContent value="withdraw">
          {lpReceiptToken && <WithdrawLP lpReceiptToken={lpReceiptToken} />}
        </TabsContent>
      </Tabs>
    </div>
  );
};
