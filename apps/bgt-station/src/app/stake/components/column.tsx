"use client";

import { truncateHash } from "@bera/berajs";
import { type ColumnDef } from "@tanstack/react-table";

import { type Validator } from "../data/validators";

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
const uniqueColors = getRandomUniqueItems(colors, 5);
const uniquePercents = getRandomUniqueItems(percents, 5);

export const columns: ColumnDef<Validator>[] = [
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
    accessorKey: "name",
    header: "Validator",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <p>{row.original.name}</p>
        <p>{truncateHash(row.original.validatorAddress as `0x${string}`)}</p>
      </div>
    ),
  },
  {
    accessorKey: "votingPower",
    header: "Voting power",
    enableSorting: true,
    cell: ({ row }) => {
      const cuttingBoard = row.original.cuttingBoard;
      return (
        <>
          <p>{row.original.votingPower}</p>
          <span className="block w-full">
            {cuttingBoard.map((_, i) => (
              <span
                key={i}
                className={`inline-block ${uniqueColors[i]} ${uniquePercents[i]} h-2`}
              />
            ))}
          </span>
        </>
      );
    },
  },
  {
    accessorKey: "commission",
    header: () => <p className="text-right">Commission</p>,
    enableSorting: true,
    cell: ({ row }) => <p className="text-right">{row.original.commission}%</p>,
  },
  {
    accessorKey: "bribes",
    header: () => <p className="text-right">Bribes</p>,
    cell: ({ row }) => (
      <div className="flex flex-row justify-end">
        {row.original.bribes.map((bribe) => (
          <div
            key={bribe}
            className="ml-[-15px] h-10 w-10 rounded-full border-2 border-white bg-gray-300"
          />
        ))}
      </div>
    ),
  },
  {
    accessorKey: "bribeAPR",
    header: () => <p className="text-right">Bribe APR</p>,
    enableSorting: true,
    cell: ({ row }) => <p className="text-right">{row.original.bribeAPR}%</p>,
  },
];
