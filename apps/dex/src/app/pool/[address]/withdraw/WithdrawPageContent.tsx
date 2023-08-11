"use client";

import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { DEX_PRECOMPILE_ABI, formatUsd, useBeraConfig } from "@bera/berajs";
import {
  InfoBoxList,
  InfoBoxListItem,
  PreviewToken,
  TokenIcon,
  TokenInput,
  TokenList,
  TxnPreview,
  useTxn,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import { type MappedTokens } from "../types";
import { useWithdrawLiquidity } from "./useWithdrawLiquidity";

interface IWithdrawLiquidityContent {
  pool: Pool | undefined;
  prices: MappedTokens;
}

enum Selection {
  MULTI_TOKEN = "multi-token",
  SINGLE_TOKEN = "single-token",
}
export default function WithdrawLiquidityContent({
  pool,
  prices,
}: IWithdrawLiquidityContent) {
  const reset = () => {
    setPreviewOpen(false);

    setAmount(0);
    setExactOutAmount(0);
    setExactOutToken(undefined);
    setWithdrawType(0);
  };
  const { write, ModalPortal } = useTxn({
    message: `withdraw liquidity from ${pool?.poolName}`,
    onSuccess: () => {
      reset();
    },
  });
  const { networkConfig } = useBeraConfig();

  const {
    tokenDictionary,
    lpBalance,
    burnShares,
    withdrawValue,
    formattedLpBalance,
    singlePayload,
    setWithdrawType,
    amount,
    setAmount,
    previewOpen,
    setPreviewOpen,
    payload,
    exactOutToken,
    setExactOutToken,
    exactOutAmount,
    setExactOutAmount,
  } = useWithdrawLiquidity(pool, prices);

  const handleSingleTokenWithdrawSharesIn = (amount: number): void => {
    setAmount(amount);
    setWithdrawType(0);
  };

  const handleSingleTokenWithdrawAssetOut = (amount: number) => {
    setExactOutAmount(amount);
    setWithdrawType(1);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {ModalPortal}
      <Card className="mx-6 w-full items-center bg-muted p-4 sm:mx-0 sm:w-[480px]">
        <p className="mb-4 text-center text-2xl font-semibold">
          {pool?.poolName}
        </p>
        <div className="flex w-full flex-row items-center justify-center rounded-lg bg-card p-2 shadow-md">
          {pool?.tokens?.map((token, i) => {
            return (
              <TokenIcon
                token={
                  tokenDictionary && tokenDictionary[token.address]
                    ? tokenDictionary[token.address]
                    : token
                }
                className={cn("h-12 w-12", i !== 0 && "ml-[-16px]")}
                key={token.address}
              />
            );
          })}
        </div>
      </Card>
      <Card className="mx-6 w-full sm:w-[480px] md:mx-0 ">
        <CardHeader>
          <CardTitle className="center flex justify-between font-bold">
            Withdraw Liquidity
          </CardTitle>
        </CardHeader>

        <Tabs defaultValue={Selection.MULTI_TOKEN} className="w-full">
          <CardContent className="flex flex-col">
            <TabsList className="mb-3 grid w-full grid-cols-2">
              <TabsTrigger value={Selection.MULTI_TOKEN}>
                Multi-token
              </TabsTrigger>
              <TabsTrigger value={Selection.SINGLE_TOKEN}>
                Single token
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value={Selection.MULTI_TOKEN}
              className="mt-0 flex w-full flex-col gap-3"
            >
              <TokenList className="bg-muted">
                <p className="text-md w-full py-2 text-center font-medium">
                  Your Pool Tokens
                </p>
                <TokenInput
                  selected={{
                    address: "0x599D8d33253361f1dc654e6f9C2813Bd392eC0d5",
                    symbol: pool?.poolName ?? "",
                    name: pool?.poolName ?? "",
                    decimals: 18,
                    logoURI: "",
                  }}
                  hidePrice={true}
                  balance={Number(formattedLpBalance)}
                  selectable={false}
                  amount={amount}
                  setAmount={setAmount}
                />
              </TokenList>

              <div className="flex flex-row gap-2">
                {[25, 50, 75, 100].map((percent) => {
                  return (
                    <Button
                      key={percent}
                      variant={"outline"}
                      className="w-full"
                      onClick={() =>
                        setAmount(Number(formattedLpBalance) * (percent / 100))
                      }
                      disabled={lpBalance === 0n}
                    >
                      {percent}%
                    </Button>
                  );
                })}
              </div>
              <TxnPreview
                open={previewOpen}
                disabled={false}
                title={"Confirm LP Withdrawal Details"}
                imgURI={"/graphics/preview-swap-img.png"}
                triggerText={"Preview"}
                setOpen={setPreviewOpen}
              >
                <TokenList className="divide-muted bg-muted">
                  {pool?.tokens.map((token) => {
                    const formattedAmount = burnShares
                      ? Number(
                          formatUnits(
                            burnShares[token.address] ?? 0n,
                            token.decimals,
                          ),
                        )
                      : 0;
                    return (
                      <PreviewToken
                        key={token.address}
                        token={token}
                        value={formattedAmount}
                        weight={token.normalizedWeight}
                        price={prices[token.address]}
                      />
                    );
                  })}
                </TokenList>
                <InfoBoxList>
                  <InfoBoxListItem title={"Total Shares"} value={amount} />
                  <InfoBoxListItem
                    title={"Approximate Total Value"}
                    value={formatUsd(withdrawValue)}
                  />
                </InfoBoxList>

                <Button
                  onClick={() => {
                    write({
                      address: networkConfig.precompileAddresses
                        .erc20DexAddress as Address,
                      abi: DEX_PRECOMPILE_ABI,
                      functionName: "removeLiquidityBurningShares",
                      params: payload,
                    });
                  }}
                >
                  Withdraw Liquidity
                </Button>
              </TxnPreview>
            </TabsContent>
            <TabsContent
              value={Selection.SINGLE_TOKEN}
              className="mt-0 flex w-full flex-col gap-3"
            >
              <TokenList>
                <p className="text-md w-full py-2 text-center font-medium">
                  Your Pool Tokens
                </p>
                <TokenInput
                  selected={{
                    address: pool?.poolShareDenomHex ?? "",
                    symbol: pool?.poolName ?? "",
                    name: pool?.poolName ?? "",
                    decimals: 18,
                    logoURI: "",
                  }}
                  balance={Number(formattedLpBalance)}
                  selectable={false}
                  amount={amount}
                  setAmount={handleSingleTokenWithdrawSharesIn}
                />
              </TokenList>
              <div className="flex flex-row gap-2">
                {[25, 50, 75, 100].map((percent) => {
                  return (
                    <Button
                      key={percent}
                      variant={"outline"}
                      className="w-full"
                      onClick={() =>
                        setAmount(Number(formattedLpBalance) * (percent / 100))
                      }
                      disabled={lpBalance === 0n}
                    >
                      {percent}%
                    </Button>
                  );
                })}
              </div>
              <Icons.chevronsDown className="self-center text-secondary-foreground" />
              <TokenList>
                <TokenInput
                  selected={exactOutToken}
                  onTokenSelection={setExactOutToken}
                  selectable={true}
                  amount={exactOutAmount}
                  setAmount={handleSingleTokenWithdrawAssetOut}
                  customTokenList={pool?.tokens}
                />
              </TokenList>
              <TxnPreview
                open={previewOpen}
                disabled={false}
                title={"Confirm LP Withdrawal Details"}
                imgURI={"/graphics/preview-swap-img.png"}
                triggerText={"Preview"}
                setOpen={setPreviewOpen}
              >
                <TokenList className="divide-muted bg-muted">
                  {pool?.tokens.map((token) => {
                    const formattedAmount = burnShares
                      ? Number(
                          formatUnits(
                            burnShares[token.address] ?? 0n,
                            token.decimals,
                          ),
                        )
                      : 0;
                    return (
                      <PreviewToken
                        key={token.address}
                        token={token}
                        value={formattedAmount}
                        weight={token.normalizedWeight}
                        price={prices[token.address]}
                      />
                    );
                  })}
                </TokenList>
                <p className="text-center text-xs font-medium text-muted-foreground">
                  Your Stake of{" "}
                  <span className="font-bold">
                    {amount.toFixed(2)} Pool Tokens{" "}
                  </span>
                  will be converted and withdrawn from the pool, with the
                  following breakdown.
                </p>
                <div className="flex w-full items-center justify-center">
                  <Icons.chevronsDown className="self-center text-secondary-foreground" />
                </div>
                <TokenList className="bg-muted">
                  <PreviewToken
                    token={exactOutToken}
                    value={exactOutAmount}
                    price={prices[exactOutToken?.address ?? ""]}
                  />
                </TokenList>
                <InfoBoxList>
                  <InfoBoxListItem title={"Total Shares"} value={amount} />
                  <InfoBoxListItem
                    title={"Approximate Total Value"}
                    value={formatUsd(
                      (prices[exactOutToken?.address ?? ""] ?? 0) *
                        exactOutAmount,
                    )}
                  />
                </InfoBoxList>
                <Button
                  onClick={() => {
                    write({
                      address: networkConfig.precompileAddresses
                        .erc20DexAddress as Address,
                      abi: DEX_PRECOMPILE_ABI,
                      functionName: "removeLiquidityExactAmount",
                      params: singlePayload,
                    });
                  }}
                >
                  Withdraw Liquidity
                </Button>
              </TxnPreview>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
