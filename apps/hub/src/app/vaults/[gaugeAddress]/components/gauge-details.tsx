"use client";

import { notFound } from "next/navigation";
import {
  Gauge,
  truncateHash,
  useSelectedGauge,
  useSelectedGaugeValidators,
} from "@bera/berajs";
import { bgtVaultBlackList, blockExplorerUrl } from "@bera/config";
import { DataTable, GaugeIcon, MarketIcon, PoolHeader } from "@bera/shared-ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { SWRConfig, unstable_serialize } from "swr";
import { Address, isAddress } from "viem";

import { gauge_incentives_columns } from "~/columns/gauge-incentives-columns";
import { getGaugeValidatorColumns } from "~/columns/general-validator-columns";
import Loading from "../loading";
import { BendRewardsBanner } from "./banner";
import { MyGaugeDetails } from "./my-gauge-details";

export const GaugeDetails = ({
  gaugeAddress,
  gauge,
}: {
  gaugeAddress: Address;
  gauge?: Gauge;
}) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize(["useSelectedValidator", gaugeAddress])]: gauge,
        },
      }}
    >
      <_GaugeDetails gaugeAddress={gaugeAddress} />
    </SWRConfig>
  );
};

const _GaugeDetails = ({ gaugeAddress }: { gaugeAddress: Address }) => {
  const {
    data: gauge,
    isLoading: isGaugeLoading,
    error: gaugeError,
    isValidating: isGaugeValidating,
  } = useSelectedGauge(gaugeAddress);

  const {
    data: validators = [],
    isLoading: isValidatorsLoading,
    isValidating: isValidatorsValidating,
  } = useSelectedGaugeValidators(gaugeAddress);

  if (gaugeError || !gaugeAddress || !isAddress(gaugeAddress))
    return notFound();
  if (!isGaugeLoading && !isGaugeValidating && !gauge) return notFound();
  console.log("gauge", gauge, gaugeError);
  return (
    <>
      {gauge ? (
        <div className="flex flex-col gap-11">
          <PoolHeader
            title={
              <>
                <GaugeIcon
                  address={gauge?.vaultAddress}
                  size="xl"
                  overrideImage={gauge?.metadata?.logoURI}
                />
                {gauge?.metadata?.name ?? truncateHash(gaugeAddress)}
              </>
            }
            subtitles={[
              {
                title: "Platform",
                content: (
                  <>
                    {" "}
                    <MarketIcon
                      market={gauge?.metadata?.product ?? ""}
                      size={"md"}
                    />
                    {gauge?.metadata?.product ?? "OTHER"}
                  </>
                ),
                externalLink: gauge?.metadata?.url ?? "",
              },
              {
                title: "Reward Vault",
                content: <>{truncateHash(gauge?.vaultAddress ?? "")}</>,
                externalLink: `${blockExplorerUrl}/address/${gauge?.vaultAddress}`,
              },
              {
                title: "Staking Contract",
                content: <>{truncateHash(gauge?.stakingTokenAddress ?? "")}</>,
                externalLink: `${blockExplorerUrl}/address/${gauge?.stakingTokenAddress}`,
              },
            ]}
            className="border-b border-border pb-8"
          />
          {gaugeAddress !== bgtVaultBlackList ? (
            <MyGaugeDetails gauge={gauge} />
          ) : (
            <BendRewardsBanner />
          )}

          <Tabs defaultValue="incentives" className="flex flex-col gap-4">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <TabsList className="w-full md:w-fit">
                <TabsTrigger value="incentives" className="w-full md:w-fit">
                  Incentives
                </TabsTrigger>
                <TabsTrigger value="validators" className="w-full md:w-fit">
                  Validators
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="incentives">
              <DataTable
                loading={isGaugeLoading}
                validating={isGaugeValidating}
                columns={gauge_incentives_columns}
                data={gauge?.activeIncentives ?? []}
                className="max-h-[300px] min-w-[1000px] shadow"
                onRowClick={(row: any) =>
                  window.open(
                    `/incentivize?gauge=${gaugeAddress}&token=${row.original.token.address}`,
                    "_self",
                  )
                }
              />
            </TabsContent>
            <TabsContent value="validators">
              <DataTable
                columns={getGaugeValidatorColumns(gauge)}
                loading={isValidatorsLoading}
                validating={isValidatorsValidating}
                data={validators}
                className="min-w-[800px] shadow"
                onRowClick={(row: any) =>
                  window.open(`/validators?v=${row.original.id}`, "_blank")
                }
              />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
