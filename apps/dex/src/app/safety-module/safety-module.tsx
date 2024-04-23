"use client";

import React, { useEffect, useState } from "react";
import {
  Token,
  useBeraJs,
  usePollWalletBalances,
  TransactionActionType,
  bexAbi,
} from "@bera/berajs";
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
import { beraTokenAddress } from "@bera/config";

interface SafetyModuleProps {
  rewards: number;
}

export const SafetyModule = ({ rewards }: SafetyModuleProps) => {
  const [claimAmount, setClaimAmount] = useState<number>(0);
  const [selectedToken, setSelectedToken] = useState<Token | undefined>(
    undefined,
  );
  const [amount, setAmount] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("deposit");

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
        params: [ethers.utils.parseUnits(amount, 18)],
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
        params: [ethers.utils.parseUnits(amount, 18)],
      });
    } catch (error) {
      console.error("Error withdrawing Bera:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 pb-4">
        <div className="flex items-start space-x-[-36px]">
          <TokenIcon address={beraTokenAddress} className="h-20 w-20" />
          <TokenIcon address={beraTokenAddress} className="h-20 w-20 -ml-24" />
          <TokenIcon address={beraTokenAddress} className="h-20 w-20 -ml-24" />
        </div>
        <div className="text-4xl font-semibold">Safety Module Staking</div>
      </div>
      <div className="pb-4">
        <p>
          BERA, WBERA, and stkBERA holders can stake their assets in the Safety
          Module to add more security to the protocol and earn Safety
          Incentives. In the case of a shortfall event, your stake can be
          slashed to cover the deficit, providing an additional layer of
          protection for the protocol. Learn more about risks involved.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <InfoBoxList background="bg-muted" rounded="rounded-md" border="border">
          <InfoBoxListItem
            title="Funds in Safety Module"
            color="text-success-foreground"
            value="6.69%"
          />
        </InfoBoxList>
        <InfoBoxList background="bg-muted" rounded="rounded-md" border="border">
          <InfoBoxListItem
            title="Total Emissions Per Day"
            color="text-success-foreground"
            value="690.69"
          />
        </InfoBoxList>
      </div>
      <Card>
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
                <div className="flex flex-col pt-2 gap-4">
                  <div className="border rounded-md p-1">
                    <TokenInput
                      selected={selectedToken}
                      onTokenSelection={setSelectedToken}
                      amount={amount}
                      setAmount={setAmount}
                    />
                  </div>
                  <Button
                    className="mt-2 w-full"
                    onClick={handleDeposit}
                    disabled={!amount}
                  >
                    Confirm Deposit
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
          <TabsContent value="withdraw">
            {activeTab === "withdraw" && (
              <>
                <div className="flex flex-col pt-2 gap-4">
                  <div className="border rounded-md p-1">
                    <TokenInput
                      selected={selectedToken}
                      onTokenSelection={setSelectedToken}
                      amount={amount}
                      setAmount={setAmount}
                    />
                  </div>
                  <Button
                    className="mt-2 w-full"
                    onClick={handleWithdraw}
                    disabled={!amount}
                  >
                    Confirm Withdraw
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
