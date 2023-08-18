"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Tooltip } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Switch } from "@bera/ui/switch";

import RewardBanner from "~/components/reward-banner";
import StatusBanner from "~/components/status-banner";
import { useMarkets } from "~/hooks/useMarkets";

export default function DashboardPageContent() {
  const [useTableView, setUseTableView] = React.useState(false);
  const [useHideZeros, setUseHideZeros] = React.useState(true);
  const [collapseSupply, setCollapseSupply] = React.useState(false);
  const [collapseBorrow, setCollapseBorrow] = React.useState(false);
  const markets = useMarkets();
  const suppliedMarkets = markets.filter(
    (market) => market.supplyBalance || 0 > 0,
  );
  const borrowedMarkets = markets.filter(
    (market) => market.borrowBalance || 0 > 0,
  );
  const availableToSupply = markets.filter(
    (market) => market.supplyBalance || 0 === 0,
  );

  const availableToBorrow = markets.filter(
    (market) => market.borrowBalance || 0 === 0,
  );
  const router = useRouter();
  return (
    <>
      <div className="mb-12">
        <RewardBanner />
      </div>
      <div className="mb-12">
        <StatusBanner />
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="mb-2 text-5xl font-bold">Account Status</h2>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">Switch to table view</p>
          <Switch
            id="use-tableview"
            checked={useTableView}
            onCheckedChange={(checked: boolean) => setUseTableView(checked)}
          />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h3 className="mb-2 text-2xl font-semibold">Your Supplies</h3>
            <Button
              variant={"outline"}
              onClick={() => {
                setCollapseSupply(!collapseSupply);
              }}
            >
              {collapseSupply ? <Icons.plus /> : <Icons.minus />}
            </Button>
          </div>
          {collapseSupply ? null : (
            <div className="flex flex-col gap-6">
              <p className="text-muted-foreground">
                You must supply in order to borrow funds.
              </p>
              {suppliedMarkets.length > 0 ? (
                suppliedMarkets.map((market) => (
                  <div
                    className="flex items-center justify-between rounded-2xl border bg-background p-4 shadow"
                    key={market.title}
                  >
                    <div className="flex">
                      <div className="mr-10 flex items-center gap-4">
                        <Image
                          src={market.icon}
                          alt={market.title}
                          className="rounded-full"
                          width={32}
                          height={32}
                        />
                        <div>
                          <p className="text-xs	leading-5 text-muted-foreground">
                            {market.title}
                          </p>
                          <p className="text-lg font-bold">
                            $8.28M <Tooltip text={market.totalSupply} />
                          </p>
                        </div>
                      </div>

                      <div className="grow-1 flex gap-6">
                        <div className="flex flex-col gap-1">
                          <p className="text-xs leading-5 text-muted-foreground">
                            APY
                          </p>
                          <p className="text-lg font-bold">
                            {market.dailyPercentChange > 0 ? (
                              <span className="text-positive">
                                +{market.dailyPercentChange}%
                              </span>
                            ) : (
                              <span className="text-negative">
                                -{market.dailyPercentChange}%
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="grow-1 flex items-center gap-2">
                        <Button>
                          <Icons.plusCircle className="mr-2" /> Supply
                        </Button>
                        <Button variant={"secondary"}>Borrow</Button>
                        <Button
                          variant={"secondary"}
                          onClick={() =>
                            router.push("/individual-market-analytics")
                          }
                        >
                          <Icons.info />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between rounded-xl border p-4">
                  <p className="">You have not supplied any assets</p>
                  <Button
                    variant={"secondary"}
                    onClick={() => {
                      router.push("/markets");
                    }}
                  >
                    <Icons.plusCircle className="mr-2" />
                    Supply
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h3 className="mb-2 text-2xl font-semibold">Your Borrows</h3>
            <Button
              variant={"outline"}
              onClick={() => {
                setCollapseBorrow(!collapseBorrow);
              }}
            >
              {collapseBorrow ? <Icons.plus /> : <Icons.minus />}
            </Button>
          </div>
          {collapseBorrow ? null : (
            <div className="flex flex-col gap-6">
              <p className="text-muted-foreground">
                You must supply in order to borrow funds.
              </p>
              {borrowedMarkets.length > 0 ? (
                suppliedMarkets.map((market) => (
                  <div
                    className="flex items-center justify-between rounded-2xl border bg-background p-4 shadow"
                    key={market.title}
                  >
                    <div className="flex">
                      <div className="mr-10 flex items-center gap-4">
                        <Image
                          src={market.icon}
                          alt={market.title}
                          className="rounded-full"
                          width={32}
                          height={32}
                        />
                        <div>
                          <p className="text-xs	leading-5 text-muted-foreground">
                            {market.title}
                          </p>
                          <p className="text-lg font-bold">
                            $8.28M <Tooltip text={market.totalSupply} />
                          </p>
                        </div>
                      </div>

                      <div className="grow-1 flex gap-6">
                        <div className="flex flex-col gap-1">
                          <p className="text-xs leading-5 text-muted-foreground">
                            APY
                          </p>
                          <p className="text-lg font-bold">
                            {market.dailyPercentChange > 0 ? (
                              <span className="text-positive">
                                +{market.dailyPercentChange}%
                              </span>
                            ) : (
                              <span className="text-negative">
                                -{market.dailyPercentChange}%
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="grow-1 flex items-center gap-2">
                        <Button>
                          <Icons.plusCircle className="mr-2" /> Supply
                        </Button>
                        <Button variant={"secondary"}>Borrow</Button>
                        <Button
                          variant={"secondary"}
                          onClick={() =>
                            router.push("/individual-market-analytics")
                          }
                        >
                          <Icons.info />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between rounded-xl border p-4">
                  <p className="">You have not supplied any assets</p>
                  <Button
                    variant={"secondary"}
                    onClick={() => {
                      router.push("/markets");
                    }}
                  >
                    <Icons.plusCircle className="mr-2" />
                    Supply
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-row justify-between">
            <h3 className="mb-2 text-2xl font-semibold">Available to Supply</h3>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Hide $0.00 balance
              </p>
              <Switch
                id="use-hidezeros"
                checked={useHideZeros}
                onCheckedChange={(checked: boolean) => setUseHideZeros(checked)}
              />
            </div>
          </div>
          {availableToSupply.length > 0
            ? suppliedMarkets.map((market) => (
                <div
                  className="flex items-center justify-between rounded-2xl border bg-background p-4 shadow"
                  key={market.title}
                >
                  <div className="flex">
                    <div className="mr-10 flex items-center gap-4">
                      <Image
                        src={market.icon}
                        alt={market.title}
                        className="rounded-full"
                        width={32}
                        height={32}
                      />
                      <div>
                        <p className="text-xs	leading-5 text-muted-foreground">
                          {market.title}
                        </p>
                        <p className="text-lg font-bold">
                          $8.28M <Tooltip text={market.totalSupply} />
                        </p>
                      </div>
                    </div>

                    <div className="grow-1 flex gap-6">
                      <div className="flex flex-col gap-1">
                        <p className="text-xs leading-5 text-muted-foreground">
                          APY
                        </p>
                        <p className="text-lg font-bold">
                          {market.dailyPercentChange > 0 ? (
                            <span className="text-positive">
                              +{market.dailyPercentChange}%
                            </span>
                          ) : (
                            <span className="text-negative">
                              -{market.dailyPercentChange}%
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grow-1 flex items-center gap-2">
                      <Button>
                        <Icons.plusCircle className="mr-2" /> Supply
                      </Button>
                      <Button variant={"secondary"}>Borrow</Button>
                      <Button
                        variant={"secondary"}
                        onClick={() =>
                          router.push("/individual-market-analytics")
                        }
                      >
                        <Icons.info />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="mb-2 text-2xl font-semibold">Available to Borrow</h3>
          {availableToBorrow.length > 0
            ? suppliedMarkets.map((market) => (
                <div
                  className="flex items-center justify-between rounded-2xl border bg-background p-4 shadow"
                  key={market.title}
                >
                  <div className="flex">
                    <div className="mr-10 flex items-center gap-4">
                      <Image
                        src={market.icon}
                        alt={market.title}
                        className="rounded-full"
                        width={32}
                        height={32}
                      />
                      <div>
                        <p className="text-xs	leading-5 text-muted-foreground">
                          {market.title}
                        </p>
                        <p className="text-lg font-bold">
                          $8.28M <Tooltip text={market.totalSupply} />
                        </p>
                      </div>
                    </div>

                    <div className="grow-1 flex gap-6">
                      <div className="flex flex-col gap-1">
                        <p className="text-xs leading-5 text-muted-foreground">
                          APY
                        </p>
                        <p className="text-lg font-bold">
                          {market.dailyPercentChange > 0 ? (
                            <span className="text-positive">
                              +{market.dailyPercentChange}%
                            </span>
                          ) : (
                            <span className="text-negative">
                              -{market.dailyPercentChange}%
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grow-1 flex items-center gap-2">
                      <Button>
                        <Icons.plusCircle className="mr-2" /> Supply
                      </Button>
                      <Button variant={"secondary"}>Borrow</Button>
                      <Button
                        variant={"secondary"}
                        onClick={() =>
                          router.push("/individual-market-analytics")
                        }
                      >
                        <Icons.info />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
