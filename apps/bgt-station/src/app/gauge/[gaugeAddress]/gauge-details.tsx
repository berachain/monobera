"use client";

import {
  truncateHash,
  useSelectedGauge,
  useSelectedGaugeValidators,
} from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { DataTable, GaugeIcon, MarketIcon, PoolHeader } from "@bera/shared-ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { gauge_incentives_columns } from "~/columns/gauge-incentives-columns";
import { getGaugeValidatorColumns } from "~/columns/general-validator-columns";
import Loading from "./loading";
import { MyGaugeDetails } from "./my-gauge-details";
import { Address } from "viem";

export const GaugeDetails = ({ gaugeAddress }: { gaugeAddress: Address }) => {
  const {
    data: gauge,
    isLoading: isGaugeLoading,
    isValidating: isGaugeValidating,
  } = useSelectedGauge(gaugeAddress);

  const {
    data: validators,
    isLoading: isValidatorsLoading,
    isValidating: isValidatorsValidating,
  } = useSelectedGaugeValidators(gaugeAddress);

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
                loading={isGaugeLoading}
                validating={isGaugeValidating}
                columns={gauge_incentives_columns}
                data={gauge?.activeIncentives ?? []}
                className="max-h-[300px] min-w-[1000px] shadow"
                onRowClick={(row: any) => {
                  window.open(
                    `/incentivize?gauge=${gaugeAddress}&token=${row.original.token.address}`,
                    "_self",
                  );
                }}
              />
            </TabsContent>
            <TabsContent value="validators">
              <DataTable
                columns={getGaugeValidatorColumns(gauge)}
                loading={isValidatorsLoading}
                validating={isValidatorsValidating}
                data={validators ?? []}
                className="min-w-[800px] shadow"
                // enablePagination
                onRowClick={(row: any) => {
                  window.open(`/validators/${row.original.id}`, "_blank");
                }}
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
