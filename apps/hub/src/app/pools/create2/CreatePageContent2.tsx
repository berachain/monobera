"use client";

import {
  ADDRESS_ZERO,
  COMPOSABLE_STABLE_POOL_FACTORY,
  POOLID,
  Token,
  TransactionActionType,
  WEIGHTED_POOL_FACTORY,
  fp,
} from "@bera/berajs";
import { stablePoolFactory, weightedPoolFactory } from "@bera/config";
import { TokenInput, useAnalytics, useTxn } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import CreatePoolInput from "~/components/create-pool/create-pool-input";
import {
  ITokenWeight,
  SWAPFEE,
  useCreateBalancerPool,
  WeightedPoolType,
} from "~/hooks/useCreateBalancerPool";
import { toNormalizedWeights } from "@balancer-labs/balancer-js";
import { randomBytes } from "crypto";

export default function CreatePageContent2() {
  const {
    tokenWeights,
    selectionError,
    liquidityError,
    poolName,
    onTokenSelection,
    onAddToken,
    onRemove,
    onWeightedPoolTypeChange,
    isInitialLiquidityDisabled,
    isPoolNameDisabled,
    isPoolCreationDisabled,
    weightedPoolType,
    poolSymbol,
    setPoolSymbol,
    onTokenBalanceChange,
    setPoolName,
    poolId,
    setPoolId,
    onTokenRateProviderChange,
    onTokenCacheTimeChange,
  } = useCreateBalancerPool();

  const router = useRouter();

  const { captureException, track } = useAnalytics();

  const { write, ModalPortal } = useTxn({
    message: "Create new pool",
    onSuccess: () => {
      track("create_pool_success");
      router.push("/pools");
    },
    onError: (e: Error | undefined) => {
      track("create_pool_failed");
      captureException(new Error("create pool failed"), {
        data: { rawError: e },
      });
    },
    actionType: TransactionActionType.CREATE_POOL,
  });

  const handleCreatePool = useCallback(async () => {
    const sortedTokenWeights = tokenWeights?.sort((a, b) => {
      const addressA = a.token?.address || "";
      const addressB = b.token?.address || "";
      return addressA.toLowerCase().localeCompare(addressB.toLowerCase());
    });

    const ADDRESSES = sortedTokenWeights.map((tw) => tw.token?.address);
    const POOL_SWAP_FEE_PERCENTAGE = fp(0.01).toBigInt();

    if (poolId === POOLID.WEIGHTED) {
      const WEIGHTS = toNormalizedWeights(
        sortedTokenWeights.map((tw) => fp(tw.weight)),
      ).map((w) => w.toBigInt());
      const RATEPROVIDERS = sortedTokenWeights.map(() => ADDRESS_ZERO);

      write({
        address: weightedPoolFactory,
        abi: WEIGHTED_POOL_FACTORY,
        functionName: "create",
        gasLimit: 10000000n,
        params: [
          poolName,
          poolSymbol,
          ADDRESSES,
          WEIGHTS,
          RATEPROVIDERS,
          POOL_SWAP_FEE_PERCENTAGE,
          ADDRESS_ZERO,
          "0x".concat(randomBytes(32).toString("hex")) as `0x${string}`,
        ],
      });
    }

    if (poolId === POOLID.STABLE) {
      const RATEPROVIDERS = sortedTokenWeights.map(() => ADDRESS_ZERO);
      const CACHETIMES = sortedTokenWeights.map(() => 0); // 30 days in seconds
      const YIELD_FLAGS = false;
      write({
        address: stablePoolFactory,
        abi: COMPOSABLE_STABLE_POOL_FACTORY,
        functionName: "create",
        gasLimit: 10000000n,
        params: [
          poolName,
          poolSymbol,
          ADDRESSES,
          300n,
          RATEPROVIDERS,
          CACHETIMES,
          YIELD_FLAGS,
          POOL_SWAP_FEE_PERCENTAGE,
          ADDRESS_ZERO,
          "0x".concat(randomBytes(32).toString("hex")) as `0x${string}`,
        ],
      });
    }

    if (poolId === POOLID.METASTABLE) {
      const RATEPROVIDERS = sortedTokenWeights.map((tw) =>
        tw.rateProvider ? tw.rateProvider : ADDRESS_ZERO,
      );
      const CACHETIMES = sortedTokenWeights.map((tw) =>
        tw.cacheTime ? tw.cacheTime : 0,
      ); // 30 days in seconds
      const YIELD_FLAGS = false;
      write({
        address: stablePoolFactory,
        abi: COMPOSABLE_STABLE_POOL_FACTORY,
        functionName: "create",
        gasLimit: 10000000n,
        params: [
          poolName,
          poolSymbol,
          ADDRESSES,
          300n,
          RATEPROVIDERS,
          CACHETIMES,
          YIELD_FLAGS,
          POOL_SWAP_FEE_PERCENTAGE,
          ADDRESS_ZERO,
          "0x".concat(randomBytes(32).toString("hex")) as `0x${string}`,
        ],
      });
    }
  }, [write, poolId]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 max-w-[600px]">
      <Button
        variant={"ghost"}
        size="sm"
        className="flex items-center gap-1 self-start"
        onClick={() => router.push("/pools")}
      >
        <Icons.arrowLeft className="h-4 w-4" />
        <div className="text-sm font-medium">All Pools</div>
      </Button>
      <div className="flex w-full flex-col items-center justify-center gap-16">
        {ModalPortal}
        <section className="w-full flex flex-col gap-4">
          <h1 className="text-3xl font-semibold self-start">
            Select a pair type
          </h1>

          <div className="w-full flex flex-row gap-6">
            <Card
              onClick={() => setPoolId(POOLID.WEIGHTED)}
              className={cn(
                "p-4 flex flex-col gap-0 w-full border-2",
                poolId === POOLID.WEIGHTED && "border-sky-600",
              )}
            >
              <span className="text-lg font-semibold">Weighted</span>
              <span className="text-sm text-muted-foreground mt-[-4px]">
                Recommended for volatile pairs
              </span>
              <span className="text-sm text-muted-foreground mt-[24px]">
                Fee: <span className="text-foreground font-medium">0.3%</span>
              </span>
            </Card>
            <Card
              onClick={() => setPoolId(POOLID.STABLE)}
              className={cn(
                "p-4 flex flex-col gap-0 w-full border-2",
                poolId === POOLID.STABLE && "border-sky-600",
              )}
            >
              <span className="text-lg font-semibold">Stable</span>
              <span className="text-sm text-muted-foreground mt-[-4px]">
                Recommended for stable pairs
              </span>
              <span className="text-sm text-muted-foreground mt-[24px]">
                Fee: <span className="text-foreground font-medium">0.05%</span>
              </span>
            </Card>
            <Card
              onClick={() => setPoolId(POOLID.METASTABLE)}
              className={cn(
                "p-4 flex flex-col gap-0 w-full border-2",
                poolId === POOLID.METASTABLE && "border-sky-600",
              )}
            >
              <span className="text-lg font-semibold">Metastable</span>
              <span className="text-sm text-muted-foreground mt-[-4px]">
                Recommended for stable pairs
              </span>
              <span className="text-sm text-muted-foreground mt-[24px]">
                Fee: <span className="text-foreground font-medium">0.05%</span>
              </span>
            </Card>
          </div>
        </section>
        <section className={cn("w-full flex flex-col gap-4", "")}>
          <h1 className="text-3xl font-semibold self-start">Select Tokens</h1>
          {poolId === POOLID.WEIGHTED && (
            <Tabs
              defaultValue={WeightedPoolType.EQUAL}
              onValueChange={(v) => onWeightedPoolTypeChange(v)}
            >
              <TabsList>
                <TabsTrigger value={WeightedPoolType.EQUAL}>
                  Balanced
                </TabsTrigger>
                <TabsTrigger value={WeightedPoolType.EIGHTY_TWENTY}>
                  80/20
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
          {tokenWeights.map((tokenWeight: ITokenWeight, index: number) => {
            return (
              <CreatePoolInput
                key={index}
                tokenWeight={tokenWeight}
                selectedTokens={
                  tokenWeights
                    .filter((t) => t.token !== undefined)
                    .map((t) => t.token) as Token[]
                }
                onTokenSelection={(t) => onTokenSelection(t, index)}
                index={index}
                poolIdx={poolId}
                onRemove={onRemove}
                onTokenCacheTimeChange={onTokenCacheTimeChange}
                onTokenRateProviderChange={onTokenRateProviderChange}
              />
            );
          })}
          {weightedPoolType !== WeightedPoolType.EIGHTY_TWENTY && (
            <Button
              variant="ghost"
              className="w-fit gap-1 items-center"
              onClick={() => onAddToken()}
            >
              <Icons.plusCircle className="w-4 h-4" />
              Add Token
            </Button>
          )}

          {selectionError && (
            <Alert>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{selectionError?.message}</AlertDescription>
            </Alert>
          )}
        </section>

        <section
          className={cn(
            "w-full flex flex-col gap-4",
            isInitialLiquidityDisabled && "opacity-50 pointer-events-none	",
          )}
        >
          <h1 className="text-3xl font-semibold self-start">
            Initial Liquidity
          </h1>
          {tokenWeights.map((tokenWeight: ITokenWeight, index: number) => {
            return (
              <TokenInput
                className="border border-border p-2 rounded-lg"
                selectable={false}
                disabled={isInitialLiquidityDisabled}
                showExceeding
                selected={tokenWeight.token}
                amount={tokenWeight.initialLiquidity}
                setAmount={(amount) => onTokenBalanceChange(index, amount)}
              />
            );
          })}

          {liquidityError && !selectionError && (
            <Alert>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{liquidityError?.message}</AlertDescription>
            </Alert>
          )}
        </section>
        <section
          className={cn(
            "w-full flex flex-col gap-4",
            isPoolNameDisabled && "opacity-50 pointer-events-none	",
          )}
        >
          <h1 className="text-3xl font-semibold self-start">Pool Name</h1>
          <Input
            className="bg-transparent"
            value={isInitialLiquidityDisabled ? "" : poolName}
            onChange={(e: any) => setPoolName(e.target.value)}
          />
        </section>
        <section
          className={cn(
            "w-full flex flex-col gap-4",
            isPoolNameDisabled && "opacity-50 pointer-events-none	",
          )}
        >
          <h1 className="text-3xl font-semibold self-start">Pool Symbol</h1>
          <Input
            className="bg-transparent"
            value={isInitialLiquidityDisabled ? "" : poolSymbol}
            onChange={(e: any) => setPoolSymbol(e.target.value)}
          />
        </section>
        <section className={cn("w-full flex flex-col gap-4", "")}>
          <Button
            disabled={isPoolCreationDisabled}
            onClick={() => handleCreatePool()}
          >
            Create Pool
          </Button>
        </section>
      </div>
    </div>
  );
}
