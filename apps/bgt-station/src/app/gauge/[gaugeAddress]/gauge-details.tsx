"use client";

import { notFound } from "next/navigation";
import { truncateHash } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { PoolHeader, TokenIconList } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { isAddress } from "viem";

import { MyGaugeDetails } from "./my-gauge-details";

export const GaugeDetails = ({ gaugeAddress }: { gaugeAddress: string }) => {
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
            <TokenIconList tokenList={[]} size="xl" />
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
    </div>
  );
};
