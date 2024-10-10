import { Vote } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import { Badge } from "@bera/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { formatEther } from "viem";

import { VoteEnum } from "../../types";
import { VoteInfo } from "./Voter";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";

const getBadgeColor = (type: keyof typeof VoteEnum) => {
  switch (type) {
    case "FOR":
      return "success";
    case "AGAINST":
      return "destructive";
    case "ABSTAIN":
      return "secondary";
    default:
      return "secondary";
  }
};

export const voterColumns = [
  {
    header: "Voter",
    cell: ({ row }) => (
      <AccordionItem value={row.original.voter}>
        <AccordionTrigger className="!justify-start">
          <VoteInfo voter={row.original.voter} />
        </AccordionTrigger>
        <AccordionContent className="ml-7">
          {row.original.reason ? (
            <p className="m">{row.original.reason}</p>
          ) : (
            <span className="italic text-muted-foreground">
              No reason provided
            </span>
          )}
        </AccordionContent>
      </AccordionItem>
    ),
    accessorKey: "voter",
    enableSorting: false,
    minSize: 200,
  },
  {
    header: "Stance",
    meta: {
      className: "!min-w-8 grow-0 sm:!min-w-12",
    },
    cell: ({ row }) => (
      <Badge
        variant={getBadgeColor(row.original.support)}
        className="justify-center border-none px-2 py-1 text-sm capitalize"
      >
        {VoteEnum[row.original.support as keyof typeof VoteEnum]}
      </Badge>
    ),
    minSize: 100,
    size: 120,
    accessorKey: "stance",
    enableSorting: false,
  },
  {
    header: "BGT delegated",
    meta: {
      className: "grow-0",
    },
    cell: ({ row }) => (
      <FormattedNumber
        value={formatEther(BigInt(row.original.weight))}
        visibleDecimals={2}
        symbol="BGT"
        className="text-sm font-medium"
      />
    ),
    size: 250,
    accessorKey: "vp",
    sortingFn: (a, b) => Number(a.original.weight) - Number(b.original.weight),
    enableSorting: true,
  },
] satisfies ColumnDef<Vote>[];
