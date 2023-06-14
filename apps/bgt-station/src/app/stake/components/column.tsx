"use client";

import { useRouter } from "next/navigation";
import { BeravaloperToEth, truncateHash, type Validator } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { formatUnits } from "viem";

import BribesList from "~/components/bribes-list";
import UnbondButton from "../[validatorAddress]/components/UnbondButton";

function getRandomUniqueItems(array: string[], count: number): string[] {
  if (count > array.length) {
    throw new Error("Count cannot be greater than the array length.");
  }

  const result: string[] = [];
  const availableItems = [...array];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    const selectedItem = availableItems.splice(randomIndex, 1)[0];
    result.push(selectedItem as string);
  }

  return result;
}

// Example usage
const colors = [
  "bg-sky-500",
  "bg-orange-500",
  "bg-green-500",
  "bg-red-500",
  "bg-violet-500",
];

const percents = ["w-[20%]", "w-[15%]", "w-[25%]", "w-[10%]", "w-[30%]"];

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
        console.log(BeravaloperToEth(row?.original?.operatorAddress));
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
                {truncateHash(
                  BeravaloperToEth(
                    row?.original?.operatorAddress,
                  ) as `0x${string}`,
                )}
              </Badge>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "cutting_board",
      header: "Cutting Board",
      enableSorting: true,
      cell: ({ row }) => {
        return (
          <>
            <span className="block w-full">
              {/* {cuttingBoard.map((_, i) => (
              <span
                key={i}
                className={`inline-block ${uniqueColors[i]} ${uniquePercents[i]} h-2`}
              />
            ))} */}
            </span>
          </>
        );
      },
    },
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
    {
      accessorKey: "bribes",
      header: () => <p className="text-right">Bribes</p>,
      cell: ({}) => (
        <div className="flex flex-row justify-end">
          <BribesList />
        </div>
      ),
    },
    {
      accessorKey: "bribeAPR",
      header: () => <p className="text-right">Expected APR</p>,
      enableSorting: true,
      cell: ({ row }) => <p className="text-right">-%</p>,
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
            {truncateHash(
              BeravaloperToEth(row.original.operatorAddress) as `0x${string}`,
            )}
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
  {
    accessorKey: "actions",
    header: () => <p className="text-center">Actions</p>,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      return (
        <div className="flex flex-row items-center justify-center gap-3">
          <Button
            size="sm"
            className="w-[100px]"
            onClick={(e) => {
              e.stopPropagation();
              router.push(
                `/stake/${BeravaloperToEth(
                  row?.original.operatorAddress,
                )}/redelegate`,
              );
            }}
          >
            Redelegate
          </Button>
          <UnbondButton
            inList
            validator={row?.original}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            validatorAddress={row.original.address}
          />
        </div>
      );
    },
  },
];
