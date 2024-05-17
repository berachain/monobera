"use client";

import { notFound } from "next/navigation";
import { truncateHash, usePollValidators } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import {
  DataTable,
  PoolHeader,
  SearchInput,
  TokenIconList,
} from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { isAddress } from "viem";

import { gauge_incentives_columns } from "~/columns/gauge-incentives-columns";
import { general_validator_columns } from "~/columns/general-validator-columns";
import { MyGaugeDetails } from "./my-gauge-details";

export const GaugeDetails = ({ gaugeAddress }: { gaugeAddress: string }) => {
  const { data: validators, isLoading, isValidating } = usePollValidators();
  // const gaugeAddress = "0x1234567890123456789012345678901234567890";
  if (!isAddress(gaugeAddress)) notFound();
  const isMyGauge = false;
  return (
    <div className="flex flex-col gap-11">
      <PoolHeader
        back={{
          backURL: isMyGauge ? "/gauge?gauge=my-gauge" : "/gauge",
          backTitle: isMyGauge ? "My Gauges" : "All Gauges",
        }}
        title={
          <>
            {/* <TokenIconList tokenList={[]} size="xl" /> */}
            <div className="flex">
              <Icons.beraIcon className="h-8 w-8" />
              <Icons.honey className="-ml-2 h-8 w-8" />
            </div>
            BERA / HONEY
          </>
        }
        subtitles={[
          {
            title: "Platform",
            content: (
              <>
                {" "}
                <Icons.bexFav className="h-4 w-4" />
                Bex
              </>
            ),
            externalLink: "https://berachain.com",
          },
          {
            title: "Pool Contract",
            content: <>{truncateHash("0xbwkjqbdjqkdbqiwjheiqowe")}</>,
            externalLink: `${blockExplorerUrl}/address/${"0xbwkjqbdjqkdbqiwjheiqowe"}`,
          },
        ]}
        className="border-b border-border pb-8"
      />
      <MyGaugeDetails gaugeAddress={gaugeAddress} />

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

          <div className="w-full md:w-[300px]">
            <SearchInput
              placeholder="Search..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
            />
          </div>
        </div>

        <TabsContent value="incentives">
          <DataTable
            columns={gauge_incentives_columns as any}
            data={[1, 2, 3]}
            className="max-h-[300px] min-w-[1000px] shadow"
            enablePagination
          />
        </TabsContent>
        <TabsContent value="validators">
          <DataTable
            columns={general_validator_columns as any}
            loading={isLoading}
            validating={isValidating}
            data={validators ?? []}
            className="min-w-[800px] shadow"
            enablePagination
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
