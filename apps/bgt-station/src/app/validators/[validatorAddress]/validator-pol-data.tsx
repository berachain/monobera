import { Token, Vault, useTokenHoneyPrice, type Validator } from "@bera/berajs";
import {
  DataTable,
  FormattedNumber,
  MarketIcon,
  TokenIcon,
  VaultIcon,
} from "@bera/shared-ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@bera/ui/tabs";
import GlobalGaugeWeightChart from "~/components/global-gauge-weight-chart";
import { validatorIncentivesColumns } from "./validator-incentives-columns";
import {
  AggregatedBribe,
  useAggregatedBribes,
} from "../../../hooks/useAggregatedBribes";
import { Skeleton } from "@bera/ui/skeleton";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@bera/ui/dialog";

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
          <div className="flex flex-row gap-1 items-center">
            <TokenIcon address={aggregatedBribe?.token.address} size={"xl"} />
            <span className="font-semibold text-xl">
              {aggregatedBribe?.token.symbol}
            </span>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-0">
          <div className="flex flex-row gap-2 justify-between">
            <span className="font-medium text-sm text-muted-foreground">
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
              <span className="text-md font-medium text-muted-foreground ml-1">
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
            <span className="font-medium text-sm text-muted-foreground">
              Amount Per Proposal:
            </span>
            <span>
              <span className="text-lg font-medium">
                <FormattedNumber
                  value={parseFloat(aggregatedBribe?.amountPerProposal ?? "0")}
                />
              </span>
              <span className="text-md font-medium text-muted-foreground ml-1">
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
        <div className="w-full bg-muted rounded-md p-2">
          <div className="w-full justify-between flex flex-row text-sm border-b">
            <div className="w-[150px]">Market</div>
            <div className="w-[80px]">Amount Left</div>
            <div className="w-[80px]">Per Proposal</div>
          </div>
          <div className="mt-2 flex flex-col gap-4 max-h-[250px] overflow-scroll">
            {vaultBribeValues.map((vaultBribeValue) => {
              return (
                <div className="w-full justify-between flex flex-row text-sm ">
                  <div className="flex flex-col gap-1 w-[150px] overflow-hidden text-ellipsis">
                    <div>
                      <span className="font-medium flex flex-row gap-1 text-md items-center">
                        {" "}
                        <MarketIcon
                          imageUri={vaultBribeValue.vault.market.imageUri}
                          className="w-6 h-6"
                        />
                        {vaultBribeValue.vault.name}
                      </span>
                      <span className="font-medium flex flex-row gap-text-xs items-center">
                        <VaultIcon
                          imageUri={vaultBribeValue.vault.imageUri}
                          className="w-4 h-4"
                        />
                        {vaultBribeValue.vault.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start font-medium  gap-1 w-[80px] overflow-hidden text-ellipsis">
                    <div className="text-foreground text-md">
                      <FormattedNumber
                        value={parseFloat(vaultBribeValue.amountLeft)}
                      />
                    </div>
                    <div className="text-muted-foreground text-xs">
                      <FormattedNumber
                        value={
                          parseFloat(vaultBribeValue.amountLeft) *
                          parseFloat(tokenHoneyPrice ?? "0")
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start font-medium  gap-1 w-[80px] overflow-hidden text-ellipsis">
                    <div className="text-foreground text-md">
                      <FormattedNumber
                        value={parseFloat(vaultBribeValue.perProposal)}
                      />
                    </div>
                    <div className="text-muted-foreground text-xs">
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
  const aggregatedBribes = useAggregatedBribes(validator);

  const [selectedBribe, setSelectedBribe] = useState<
    AggregatedBribe | undefined
  >(undefined);
  return (
    <div className="w-full flex flex-col lg:flex-row mt-6 gap-6">
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
              <div className="w-full flex flex-col gap-2">
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
              <div className="w-full flex flex-col gap-2">
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
