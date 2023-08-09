"use client";

import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import {
  DEX_PRECOMPILE_ABI,
  useBeraConfig,
} from "@bera/berajs";
import {
  InfoBoxList,
  InfoBoxListItem,
  TokenIcon,
  TokenInput,
  TokenList,
  TxnPreview,
  useTxn,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
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
  const { write, ModalPortal } = useTxn({
    message: `Add liquidity to ${pool?.poolName}`,
    onSuccess: () => {
      // reset();
    },
  });
  const { networkConfig } = useBeraConfig();

  const {
    tokenDictionary,
    lpBalance,
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

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {ModalPortal}
      <Card className="mx-6 w-full items-center bg-muted p-4 sm:mx-0 sm:w-[480px]">
        <p className="mb-4 text-center text-2xl font-semibold">
          {pool?.poolName}
        </p>
        <div className="flex w-full flex-row items-center justify-center rounded-lg bg-card p-2 shadow-md">
          {pool?.tokens?.map((token, i) => {
            // console.log(tokenDictionary[token.address])
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
              <TokenList>
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
                  balance={Number(lpBalance)}
                  selectable={false}
                  amount={amount}
                  setAmount={setAmount}
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
                <InfoBoxList>
                  <InfoBoxListItem title={"Expected Shares"} value={"-"} />
                  <InfoBoxListItem
                    title={"Approximate Total Value"}
                    value={"-"}
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
                    address: "0x599D8d33253361f1dc654e6f9C2813Bd392eC0d5",
                    symbol: pool?.poolName ?? "",
                    name: pool?.poolName ?? "",
                    decimals: 18,
                    logoURI: "",
                  }}
                  balance={Number(lpBalance)}
                  selectable={false}
                  amount={amount}
                  setAmount={setAmount}
                />
                <TokenInput
                  selected={exactOutToken}
                  onTokenSelection={setExactOutToken}
                  selectable={true}
                  amount={exactOutAmount}
                  setAmount={setExactOutAmount}
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
                <InfoBoxList>
                  <InfoBoxListItem title={"Expected Shares"} value={"-"} />
                  <InfoBoxListItem
                    title={"Approximate Total Value"}
                    value={"-"}
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
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
