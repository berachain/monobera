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
    case "for":
      return "success";
    case "against":
      return "destructive";
    case "abstain":
      return "secondary";
    default:
      return "secondary";
  }
};

export const voterColumns: ColumnDef<Vote>[] = [
  {
    header: "Voter",
    cell: ({ row }) => (
      <AccordionItem value={row.original.voter.address}>
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
        variant={getBadgeColor(row.original.type)}
        className="justify-center border-none px-2 py-1 text-sm capitalize"
      >
        {VoteEnum[row.original.type as keyof typeof VoteEnum]}
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
        value={formatEther(BigInt(row.original.amount))}
        visibleDecimals={2}
        symbol="BGT"
        className="text-sm font-medium"
      />
    ),
    size: 250,
    accessorKey: "vp",
    sortingFn: (a, b) => Number(a.original.amount) - Number(b.original.amount),
    enableSorting: true,
  },
];
