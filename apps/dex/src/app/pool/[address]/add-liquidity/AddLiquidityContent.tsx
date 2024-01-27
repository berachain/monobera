"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import {
  DEX_PRECOMPILE_ABI,
  TransactionActionType,
  formatUsd,
  handleNativeBera,
  useBeraConfig,
  useTokenHoneyPrices,
  type Token,
} from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";
import {
  ActionButton,
  ApproveButton,
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
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { parseUnits } from "ethers";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import { getSafeNumber } from "~/utils/getSafeNumber";
import { isBera, isBeratoken } from "~/utils/isBeraToken";
import { useAddLiquidity } from "./useAddLiquidity";

interface IAddLiquidityContent {
  pool: Pool | undefined;
}

enum Selection {
  MULTI_TOKEN = "multi-token",
  SINGLE_TOKEN = "single-token",
}

export default function AddLiquidityContent({ pool }: IAddLiquidityContent) {
  const router = useRouter();

  const tokenAddresses = pool?.tokens.map((token: Token) => token.address);
  const { data: prices = {} } = useTokenHoneyPrices(tokenAddresses);

  const {
    error,
    singleSidedError,
    expectedShares,
    singleSidedExpectedShares,
    beraValue,
    isMultipleInputDisabled,
    isSingleInputDisabled,
    totalValue,
    singleSidedTotalValue,
    selectedSingleToken,
    selectedSingleTokenAmount,
    previewOpen,
    singleTokenPreviewOpen,
    singleSidedBeraValue,
    setSingleSharesExceeding,
    tokenInputs,
    needsApproval,
    allowance,
    reset,
    burnShares,
    payload,
    singleSidedPayload,
    updateTokenAmount,
    setSelectedSingleToken,
    updateTokenExceeding,
    setSelectedSingleTokenAmount,
    setPreviewOpen,
    setSingleTokenSetPreviewOpen,
    beraToken,
    wBeraToken,
    isNativeBera,
    setIsNativeBera,
    setActiveInput,
    setActiveAmount,
    poolTokens,
  } = useAddLiquidity(pool, prices);

  const { networkConfig } = useBeraConfig();

  const { write, ModalPortal } = useTxn({
    message: `Add liquidity to ${pool?.poolName}`,
    onSuccess: () => {
      reset();
      router.push(`/pool?pool=userPools`);
    },
    actionType: TransactionActionType.ADD_LIQUIDITY,
  });

  const parsedSelectedSingleTokenAmount = useMemo(() => {
    if (!selectedSingleTokenAmount || !selectedSingleToken)
      return parseUnits("0", 18);
    return parseUnits(
      selectedSingleTokenAmount ?? "0",
      selectedSingleToken?.decimals ?? 18,
    );
  }, [selectedSingleTokenAmount, selectedSingleToken]);

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
            Add Liquidity
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
                {pool?.tokens?.map((token, i) => {
                  return (
                    <TokenInput
                      key={token.address}
                      selected={
                        isBeratoken(token)
                          ? isNativeBera
                            ? beraToken
                            : wBeraToken
                          : (token as Token)
                      }
                      selectable={
                        isBeratoken(token) && beraToken && wBeraToken
                          ? true
                          : false
                      }
                      customTokenList={
                        isBeratoken(token)
                          ? [beraToken as Token, wBeraToken as Token]
                          : undefined
                      }
                      onTokenSelection={(token: Token | undefined) => {
                        if (isBera(token)) {
                          setIsNativeBera(true);
                        } else {
                          setIsNativeBera(false);
                        }
                      }}
                      amount={tokenInputs[i]?.amount ?? ""}
                      setAmount={(amount: string) => {
                        updateTokenAmount(i, amount);
                        setActiveInput(i);
                        setActiveAmount(amount);
                      }}
                      weight={token.normalizedWeight}
                      price={prices[handleNativeBera(tokenAddresses[i])] ?? 0}
                      onExceeding={(exceeding: boolean) =>
                        updateTokenExceeding(i, exceeding)
                      }
                      showExceeding={true}
                    />
                  );
                })}
              </TokenList>
              <InfoBoxList>
                <InfoBoxListItem
                  title={"Expected Shares"}
                  value={expectedShares ?? "-"}
                />
                <InfoBoxListItem
                  title={"Approximate Total Value"}
                  value={formatUsd(totalValue ?? 0) ?? "-"}
                />
              </InfoBoxList>
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription className="text-xs">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              <TxnPreview
                open={previewOpen}
                disabled={isMultipleInputDisabled}
                title={"Confirm LP Addition Details"}
                imgURI={`${cloudinaryUrl}/placeholder/preview-swap-img_ucrnla`}
                triggerText={"Preview"}
                setOpen={setPreviewOpen}
              >
                <TokenList className="bg-muted">
                  {tokenInputs
                    .filter(
                      (tokenInput: { amount: string }) =>
                        tokenInput.amount !== "",
                    )
                    .map((tokenInput: any) => {
                      return (
                        <PreviewToken
                          key={tokenInput.address}
                          token={
                            isBeratoken(tokenInput)
                              ? isNativeBera
                                ? beraToken
                                : wBeraToken
                              : tokenInput
                          }
                          weight={tokenInput?.normalizedWeight}
                          value={tokenInput?.amount}
                          price={
                            prices[handleNativeBera(tokenInput.address)] ?? 0
                          }
                        />
                      );
                    })}
                </TokenList>
                <InfoBoxList>
                  <InfoBoxListItem
                    title={"Expected Shares"}
                    value={expectedShares ?? "-"}
                  />
                  <InfoBoxListItem
                    title={"Approximate Total Value"}
                    value={formatUsd(totalValue ?? 0) ?? "-"}
                  />
                </InfoBoxList>
                {needsApproval.length > 0 ? (
                  <ApproveButton
                    amount={parseUnits(
                      tokenInputs.find(
                        (t) => t.address === needsApproval[0]?.address,
                      )?.amount || "0",
                      needsApproval[0]?.decimals ?? 18,
                    )}
                    token={needsApproval[0]}
                    spender={
                      networkConfig.precompileAddresses
                        .erc20ModuleAddress as Address
                    }
                  />
                ) : (
                  <ActionButton>
                    <Button
                      className="w-full"
                      onClick={() => {
                        write({
                          address: networkConfig.precompileAddresses
                            .erc20DexAddress as Address,
                          abi: DEX_PRECOMPILE_ABI,
                          functionName: "addLiquidity",
                          params: payload,
                          value: parseUnits(beraValue ?? "0", 18),
                        });
                      }}
                    >
                      Add Liquidity
                    </Button>
                  </ActionButton>
                )}
              </TxnPreview>
            </TabsContent>
            <TabsContent
              value={Selection.SINGLE_TOKEN}
              className="mt-0 flex w-full flex-col gap-3"
            >
              <TokenList>
                <TokenInput
                  selected={selectedSingleToken}
                  onTokenSelection={setSelectedSingleToken}
                  selectable={true}
                  amount={selectedSingleTokenAmount}
                  price={
                    prices[handleNativeBera(selectedSingleToken?.address)] ?? 0
                  }
                  setAmount={(amount: string) =>
                    setSelectedSingleTokenAmount(amount)
                  }
                  onExceeding={setSingleSharesExceeding}
                  customTokenList={poolTokens}
                />
              </TokenList>

              <InfoBoxList>
                <InfoBoxListItem
                  title={"Expected Shares"}
                  value={singleSidedExpectedShares ?? "-"}
                />
                <InfoBoxListItem
                  title={"Approximate Total Value"}
                  value={formatUsd(singleSidedTotalValue ?? 0) ?? "-"}
                />
              </InfoBoxList>
              {singleSidedError && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription className="text-xs">
                    {singleSidedError}
                  </AlertDescription>
                </Alert>
              )}
              <TxnPreview
                open={singleTokenPreviewOpen}
                setOpen={setSingleTokenSetPreviewOpen}
                disabled={isSingleInputDisabled}
                title={"Confirm LP Addition Details"}
                imgURI={`${cloudinaryUrl}/placeholder/preview-swap-img_ucrnla`}
                triggerText={"Preview"}
              >
                <TokenList className="bg-muted">
                  <PreviewToken
                    token={selectedSingleToken}
                    value={getSafeNumber(selectedSingleTokenAmount)}
                    price={
                      prices[handleNativeBera(selectedSingleToken?.address)] ??
                      0
                    }
                  />
                </TokenList>
                <p className="w-full max-w-full justify-center self-center text-center text-xs text-muted-foreground">
                  Your Stake of{" "}
                  <span className="font-bold">
                    {selectedSingleTokenAmount} {selectedSingleToken?.symbol}
                  </span>{" "}
                  will be converted and deposited with the following breakdown
                </p>
                <div className="flex w-full items-center justify-center">
                  <Icons.chevronsDown className="h-6 w-6 self-center text-muted-foreground" />
                </div>
                <TokenList className="bg-muted">
                  {pool?.tokens.map((token, i) => {
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
                        // weight={token.normalizedWeight}
                        price={prices[handleNativeBera(tokenAddresses[i])] ?? 0}
                      />
                    );
                  })}
                </TokenList>
                <InfoBoxList>
                  <InfoBoxListItem
                    title={"Expected Shares"}
                    value={singleSidedExpectedShares ?? "-"}
                  />
                  <InfoBoxListItem
                    title={"Approximate Total Value"}
                    value={formatUsd(singleSidedTotalValue ?? 0) ?? "-"}
                  />
                </InfoBoxList>
                {(allowance?.allowance ?? 0n) <
                  parsedSelectedSingleTokenAmount &&
                !isBera(selectedSingleToken) ? (
                  <ApproveButton
                    token={selectedSingleToken}
                    spender={
                      networkConfig.precompileAddresses
                        .erc20ModuleAddress as Address
                    }
                    amount={parseUnits(
                      selectedSingleTokenAmount,
                      selectedSingleToken?.decimals ?? 18,
                    )}
                  />
                ) : (
                  <ActionButton>
                    <Button
                      className="w-full"
                      onClick={() => {
                        write({
                          address: networkConfig.precompileAddresses
                            .erc20DexAddress as Address,
                          abi: DEX_PRECOMPILE_ABI,
                          functionName: "addLiquidity",
                          params: singleSidedPayload,
                          value: parseUnits(singleSidedBeraValue ?? "0", 18),
                        });
                      }}
                    >
                      Add Liquidity
                    </Button>
                  </ActionButton>
                )}
              </TxnPreview>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
