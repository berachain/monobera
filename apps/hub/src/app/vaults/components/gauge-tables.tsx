"use client";

import React, { useEffect, useState } from "react";
import { useBeraJs } from "@bera/berajs";
import { SearchInput } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import GlobalGaugeWeightTable from "~/components/global-gauge-weight-table";
import UserGaugeWeightTable from "~/components/user-gauge-weight-table";
import MarketSelector from "./market-selector";

export default function GaugeTables() {
  const { isReady } = useBeraJs();
  const [markets, setMarkets] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string | undefined>(undefined);
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimer) clearTimeout(typingTimer);
    };
  }, [typingTimer]);

  return (
    <Tabs defaultValue="all-gauges" className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <TabsList className="w-full md:w-fit" variant="ghost">
          <TabsTrigger value="all-gauges" className="w-full md:w-fit">
            All Gauges
          </TabsTrigger>
          <TabsTrigger
            value="my-gauges"
            className="w-full md:w-fit"
            disabled={!isReady}
          >
            My Gauges
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all-gauges">
          <div className="flex w-full items-center gap-3 md:w-fit">
            <SearchInput
              placeholder="Search..."
              value={keywords}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setKeywords(e.target.value);
                setIsTyping?.(true);
                if (typingTimer) clearTimeout(typingTimer);
                const newTimer = setTimeout(() => {
                  setIsTyping(false);
                }, 1000);
                setTypingTimer(newTimer);
              }}
              // onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              //   if (e.key === "Enter" && keywords) {
              //     setKeywordList([...keywordList, keywords]);
              //     setKeywords("");
              //   }
              // }}
              className="w-full md:w-[300px]"
            />

            <MarketSelector {...{ markets, setMarkets }} />
          </div>
        </TabsContent>
      </div>
      <TabsContent value="all-gauges">
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
      </TabsContent>

      <TabsContent value="all-gauges">
        <GlobalGaugeWeightTable
          keywords={keywords}
          markets={markets}
          isTyping={isTyping}
        />
      </TabsContent>
      <TabsContent value="my-gauges">
        <UserGaugeWeightTable myGauge keywords={keywords} />
      </TabsContent>
    </Tabs>
  );
}
