import { useState } from "react";
import { Token, Vault, useTokenHoneyPrice, type Validator } from "@bera/berajs";
import {
  DataTable,
  FormattedNumber,
  MarketIcon,
  TokenIcon,
  VaultIcon,
} from "@bera/shared-ui";
import { Dialog, DialogContent, DialogHeader } from "@bera/ui/dialog";
import { Skeleton } from "@bera/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { Address } from "viem";
import GlobalGaugeWeightChart from "~/components/global-gauge-weight-chart";
import {
  AggregatedBribe,
  useAggregatedBribes,
} from "../../../hooks/useAggregatedBribes";
import { validatorIncentivesColumns } from "./validator-incentives-columns";

interface VaultBribeValue {
  vault: Vault;
  token: Token;
  amountLeft: string;
  perProposal: string;
}

export const AggregatedBribeDialog = ({
  aggregatedBribe,
  onOpenChange,
}: {
  aggregatedBribe: AggregatedBribe | undefined;
  onOpenChange: (open: boolean) => void;
}) => {
  const { data: tokenHoneyPrice } = useTokenHoneyPrice({
    tokenAddress: aggregatedBribe?.token.address,
  });

  const vaultBribeValues: VaultBribeValue[] = !aggregatedBribe
    ? []
    : aggregatedBribe?.sourceVaults.flatMap((vault) => {
        return vault.activeIncentives.map((incentive) => {
          if (incentive.token.address === aggregatedBribe.token.address) {
            return {
              vault,
              token: incentive.token,
              amountLeft: incentive.amountLeft,
              perProposal: incentive.incentiveRate,
            };
          }
        }) as VaultBribeValue[];
      });

  if (!aggregatedBribe) return false;
  return (
    <Dialog open={!aggregatedBribe} onOpenChange={(open) => onOpenChange(open)}>
      <DialogContent>
        {" "}
        <DialogHeader>
          <div className="flex flex-row items-center gap-1">
            <TokenIcon address={aggregatedBribe?.token.address} size={"xl"} />
            <span className="text-xl font-semibold">
              {aggregatedBribe?.token.symbol}
            </span>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-0">
          <div className="flex flex-row justify-between gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Total Amount Left:
            </span>
            <div>
              <span className="text-lg font-medium">
                <FormattedNumber
                  value={parseFloat(
                    aggregatedBribe?.bribeTotalAmountLeft ?? "0",
                  )}
                />
              </span>
              <span className="text-md ml-1 font-medium text-muted-foreground">
                (
                <FormattedNumber
                  value={
                    parseFloat(aggregatedBribe?.bribeTotalAmountLeft ?? "0") *
                    parseFloat(tokenHoneyPrice ?? "0")
                  }
                />
                )
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Amount Per Proposal:
            </span>
            <span>
              <span className="text-lg font-medium">
                <FormattedNumber
                  value={parseFloat(aggregatedBribe?.amountPerProposal ?? "0")}
                />
              </span>
              <span className="text-md ml-1 font-medium text-muted-foreground">
                (
                <FormattedNumber
                  value={
                    parseFloat(aggregatedBribe?.amountPerProposal ?? "0") *
                    parseFloat(tokenHoneyPrice ?? "0")
                  }
                />
                )
              </span>
            </span>
          </div>
        </div>
        <div className="w-full rounded-md bg-muted p-2">
          <div className="flex w-full flex-row justify-between border-b text-sm">
            <div className="w-[150px]">Market</div>
            <div className="w-[80px]">Amount Left</div>
            <div className="w-[80px]">Per Proposal</div>
          </div>
          <div className="mt-2 flex max-h-[250px] flex-col gap-4 overflow-scroll">
            {vaultBribeValues.map((vaultBribeValue) => {
              return (
                <div className="flex w-full flex-row justify-between text-sm ">
                  <div className="flex w-[150px] flex-col gap-1 overflow-hidden text-ellipsis">
                    <div>
                      <span className="text-md flex flex-row items-center gap-1 font-medium">
                        {" "}
                        <MarketIcon
                          market={vaultBribeValue.vault.market}
                          className="h-6 w-6"
                        />
                        {vaultBribeValue.vault.name}
                      </span>
                      <span className="gap-text-xs flex flex-row items-center font-medium">
                        <VaultIcon
                          imageUri={vaultBribeValue.vault.imageUri}
                          className="h-4 w-4"
                        />
                        {vaultBribeValue.vault.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-[80px] flex-col items-start  gap-1 overflow-hidden text-ellipsis font-medium">
                    <div className="text-md text-foreground">
                      <FormattedNumber
                        value={parseFloat(vaultBribeValue.amountLeft)}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <FormattedNumber
                        value={
                          parseFloat(vaultBribeValue.amountLeft) *
                          parseFloat(tokenHoneyPrice ?? "0")
                        }
                      />
                    </div>
                  </div>
                  <div className="flex w-[80px] flex-col items-start  gap-1 overflow-hidden text-ellipsis font-medium">
                    <div className="text-md text-foreground">
                      <FormattedNumber
                        value={parseFloat(vaultBribeValue.perProposal)}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <FormattedNumber
                        value={
                          parseFloat(vaultBribeValue.perProposal) *
                          parseFloat(tokenHoneyPrice ?? "0")
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const ValidatorPolData = ({
  validator,
  isLoading,
}: {
  validator: Validator;
  isLoading: boolean;
}) => {
  const aggregatedBribes = useAggregatedBribes(validator.id as Address);

  const [selectedBribe, setSelectedBribe] = useState<
    AggregatedBribe | undefined
  >(undefined);
  return (
    <div className="mt-6 flex w-full flex-col gap-6 lg:flex-row">
      <AggregatedBribeDialog
        aggregatedBribe={selectedBribe}
        onOpenChange={(open) => !open && setSelectedBribe(undefined)}
      />
      <div className="w-full">
        <Tabs defaultValue="gauges">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gauges">Gauges</TabsTrigger>
            <TabsTrigger value="incentives">Incentives</TabsTrigger>
          </TabsList>
          <TabsContent value={"gauges"} className="mt-6">
            {isLoading ? (
              <div className="flex w-full flex-col gap-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <DataTable
                columns={validatorIncentivesColumns}
                data={aggregatedBribes ?? []}
              />
            )}{" "}
          </TabsContent>

          <TabsContent value={"incentives"} className="mt-6">
            {isLoading ? (
              <div className="flex w-full flex-col gap-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <DataTable
                columns={validatorIncentivesColumns}
                data={aggregatedBribes ?? []}
                onRowClick={(row: any) => {
                  console.log(row);
                  setSelectedBribe(row.original as AggregatedBribe);
                }}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
      <GlobalGaugeWeightChart
        gaugeWeights={validator.cuttingboard}
        totalAmountStaked={validator.amountStaked}
        globalAmountStaked={"10000000"}
        isLoading={isLoading}
      />
    </div>
  );
};
