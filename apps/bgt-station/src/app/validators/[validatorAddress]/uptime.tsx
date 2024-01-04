// import React from "react";
// import { Timeblock, Tooltip } from "@bera/shared-ui";
// import { Card } from "@bera/ui/card";
// import { Skeleton } from "@bera/ui/skeleton";
// import { type Address } from "viem";

// export default function Uptime({ address }: { address: Address }) {
//   const { data, isLoading } = useFetchValidatorUptime(address);
//   return (
//     <div className="flex w-full flex-col gap-4 text-lg font-semibold leading-7 lg:w-2/5 lg:min-w-[353px]">
//       <div className="flex items-center gap-1">
//         Uptime <Tooltip text="Validator's uptime over the last 100 blocks." />
//       </div>
//       <Card className="flex flex-col items-center gap-4 p-8">
//         <div className="grid w-[278px] grid-cols-10 gap-4 text-sm font-normal leading-normal text-muted-foreground">
//           {!isLoading && data && data.data ? (
//             <>
//               {data.data.map(
//                 (data: { block: number; status: boolean }, index: number) => (
//                   <Timeblock
//                     key={index}
//                     text={`Block: ${data.block}`}
//                     blockDown={!data.status}
//                   />
//                 ),
//               )}
//             </>
//           ) : (
//             <>
//               {Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
//                 <Skeleton key={number} className="h-3 w-3" />
//               ))}
//             </>
//           )}
//         </div>
//         <div className="w-[278px] text-right text-sm font-normal leading-normal text-muted-foreground">
//           Last 100 blocks
//         </div>
//       </Card>
//     </div>
//   );
// }

export {};
