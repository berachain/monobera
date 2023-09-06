import React from "react";
import { useRouter } from "next/navigation";
import {
  truncateHash,
  useBeraJs,
  usePollBribes,
  usePollDelegatorUnbonding,
  usePollDelegatorValidators,
} from "@bera/berajs";
import { formatUsd } from "@bera/berajs/src/utils";
import { TokenIconList } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import YellowCard from "~/components/yellow-card";
import { usePollPrices } from "~/hooks/usePollPrices";
import AverageGaugeWeight from "./components/average-gauge-weight";
import UnbondingQueue from "./components/unbonding-queue";
import YourDelegations from "./components/your-delegations";
import { BGTSelectionEnum, type BGTselection } from "./types";

export default function Portfolio() {
  const router = useRouter();
  const { account } = useBeraJs();
  const [tab, setTab] = React.useState<BGTselection>(
    BGTSelectionEnum.YOUR_DELEGATIONS,
  );

  const { useDelegatorTotalDelegated, useTotalValidatorsDelegated } =
    usePollDelegatorValidators();

  const total = useDelegatorTotalDelegated();
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
  const { useTotalBribes, useBribeTokens } = usePollBribes();
  const totalBribes = useTotalBribes(prices);
  const bribeTokenList = useBribeTokens();
  return (
    <div className="container mb-[80px] max-w-[1078px]">
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
            onClick={() => router.push("/delegate?action=redelegate")}
          >
            Manage delegations
          </Button>
        </YellowCard>
        <YellowCard className="justify-betwee flex flex-1 flex-col">
          <div className="text-5xl font-bold leading-[48px] text-foreground">
            {formatUsd(totalBribes ?? 0)}
          </div>
          <div className="py-[14px] text-center text-sm font-semibold leading-tight text-muted-foreground">
            {/* this is so hard coded!! i hate myself */}
            <TokenIconList size="xl" tokenList={bribeTokenList} />
          </div>
          <Button className="w-full max-w-[223px]">Claim</Button>
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
            onClick={() => setTab(BGTSelectionEnum.UNBONDING_QUEUE)}
          >
            See my queue
          </Button>
        </YellowCard>
      </div>
      <div className="mt-16 flex flex-col gap-4">
        <div className="mx-auto">
          <Tabs value={tab}>
            <TabsList className="w-full">
              {Object.values(BGTSelectionEnum).map((selection) => (
                <TabsTrigger
                  value={selection}
                  key={selection}
                  className="capitalize"
                  onClick={() => setTab(selection)}
                >
                  <p className="w-24 overflow-hidden text-ellipsis sm:w-full">
                    {" "}
                    {selection.replaceAll("-", " ")}
                  </p>
                </TabsTrigger>
              ))}
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
