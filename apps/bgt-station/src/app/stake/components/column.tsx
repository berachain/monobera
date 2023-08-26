"use client";

import { BeravaloperToEth, truncateHash, type Validator } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Badge } from "@bera/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { formatUnits } from "viem";

// const cb: any[] = [
//   {
//     address: '0xAF49b960077A58d08BD4a9461Ec957Ca84c40617',
//     startEpoch: 1,
//     weights: [
//       {
//         receiverAddress: '',
//       percentageNumber: 75,
//       },
//       {
//         receiverAddress: '',
//       percentageNumber: 25,
//       }
//     ]
//   }
// ]
// Example usage
// const colors = [
//   "bg-sky-500",
//   "bg-sky-500",
//   "bg-green-500",
//   "bg-red-500",
//   "bg-violet-500",
// ];

// const percents = ["w-[20%]", "w-[15%]", "w-[25%]", "w-[10%]", "w-[30%]"];

// Select 5 unique random items
// const uniqueColors = getRandomUniqueItems(colors, 5);
// const uniquePercents = getRandomUniqueItems(percents, 5);

export const getColumns = (totalDelegated: number): ColumnDef<Validator>[] => {
  return [
    {
      accessorKey: "index",
      header: "#",
      cell: ({ row }) => (
        <div className="flex items-center">
          <div>{row.index}</div>
        </div>
      ),
    },
    {
      accessorKey: "description.moniker",
      header: "Validator",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar className={cn("h-12 w-12")}>
              <AvatarImage src={``} />
              <AvatarFallback className="font-bold">
                {(row?.original?.description?.moniker ?? "").slice(0, 3)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p>{row?.original?.description?.moniker}</p>
              <Badge variant="secondary">
                {truncateHash(BeravaloperToEth(row?.original?.operatorAddress))}
              </Badge>
            </div>
          </div>
        );
      },
    },
    // {
    //   accessorKey: "cutting_board",
    //   header: "Cutting Board",
    //   enableSorting: true,
    //   cell: ({ row }) => {
    //     const rowWeights = cb[0].weights.map((weight: any) => `w-[${weight.percentageNumber}%]`)
    //     return (
    //       <>
    //         <span className="block w-[500px]">
    //           {rowWeights.map((w, i) => {
    //             console.log(w,i)
    //             const colorIndex = i % colors.length; // Calculate the index in the colors array
    //             const colorClass = colors[colorIndex];
    //             return (
    //               <span
    //               key={i}
    //               className={`inline-block ${colorClass} ${w} h-2`}
    //             />
    //             )
    //           })}
    //         </span>
    //       </>
    //     );
    //   },
    // },
    {
      accessorKey: "delegator_shares",
      header: "Voting power",
      enableSorting: true,
      cell: ({ row }) => {
        return (
          <>
            <p>
              {(
                (Number(formatUnits(row.original.delegatorShares, 18)) * 100) /
                totalDelegated
              ).toFixed(2)}
              %
            </p>
          </>
        );
      },
    },
    {
      accessorKey: "commission.commission_rates.rate",
      header: () => <p className="text-right">Commission</p>,
      enableSorting: true,
      cell: ({ row }) => (
        <p className="text-right">
          {(
            Number(
              formatUnits(row.original.commission.commissionRates.rate, 18),
            ) * 100
          ).toFixed(2)}
          %
        </p>
      ),
    },
    // {
    //   accessorKey: "bribes",
    //   header: () => <p className="text-right">Bribes</p>,
    //   cell: ({}) => (
    //     <div className="flex flex-row justify-end">
    //       <BribesList />
    //     </div>
    //   ),
    // },
    {
      accessorKey: "bribeAPR",
      header: () => <p className="text-right">Expected APR</p>,
      enableSorting: true,
      cell: ({}) => <p className="text-right">-%</p>,
    },
  ];
};

export const getYourColumns = (
  totalDelegated: number,
): ColumnDef<Validator>[] => [
  {
    accessorKey: "name",
    header: "Validator",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-gray-300" />
        <div className="flex flex-col">
          <p>{row.original.description.moniker}</p>
          <Badge variant="secondary">
            {truncateHash(BeravaloperToEth(row.original.operatorAddress))}
          </Badge>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "votingPower",
    header: "Voting power",
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <>
          <p>
            {(
              (Number(formatUnits(row.original.delegatorShares, 18)) * 100) /
              totalDelegated
            ).toFixed(2)}
            %
          </p>
        </>
      );
    },
  },
  {
    accessorKey: "commission.commission_rates.rate",
    header: () => <p className="text-right">Commission</p>,
    enableSorting: true,
    cell: ({ row }) => (
      <p className="text-right">
        {(
          Number(
            formatUnits(row.original.commission.commissionRates.rate, 18),
          ) * 100
        ).toFixed(2)}
        %
      </p>
    ),
  },
  // {
  //   accessorKey: "actions",
  //   header: () => <p className="text-center">Actions</p>,
  //   cell: ({ row }) => {
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     const router = useRouter();
  //     return (
  //       <div className="flex flex-row items-center justify-center gap-3">
  //         <Button
  //           size="sm"
  //           className="w-[100px]"
  //           onClick={(e) => {
  //             e.stopPropagation();
  //             router.push(
  //               `/stake/${BeravaloperToEth(
  //                 row?.original.operatorAddress,
  //               )}/redelegate`,
  //             );
  //           }}
  //         >
  //           Redelegate
  //         </Button>
  //         <UnbondButton
  //           inList
  //           validator={row?.original}
  //           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //           // @ts-ignore
  //           validatorAddress={BeravaloperToEth(row?.original.operatorAddress)}
  //         />
  //       </div>
  //     );
  //   },
  // },
];
