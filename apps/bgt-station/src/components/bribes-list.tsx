"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@bera/ui/tooltip";

import { dummyToken } from "~/utils/constants";
import { TokenIcon } from "./token-icon";

export default function BribesList() {
  return (
    <TooltipProvider>
      <Tooltip defaultOpen={false}>
        <TooltipTrigger asChild>
          <div className="flex flex-row">
            {Array.from(Array(3), (_, index) => (
              <div key={index} className="ml-[-15px]">
                <TokenIcon token={dummyToken} />
              </div>
            ))}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Block proposals left: 9</p>
          <p>Token: release per proposal</p>
          <p>USDC: 212.23</p>
          <p>HONEY: 123.21</p>
          <p>BERA: 69.420</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
