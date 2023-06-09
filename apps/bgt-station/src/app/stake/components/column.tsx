"use client";

import { useRouter } from "next/navigation";
import { truncateHash } from "@bera/berajs";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { type ColumnDef } from "@tanstack/react-table";

import BribesList from "~/components/bribes-list";
import UnbondButton from "../[validatorAddress]/components/UnbondButton";
import { validator } from "../data/validator";
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
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-gray-300" />
        <div className="flex flex-col">
          <p>{row.original.name}</p>
          <Badge variant="secondary">
            {truncateHash(row.original.address)}
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
    cell: ({}) => (
      <div className="flex flex-row justify-end">
        <BribesList />
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

export const yourColumns: ColumnDef<Validator>[] = [
  {
    accessorKey: "name",
    header: "Validator",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-gray-300" />
        <div className="flex flex-col">
          <p>{row.original.name}</p>
          <Badge variant="secondary">
            {truncateHash(row.original.address)}
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
          <p>{row.original.votingPower}</p>
          <span className="block w-full">0.69%</span>
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
              router.push(`/stake/${row.original.address}/redelegate`);
            }}
          >
            Redelegate
          </Button>
          <UnbondButton
            inList
            validator={validator}
            validatorAddress={row.original.address as any}
          />
        </div>
      );
    },
  },
];
