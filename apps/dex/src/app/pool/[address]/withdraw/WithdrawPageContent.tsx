/* eslint no-use-before-define: 0 */ // --> OFF

"use client";

import { useRouter } from "next/navigation";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import {
  DEX_PRECOMPILE_ABI,
  TransactionActionType,
  formatUsd,
  useBeraConfig,
} from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";
import {
  ActionButton,
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
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsContent } from "@bera/ui/tabs";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import { getSafeNumber } from "~/utils/getSafeNumber";
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

    setAmount("");
    setExactOutAmount("");
    setExactOutToken(undefined);
    setWithdrawType(0);
  };
  const { write, ModalPortal } = useTxn({
    message: `Withdraw liquidity from ${pool?.poolName}`,
    onSuccess: () => {
      reset();
    },
    actionType: TransactionActionType.WITHDRAW_LIQUIDITY,
  });
  const { networkConfig } = useBeraConfig();
  const router = useRouter();

  const {
    lpBalance,
    burnShares,
    withdrawValue,
    isMultiTokenDisabled,
    isSingleTokenDisabled,
    formattedLpBalance,
    singlePayload,
    setWithdrawType,
    amount,
    setIsPoolTokenExceeding,
    setAmount,
    previewOpen,
    setPreviewOpen,
    payload,
    exactOutToken,
    setExactOutToken,
    exactOutAmount,
    setExactOutAmount,
  } = useWithdrawLiquidity(pool, prices);

  const handleSingleTokenWithdrawSharesIn = (amount: string): void => {
    setAmount(amount);
    setWithdrawType(0);
  };

  const handleSingleTokenWithdrawAssetOut = (amount: string) => {
    setExactOutAmount(amount);
    setWithdrawType(1);
  };

  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-4">
      {ModalPortal}
      <Card className="mx-6 w-full items-center bg-background p-4 sm:mx-0 sm:w-[480px]">
        <p className="text-center text-2xl font-semibold">{pool?.poolName}</p>
        <div className="flex w-full flex-row items-center justify-center rounded-lg p-4">
          {pool?.tokens?.map((token, i) => {
            return (
              <TokenIcon
                token={token}
                className={cn("h-12 w-12", i !== 0 && "ml-[-16px]")}
                key={token.address}
              />
            );
          })}
        </div>
        <div
          onClick={() => router.push(`/pool/${pool?.pool}`)}
          className="flex items-center justify-center text-sm font-normal leading-tight text-muted-foreground hover:cursor-pointer hover:underline"
        >
          View Pool Details
          <Icons.arrowRight className="W-4 h-4" />
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
            {/* <TabsList className="mb-3 grid w-full grid-cols-2">
              <TabsTrigger value={Selection.MULTI_TOKEN}>
                Multi-token
              </TabsTrigger>
              <TabsTrigger value={Selection.SINGLE_TOKEN}>
                Single token
              </TabsTrigger>
            </TabsList> */}

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
                    address: "",
                    symbol: pool?.poolName ?? "",
                    name: pool?.poolName ?? "",
                    decimals: 18,
                    logoURI: "",
                  }}
                  hidePrice={true}
                  balance={formattedLpBalance}
                  selectable={false}
                  amount={amount}
                  setAmount={setAmount}
                  showExceeding={true}
                  onExceeding={setIsPoolTokenExceeding}
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
                        setAmount(
                          (percent === 100
                            ? formattedLpBalance
                            : Number(formattedLpBalance) * (percent / 100)
                          ).toString(),
                        )
                      }
                      disabled={lpBalance === 0n}
                    >
                      {percent}%
                    </Button>
                  );
                })}
              </div>
              <Alert variant="warning">
                All outstanding BGT Rewards will be claimed upon withdrawing all
                liquidity.
              </Alert>
              <TxnPreview
                open={previewOpen}
                disabled={isMultiTokenDisabled}
                title={"Confirm LP Withdrawal Details"}
                imgURI={`${cloudinaryUrl}/placeholder/preview-swap-img_ucrnla`}
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
                <ActionButton>
                  <Button
                    className="w-full"
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
                </ActionButton>
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
                  balance={formattedLpBalance}
                  hidePrice={true}
                  selectable={false}
                  amount={amount}
                  showExceeding={true}
                  setAmount={handleSingleTokenWithdrawSharesIn}
                  onExceeding={setIsPoolTokenExceeding}
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
                        setAmount(
                          (
                            Number(formattedLpBalance) *
                            (percent / 100)
                          ).toString(),
                        )
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
                  showExceeding={false}
                  price={prices[exactOutToken?.address ?? ""] ?? 0}
                />
              </TokenList>
              <Alert variant="warning">
                All outstanding BGT Rewards will be claimed upon withdrawing all
                liquidity.
              </Alert>
              <TxnPreview
                open={previewOpen}
                disabled={isSingleTokenDisabled}
                title={"Confirm LP Withdrawal Details"}
                imgURI={`${cloudinaryUrl}/placeholder/preview-swap-img_ucrnla`}
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
                  <span className="font-bold">{amount} Pool Tokens </span>
                  will be converted and withdrawn from the pool, with the
                  following breakdown.
                </p>
                <div className="flex w-full items-center justify-center">
                  <Icons.chevronsDown className="self-center text-secondary-foreground" />
                </div>
                <TokenList className="bg-muted">
                  <PreviewToken
                    token={exactOutToken}
                    value={getSafeNumber(exactOutAmount)}
                    price={prices[exactOutToken?.address ?? ""]}
                  />
                </TokenList>
                <InfoBoxList>
                  <InfoBoxListItem title={"Total Shares"} value={amount} />
                  <InfoBoxListItem
                    title={"Approximate Total Value"}
                    value={formatUsd(
                      (prices[exactOutToken?.address ?? ""] ?? 0) *
                        getSafeNumber(exactOutAmount),
                    )}
                  />
                </InfoBoxList>
                <ActionButton>
                  <Button
                    className="w-full"
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
                </ActionButton>
              </TxnPreview>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
