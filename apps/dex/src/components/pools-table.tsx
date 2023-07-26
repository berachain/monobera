// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
// import { formatUsd, type Token } from "@bera/berajs";
// import { TokenIcon } from "@bera/shared-ui";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@bera/ui/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

// export default function PoolsTable({
//   pools,
//   mappedTokens,
// }: {
//   pools: Pool[];
//   mappedTokens: { [key: string]: number };
// }) {
//   const router = useRouter();
//   return (
//     <Tabs defaultValue="allPools">
//     <TabsList>
//       <TabsTrigger value="allPools">All pools</TabsTrigger>
//       <TabsTrigger value="userPools">My pools</TabsTrigger>
//     </TabsList>
//     <TabsContent value="allPools">
//     <div className="rounded-lg border border-border shadow-lg">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Composition</TableHead>
//             <TableHead>Pool name</TableHead>
//             <TableHead>BGT Rewards</TableHead>
//             <TableHead>Volume (24h)</TableHead>
//             <TableHead className="text-right">TVL</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {pools.length > 0 ? (
//             pools?.map((pool: Pool) => (
//               <TableRow
//                 key={pool.pool}
//                 onClick={() => router.push(`/pool/${pool.pool}`)}
//                 className="cursor-pointer"
//               >
//                 <TableCell className="font-medium">
//                   <div className="ml-2 flex flex-row justify-start">
//                     {pool?.tokens.map((token: Token) => (
//                       <TokenIcon
//                         key={token.address}
//                         token={token}
//                         className="ml-[-15px] h-10 w-10  border-2 border-border "
//                       />
//                     ))}
//                   </div>
//                 </TableCell>
//                 <TableCell className="font-medium">{pool.poolName}</TableCell>
//                 <TableCell>BGT REWARDS</TableCell>
//                 <TableCell>{formatUsd(pool.dailyVolume ?? 0)}</TableCell>
//                 <TableCell className="text-right">
//                   {formatUsd(pool.totalValue || 0)}
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={5} className="h-24 text-center">
//                 No results.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//     </TabsContent>
//     <TabsContent value="userPools">
//     <div className="rounded-lg border border-border shadow-lg">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Composition</TableHead>
//             <TableHead>Pool name</TableHead>
//             <TableHead>BGT Rewards</TableHead>
//             <TableHead>Volume (24h)</TableHead>
//             <TableHead className="text-right">TVL</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {pools.length > 0 ? (
//             pools?.map((pool: Pool) => (
//               <TableRow
//                 key={pool.pool}
//                 onClick={() => router.push(`/pool/${pool.pool}`)}
//                 className="cursor-pointer"
//               >
//                 <TableCell className="font-medium">
//                   <div className="ml-2 flex flex-row justify-start">
// {pool?.tokens.map((token: Token) => (
//   <TokenIcon
//     key={token.address}
//     token={token}
//     className="ml-[-15px] h-10 w-10  border-2 border-border "
//   />
// ))}
//                   </div>
//                 </TableCell>
//                 <TableCell className="font-medium">{pool.poolName}</TableCell>
//                 <TableCell>{formatUsd(pool.totalValue || 0)}</TableCell>
//                 <TableCell>{formatUsd(pool.dailyVolume ?? 0)}</TableCell>
//                 <TableCell className="text-right">
//                   {formatUsd(pool.totalValue || 0)}
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={5} className="h-24 text-center">
//                 No results.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//     </TabsContent>
//     </Tabs>

//   );
// }

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { DataTable } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { columns } from "./pools-table-columns";

const STEP = 10;
export default function PoolsTable({ pools }: { pools: Pool[] }) {
  const [numberOfPools, setNumberOfPools] = useState(STEP);
  const poolSubset = pools.slice(0, numberOfPools);
  const router = useRouter();

  const onRowClick = (state: any) => {
    const poolAddress = state.original.pool;
    router.push(`/pool/${poolAddress}`);
  };
  return (
    <Tabs defaultValue="allPools">
      <TabsList>
        <TabsTrigger value="allPools">All pools</TabsTrigger>
        <TabsTrigger value="userPools">My pools</TabsTrigger>
      </TabsList>
      <TabsContent value="allPools" className="flex w-full flex-col">
        <div className="rounded-lg border border-border shadow-lg">
          <DataTable
            data={poolSubset}
            columns={columns}
            onRowClick={(state: any) => onRowClick(state)}
          />
        </div>
        <Button
          className="mt-5 self-center"
          variant={"outline"}
          onClick={() => setNumberOfPools(numberOfPools + STEP)}
        >
          Load More
        </Button>
      </TabsContent>
    </Tabs>
  );
}
