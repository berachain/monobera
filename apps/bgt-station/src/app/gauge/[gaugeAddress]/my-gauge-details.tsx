import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { GaugueLPChange } from "./gauge-lp-change";

export const MyGaugeDetails = ({ gaugeAddress }: { gaugeAddress: string }) => {
  return (
    <div className="flex gap-4">
      <GaugueLPChange />

      <div className="flex w-full max-w-[440px] flex-col gap-4">
        <div className="flex flex-col gap-8 rounded-md border border-border p-4">
          <div className="text-lg font-semibold leading-7">
            My Vault Deposits
          </div>
          <div className="flex justify-between font-medium leading-6">
            <div>BERA-HONEY-50-50</div>
            <div className="flex items-center gap-1">
              2.694206
              <div className="text-sm text-muted-foreground">(0.01%)</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 rounded-md border border-border p-4">
          <div className="text-lg font-semibold leading-7">
            Unclaimed Rewards
          </div>
          <div className="flex justify-between font-medium leading-6">
            <div className="flex items-center gap-2">
              <Icons.bgt className="h-6 w-6" />
              BGT
            </div>
            <div className="flex items-center gap-1">
              469.69
              <div className="text-sm text-muted-foreground">$2096.69</div>
            </div>
          </div>
          <Button> Claim Rewards</Button>
        </div>
      </div>
    </div>
  );
};
