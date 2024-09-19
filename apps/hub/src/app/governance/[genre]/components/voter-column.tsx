import { Vote } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import { Badge } from "@bera/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { formatEther } from "viem";

import { VoteEnum } from "../../types";
import { VoteInfo } from "./Voter";

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

export const VoterColumns: ColumnDef<Vote>[] = [
  {
    header: "Voter",
    cell: ({ row }) => <VoteInfo voter={row.original.voter} />,
    accessorKey: "voter",
    enableSorting: false,
  },
  {
    header: "Stance",
    cell: ({ row }) => (
      <Badge
        variant={getBadgeColor(row.original.type)}
        className="w-20 justify-center border-none px-2 py-1 text-sm capitalize"
      >
        {VoteEnum[row.original.type as keyof typeof VoteEnum]}
      </Badge>
    ),
    accessorKey: "stance",
    enableSorting: false,
  },
  {
    header: "BGT delegated",
    cell: ({ row }) => (
      <FormattedNumber
        value={formatEther(BigInt(row.original.amount))}
        visibleDecimals={2}
        symbol="BGT"
        className="text-sm font-medium"
      />
    ),
    accessorKey: "vp",
    sortingFn: (a, b) => Number(a.original.amount) - Number(b.original.amount),
    enableSorting: true,
  },
];
