import React from "react";
import { beraTokenAddress, cloudinaryUrl, crocDexAddress } from "@bera/config";
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
import { cn } from "@bera/ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { formatUnits, parseUnits } from "viem";
import { ethers } from "ethers";
export function UserStats() {
  return (
    <div className="flex flex-col">
      <Card className="bg-muted">
        <CardHeader>
          <CardTitle>Personal Stats</CardTitle>
          <CardDescription>
            Check your staked balances here and details associated with your
            stake.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-2">
            <InfoBoxList
              background="bg-background"
              rounded="rounded-md"
              border="border"
            >
              <InfoBoxListItem title="Staking APR" value={undefined} />
              <InfoBoxListItem
                color="text-success-foreground"
                title="6.69%"
                value={undefined}
              >
                <FormattedNumber value={ethers.utils.formatUnits("1", 18)} />
              </InfoBoxListItem>
            </InfoBoxList>
            <InfoBoxList
              background="bg-background"
              rounded="rounded-md"
              border="border"
            >
              <InfoBoxListItem title="Max Slashing" value={undefined} />
              <InfoBoxListItem title="30.00%" value={undefined}>
                <FormattedNumber value={ethers.utils.formatUnits("1", 18)} />
              </InfoBoxListItem>
            </InfoBoxList>
            <InfoBoxList
              background="bg-background"
              rounded="rounded-md"
              border="border"
            >
              <InfoBoxListItem title="Wallet Balance" value={undefined} />
              <InfoBoxListItem title="100.00" value={undefined}>
                <FormattedNumber value={ethers.utils.formatUnits("1", 18)} />
              </InfoBoxListItem>
            </InfoBoxList>
          </div>
        </CardContent>
        <div className="flex flex-wrap flex-grow gap-4 px-4 py-4">
          <Card className="bg-background flex-grow">
            <CardHeader className="flex items-center">
              <div className="flex flex-row items-center gap-1">
                <TokenList>
                  <TokenIcon address={beraTokenAddress} className="w-8 h-8" />
                </TokenList>
                <CardTitle className="text-2xl">BERA</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
              <div className="flex flex-wrap flex-col items-center gap-1 justify-center align-middle w-full pb-8">
                <p>Staked</p>
                <h1 className="text-xl font-bold">699.42</h1>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <Button className="w-full"> Initiate Cooldown </Button>
                <div className="flex flex-row w-full justify-between px-2">
                  <p className="text-xs text-muted-foreground">
                    Cooldown Period
                  </p>
                  <p className="text-xs text-foreground">69d</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background flex-grow opacity-30">
            <CardHeader className="flex items-center">
              <div className="flex flex-row items-center gap-1">
                <TokenList>
                  <TokenIcon address={beraTokenAddress} className="w-8 h-8" />
                </TokenList>
                <CardTitle className="text-2xl">stkBERA</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
              <div className="flex flex-wrap flex-col items-center gap-1 justify-center align-middle w-full pb-8">
                <p>Staked</p>
                <h1 className="text-xl font-bold">0.00</h1>
              </div>
              <div className="flex flex-col flex-grow items-center gap-2 w-full">
                <Button className="w-full" disabled={true}>
                  {" "}
                  Initiate Cooldown{" "}
                </Button>
                <div className="flex flex-row w-full justify-between px-2">
                  <p className="text-xs text-muted-foreground">
                    Cooldown Period
                  </p>
                  <p className="text-xs text-foreground">69d</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Card>
    </div>
  );
}
