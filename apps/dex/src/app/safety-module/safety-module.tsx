"use client";

import React, { useState } from "react";
import { TransactionActionType, bexAbi } from "@bera/berajs";
import { beraTokenAddress } from "@bera/config";
import {
  ActionButton,
  ApproveButton,
  FormattedNumber,
  InfoBoxList,
  InfoBoxListItem,
  PreviewToken,
  TokenIcon,
  TokenInput,
  TokenList,
  Tooltip,
  TxnPreview,
  useSlippage,
  useTxn,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Input } from "@bera/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { ethers } from "ethers";

interface SafetyModuleProps {
  rewards: number;
}

export const SafetyModule = ({ rewards }: SafetyModuleProps) => {
  const [claimAmount, setClaimAmount] = useState(0);
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState("deposit");
  const { write } = useTxn({
    message: "Deposit/Withdraw Bera",
    actionType: TransactionActionType.ADD_LIQUIDITY,
  });

  const handleMaxClick = () => {
    setClaimAmount(rewards);
  };

  const handleDeposit = async () => {
    try {
      write({
        address: beraTokenAddress,
        abi: bexAbi,
        functionName: "deposit",
        params: [amount],
      });
    } catch (error) {
      console.error("Error depositing Bera:", error);
    }
  };

  const handleWithdraw = async () => {
    try {
      write({
        address: beraTokenAddress,
        abi: bexAbi,
        functionName: "withdraw",
        params: [amount],
      });
    } catch (error) {
      console.error("Error withdrawing Bera:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 pb-4">
        <div className="flex items-start space-x-[-36px]">
          <div className="relative z-10">
            <TokenIcon address={beraTokenAddress} className="h-20 w-20" />
          </div>
          <div className="relative z-20 -ml-24">
            <TokenIcon address={beraTokenAddress} className="h-20 w-20" />
          </div>
          <div className="relative z-30 -ml-24">
            <TokenIcon address={beraTokenAddress} className="h-20 w-20" />
          </div>
        </div>
        <div className="text-4xl font-semibold">Safety Module Staking</div>
      </div>
      <div className="pb-4">
        <p>
          BERA, WBERA, and stkBERA holders can stake their assets in the Safety
          Module to add more security to the protocol and earn Safety
          Incentives. In the case of a shortfall event, your stake can be
          slashed to cover the deficit, providing an additional layer of
          protection for the protocol. Learn more about risks involved
        </p>
      </div>
      <div className="flex flex-row gap-4">
        <InfoBoxList background="bg-muted" rounded="rounded-md" border="border">
          <InfoBoxListItem title="Funds in Safety Module" value={undefined} />
          <InfoBoxListItem
            color="text-success-foreground"
            title="6.69%"
            value={undefined}
          >
            <FormattedNumber value={ethers.utils.formatUnits("1", 18)} />
          </InfoBoxListItem>
        </InfoBoxList>
        <InfoBoxList background="bg-muted" rounded="rounded-md" border="border">
          <InfoBoxListItem title="Total Emissions Per Day" value={undefined} />
          <InfoBoxListItem
            color="text-success-foreground"
            title="690.69"
            value={undefined}
          >
            <FormattedNumber value={ethers.utils.formatUnits("1", 18)} />
          </InfoBoxListItem>
        </InfoBoxList>
      </div>
      <div>
        <Card className="flex-grow gap-2">
          <Tabs
            className="flex-grow px-2 py-2"
            defaultValue="deposit"
            onValueChange={setActiveTab}
          >
            <TabsList className="flex">
              <TabsTrigger className="flex-grow" value="deposit">
                Deposit
              </TabsTrigger>
              <TabsTrigger className="flex-grow" value="withdraw">
                Withdraw
              </TabsTrigger>
            </TabsList>
            <TabsContent value="deposit">
              {activeTab === "deposit" && (
                <>
                  <h2>Select a token You would like to deposit</h2>
                  <TokenInput selected={undefined} amount={undefined} />
                  <Button
                    className="w-full px-2"
                    onClick={handleDeposit}
                    disabled={!amount}
                  >
                    Confirm Withdraw
                  </Button>
                </>
              )}
            </TabsContent>
            <TabsContent value="withdraw">
              {activeTab === "withdraw" && (
                <>
                  <h2>Enter the Amount of BERA you would like to withdraw</h2>
                  <TokenInput selected={undefined} amount={undefined} />
                  <Button
                    className="w-full px-2"
                    onClick={handleWithdraw}
                    disabled={!amount}
                  >
                    Confirm Withdraw
                  </Button>
                </>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};
