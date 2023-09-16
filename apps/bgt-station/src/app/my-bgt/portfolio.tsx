import React, { useRef } from "react";
import {
  BRIBE_PRECOMPILE_ABI,
  truncateHash,
  useBeraJs,
  usePollBribes,
  usePollDelegatorUnbonding,
  usePollDelegatorValidators,
  usePollTotalDelegated,
} from "@bera/berajs";
import { formatUsd } from "@bera/berajs/src/utils";
import { TokenIconList, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { type Address } from "viem";

import YellowCard from "~/components/yellow-card";
import { usePollPrices } from "~/hooks/usePollPrices";
import AverageGaugeWeight from "./components/average-gauge-weight";
import { ClaimBribesDialog } from "./components/claim-bribes-dialog";
import UnbondingQueue from "./components/unbonding-queue";
import YourDelegations from "./components/your-delegations";
import { BGTSelectionEnum, type BGTselection } from "./types";

export default function Portfolio() {
  const tabRef = useRef(null);
  const { account } = useBeraJs();
  const [tab, setTab] = React.useState<BGTselection>(
    BGTSelectionEnum.YOUR_DELEGATIONS,
  );
  const [open, setOpen] = React.useState(false);
  const { useTotalValidatorsDelegated } = usePollDelegatorValidators();

  const { useTotalDelegatorDelegated } = usePollTotalDelegated();
  const total = useTotalDelegatorDelegated();

  const totalValidators = useTotalValidatorsDelegated();
  const {
    useDelegatorUnbondingQueue,
    useDelegatorTotalUnbonding,
    useDelegatorTotalUnbondingValidators,
  } = usePollDelegatorUnbonding();

  const totalUnbonding = useDelegatorTotalUnbonding();
  const unbondingQueue = useDelegatorUnbondingQueue();
  const unbondingValidatorCount = useDelegatorTotalUnbondingValidators();
  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const { useTotalBribes, useBribeTokens, useBribes } = usePollBribes();
  const totalBribes = useTotalBribes(prices);
  const bribeTokenList = useBribeTokens();
  const bribes = useBribes();
  const { write, isLoading, ModalPortal } = useTxn({
    message: `Claiming all bribes`,
    disableToast: true,
    onSuccess: () => {
      setOpen(false);
    },
  });

  return (
    <div className="container mb-[80px] max-w-[1078px]">
      {ModalPortal}
      <div className="mb-8 flex h-[100px] items-center justify-center text-3xl font-bold leading-[48px] text-foreground md:text-5xl">
        👋 Hey {truncateHash(account ?? "0x", 6)} you have...
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <YellowCard
          tooltip="Total amount of BGT delegated across all validators"
          className="justify-betwee flex flex-1 flex-col"
        >
          <div className="text-5xl font-bold leading-[48px] text-foreground">
            {total?.toFixed(2) ?? 0}
          </div>
          <div className="py-[14px] text-center text-sm font-semibold leading-tight text-muted-foreground">
            BGT delegated
            <br />
            across {Number.isNaN(totalValidators) ? 0 : totalValidators}{" "}
            validators
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setTab(BGTSelectionEnum.YOUR_DELEGATIONS);
              tabRef.current && //@ts-ignore
                tabRef.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Manage delegations
          </Button>
        </YellowCard>
        <YellowCard className="flex flex-1 flex-col justify-between">
          <div className="text-5xl font-bold leading-[48px] text-foreground">
            {formatUsd(totalBribes ?? 0)}
          </div>
          <div className="flex flex-col items-center py-[8px] text-center text-sm font-semibold leading-tight text-muted-foreground">
            <TokenIconList size="xl" tokenList={bribeTokenList} />
            <p className="mt-1">
              {bribeTokenList.length > 0
                ? "in claimable rewards"
                : "you have no rewards"}
            </p>
          </div>
          <ClaimBribesDialog
            open={open}
            setOpen={setOpen}
            disabled={bribeTokenList.length === 0}
            totalValue={totalBribes}
            bribes={bribes}
            write={() => {
              write({
                address: process.env
                  .NEXT_PUBLIC_ERC20BRIBEMODULE_ADDRESS as Address,
                abi: BRIBE_PRECOMPILE_ABI,
                functionName: "claimAllBribes",
                params: [account],
              });
            }}
            isLoading={isLoading}
          />
        </YellowCard>
        <YellowCard
          tooltip="Total amount of BGT unbonding across all validators"
          className="flex flex-1 flex-col justify-between"
        >
          <div className="text-5xl font-bold leading-[48px] text-foreground">
            {totalUnbonding?.toFixed(2) ?? 0}
          </div>
          <div className="py-[14px] text-center text-sm font-semibold leading-tight text-muted-foreground">
            BGT unbonding across {unbondingValidatorCount} validators
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setTab(BGTSelectionEnum.UNBONDING_QUEUE);
              tabRef.current && //@ts-ignore
                tabRef.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            See my queue
          </Button>
        </YellowCard>
      </div>
      <div className="mt-16 flex flex-col gap-4">
        <div className="mx-auto">
          <Tabs value={tab} ref={tabRef}>
            <TabsList className="w-full">
              <TabsTrigger
                value={BGTSelectionEnum.YOUR_DELEGATIONS}
                className="capitalize"
                onClick={() => setTab(BGTSelectionEnum.YOUR_DELEGATIONS)}
              >
                <p className="hidden text-ellipsis sm:block">
                  {" "}
                  {BGTSelectionEnum.YOUR_DELEGATIONS.replaceAll("-", " ")}
                </p>
                <p className="w-22 block overflow-hidden text-ellipsis sm:hidden">
                  {" "}
                  {BGTSelectionEnum.YOUR_DELEGATIONS.split("-")[1]}
                </p>
              </TabsTrigger>
              <TabsTrigger
                value={BGTSelectionEnum.AVERAGE_GAUGE_WEIGHT}
                className="capitalize"
                onClick={() => setTab(BGTSelectionEnum.AVERAGE_GAUGE_WEIGHT)}
              >
                <p className="hidden text-ellipsis sm:block">
                  {" "}
                  {BGTSelectionEnum.AVERAGE_GAUGE_WEIGHT.replaceAll("-", " ")}
                </p>
                <p className="w-22 block overflow-hidden text-ellipsis sm:hidden">
                  {" "}
                  {BGTSelectionEnum.AVERAGE_GAUGE_WEIGHT.split("-")[1]}
                </p>
              </TabsTrigger>
              <TabsTrigger
                value={BGTSelectionEnum.UNBONDING_QUEUE}
                className="capitalize"
                onClick={() => setTab(BGTSelectionEnum.UNBONDING_QUEUE)}
              >
                <p className="hidden text-ellipsis sm:block">
                  {" "}
                  {BGTSelectionEnum.UNBONDING_QUEUE.replaceAll("-", " ")}
                </p>
                <p className="w-22 block overflow-hidden text-ellipsis sm:hidden">
                  {" "}
                  {BGTSelectionEnum.UNBONDING_QUEUE.split("-")[0]}
                </p>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="mt-8">
          {tab === BGTSelectionEnum.YOUR_DELEGATIONS && <YourDelegations />}
          {tab === BGTSelectionEnum.AVERAGE_GAUGE_WEIGHT && (
            <AverageGaugeWeight />
          )}
          {tab === BGTSelectionEnum.UNBONDING_QUEUE && (
            <UnbondingQueue unbondingQueue={unbondingQueue} />
          )}
        </div>
      </div>
    </div>
  );
}
