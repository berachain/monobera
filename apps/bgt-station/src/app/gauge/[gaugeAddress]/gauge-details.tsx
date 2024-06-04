"use client";

import { notFound } from "next/navigation";
import {
  truncateHash,
  usePollGauges,
  usePollValidatorInfo,
  usePollWalletBalances,
} from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { DataTable, GaugeIcon, MarketIcon, PoolHeader } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { gauge_incentives_columns } from "~/columns/gauge-incentives-columns";
import { general_validator_columns } from "~/columns/general-validator-columns";
import Loading from "./loading";
import { MyGaugeDetails } from "./my-gauge-details";

export const GaugeDetails = ({ gaugeAddress }: { gaugeAddress: string }) => {
  const {
    data: validators,
    isLoading: isValidatorLoading,
    isValidating: isValidatorValidating,
  } = usePollValidatorInfo();
  const {
    gaugeDictionary,
    isLoading: isGaugeLoading,
    isValidating: isGaugeValidating,
  } = usePollGauges();
  const gauge = gaugeDictionary?.[gaugeAddress];
  if (!isGaugeLoading && !gauge) notFound(); //gauge not found
  const isTableLoading = isGaugeLoading || isGaugeValidating;
  const { data: TokeList = [] } = usePollWalletBalances();
  console.log("gaugeDictionary", gaugeDictionary);
  return (
    <>
      {gauge ? (
        <div className="flex flex-col gap-11">
          <PoolHeader
            back={{
              backURL: "/gauge",
              backTitle: "All Gauges",
            }}
            title={
              <>
                <GaugeIcon address={gauge?.vaultAddress} size="xl" />
                {gauge?.metadata.name}
              </>
            }
            subtitles={[
              {
                title: "Platform",
                content: (
                  <>
                    {" "}
                    <MarketIcon market={gauge?.metadata.product} size={"md"} />
                    {gauge?.metadata.product}
                  </>
                ),
                externalLink: "https://berachain.com",
              },
              {
                title: "Pool Contract",
                content: <>{truncateHash(gauge?.vaultAddress ?? "")}</>,
                externalLink: `${blockExplorerUrl}/address/${gauge?.vaultAddress}`,
              },
            ]}
            className="border-b border-border pb-8"
          />
          <MyGaugeDetails gauge={gauge} />

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
                loading={isTableLoading}
                columns={gauge_incentives_columns}
                data={TokeList.map((token) => ({
                  ...token,
                  amountLeft: "50000",
                }))}
                className="max-h-[300px] min-w-[1000px] shadow"
                onRowClick={(row: any) => {
                  window.open(
                    `/incentivize?gauge=${gaugeAddress}&&token=${row.original.address}`,
                    "_self",
                  );
                }}
              />
            </TabsContent>
            <TabsContent value="validators">
              <DataTable
                columns={general_validator_columns as any}
                loading={isTableLoading}
                validating={isValidatorValidating}
                data={[]} //validators ??
                className="min-w-[800px] shadow"
                enablePagination
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
