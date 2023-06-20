"use client";

import React from "react";
import { type Bribe } from "@bera/berajs";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@bera/ui/tooltip";

// import { dummyToken } from "~/utils/constants";
import { TokenIcon } from "./token-icon";

type Props = {
  bribes: Bribe | undefined;
};
export default function BribesList({ bribes }: Props) {
  return (
    // <TooltipProvider>
    //   <Tooltip defaultOpen={false}>
    //     <TooltipTrigger asChild>
    //       <div className="flex flex-row">
    //         {Array.from(Array(3), (_, index) => (
    //           <div key={index} className="ml-[-15px]">
    //             <TokenIcon token={dummyToken} />
    //           </div>
    //         ))}
    //       </div>
    //     </TooltipTrigger>
    //     <TooltipContent>
    //       <p>Block proposals left: 9</p>
    //       <p>Token: release per proposal</p>
    //       <p>USDC: 212.23</p>
    //       <p>HONEY: 123.21</p>
    //       <p>BERA: 69.420</p>
    //     </TooltipContent>
    //   </Tooltip>
    // </TooltipProvider>
    <div className="flex flex-row">
      {/* {Array.from(Array(3), (_, index) => (
      <div key={index} className="ml-[-15px]">
        <TokenIcon token={dummyToken} />
      </div>
    ))} */}
      {bribes?.proposers.map((token: string, index) => (
        <div key={index} className="ml-[-15px]">
          <TokenIcon
            fetch
            token={{
              address: token,
              decimals: 18,
              symbol: "",
              name: "",
              default: true,
            }}
          />
        </div>
      ))}
    </div>
  );
}
