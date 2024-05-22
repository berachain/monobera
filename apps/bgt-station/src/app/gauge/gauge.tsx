"use client";

import React, { useState } from "react";
import {
  useBeraJs,
  type CuttingBoardWeight,
} from "@bera/berajs";
import { SearchInput } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import GlobalGaugeWeightChart from "~/components/global-gauge-weight-chart";
import GlobalGaugeWeightTable from "~/components/global-gauge-weight-table";
import GaugeInfoCard from "./gauge-info-card";
import MarketSelector from "./market-selector";

const cuttingboard: CuttingBoardWeight[] = [
  {
    percentage: 25,
    amount: 375000,
    receiver: {
      address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
      stakingToken: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
      name: "Honey Vault",
      imageUri:
        "https://res.cloudinary.com/duv0g402y/image/upload/v1693160761/honey/qqyo5g3phzdwezvazsih.png",
      website: "https://www.honeyvault.com",
      activeIncentives: [
        {
          token: {
            name: "Honey Token",
            symbol: "HNY",
            address: "0xdeadbeefdeadbeef",
            decimals: 18,
          },
          incentiveRate: "0.05",
          amountLeft: "50000",
        },
      ],
      market: {
        id: "honey",
        name: "Honey Market",
        imageUri:
          "https://res.cloudinary.com/duv0g402y/image/upload/v1693160761/honey/qqyo5g3phzdwezvazsih.png",
        website: "https://www.honeymarket.com",
      },
    },
  },
  {
    percentage: 25,
    amount: 75000,
    receiver: {
      address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
      stakingToken: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
      name: "Honey Vault",
      imageUri:
        "https://res.cloudinary.com/duv0g402y/image/upload/v1693160761/honey/qqyo5g3phzdwezvazsih.png",
      website: "https://www.honeyvault.com",
      activeIncentives: [
        {
          token: {
            name: "Honey Token",
            symbol: "HNY",
            address: "0xdeadbeefdeadbeef",
            decimals: 18,
          },
          incentiveRate: "0.05",
          amountLeft: "50000",
        },
      ],
      market: {
        id: "honey",
        name: "Honey Market",
        imageUri:
          "https://res.cloudinary.com/duv0g402y/image/upload/v1693160761/honey/qqyo5g3phzdwezvazsih.png",
        website: "https://www.honeymarket.com",
      },
    },
  },
  {
    percentage: 25,
    amount: 375000,
    receiver: {
      address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
      stakingToken: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
      name: "Honey Vault",
      imageUri:
        "https://res.cloudinary.com/duv0g402y/image/upload/v1693160761/honey/qqyo5g3phzdwezvazsih.png",
      website: "https://www.honeyvault.com",
      activeIncentives: [
        {
          token: {
            name: "Honey Token",
            symbol: "HNY",
            address: "0xdeadbeefdeadbeef",
            decimals: 18,
          },
          incentiveRate: "0.05",
          amountLeft: "50000",
        },
      ],
      market: {
        id: "honey",
        name: "Honey Market",
        imageUri:
          "https://res.cloudinary.com/duv0g402y/image/upload/v1693160761/honey/qqyo5g3phzdwezvazsih.png",
        website: "https://www.honeymarket.com",
      },
    },
  },
];

export default function Gauge() {
  const { isConnected } = useBeraJs();
  const [markets, setMarkets] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string | undefined>(undefined);
  const [keywordList, setKeywordList] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-12">
      <div className="xs:gap-3 flex flex-col gap-8 lg:flex-row">
        <GaugeInfoCard />
        <GlobalGaugeWeightChart
          isLoading={false}
          gaugeWeights={cuttingboard}
          totalAmountStaked={"100000"}
          globalAmountStaked={"100000000"}
        />
      </div>

      <Tabs defaultValue="all-gauges" className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <TabsList className="w-full md:w-fit">
            <TabsTrigger value="all-gauges" className="w-full md:w-fit">
              All Gauges
            </TabsTrigger>
            <TabsTrigger
              value="my-gauges"
              className="w-full md:w-fit"
              disabled={!isConnected}
            >
              My Gauges
            </TabsTrigger>
          </TabsList>

          <div className="flex w-full items-center gap-3 md:w-fit">
            <SearchInput
              placeholder="Search..."
              value={keywords}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setKeywords(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && keywords) {
                  setKeywordList([...keywordList, keywords]);
                  setKeywords("");
                }
              }}
              className="w-full md:w-[300px]"
            />
            <MarketSelector {...{ markets, setMarkets }} />
          </div>
        </div>
        {(markets.length !== 0 || keywordList.length !== 0) && (
          <div className="flex flex-wrap gap-2">
            <div className="text-sm leading-6">Projects filtered by:</div>
            {markets.map((filter, index) => (
              <div
                className="flex h-6 items-center gap-2 rounded-full bg-foreground pl-2 pr-1 text-sm capitalize text-background"
                key={`${index}-${filter}`}
              >
                {filter}
                <Icons.xCircle
                  className="h-3 w-3 cursor-pointer hover:opacity-80"
                  onClick={() =>
                    setMarkets(markets.filter((m) => m !== filter))
                  }
                />
              </div>
            ))}
            {keywordList.map((keyW, index) => (
              <div
                className="flex h-6 items-center gap-2 rounded-full bg-foreground pl-2 pr-1 text-sm capitalize text-background"
                key={`${index}-${keyW}`}
              >
                {keyW}
                <Icons.xCircle
                  className="h-3 w-3 cursor-pointer hover:opacity-80"
                  onClick={() => {
                    setKeywordList(
                      keywordList.filter((kw: string) => kw !== keyW),
                    );
                  }}
                />
              </div>
            ))}
          </div>
        )}
        <TabsContent value="all-gauges">
          <GlobalGaugeWeightTable keywords={keywords} />
        </TabsContent>
        <TabsContent value="my-gauges">
          <GlobalGaugeWeightTable keywords={keywords} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
