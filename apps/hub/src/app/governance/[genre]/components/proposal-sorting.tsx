import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";
import { OrderDirection, Proposal_OrderBy } from "@bera/graphql/governance";

export const ProposalSorting = ({
  value,
  setSortBy,
}: {
  value: {
    orderBy: Proposal_OrderBy;
    orderDirection: OrderDirection;
  };
  setSortBy: (sortBy: {
    orderBy: Proposal_OrderBy;
    orderDirection: OrderDirection;
  }) => void;
}) => {
  const options: {
    orderBy: Proposal_OrderBy;
    orderDirection: OrderDirection;
    label: string;
  }[] = [
    {
      orderBy: Proposal_OrderBy.CreatedAt,
      orderDirection: OrderDirection.Desc,
      label: "Most Recent",
    },
    {
      orderBy: Proposal_OrderBy.CreatedAt,
      orderDirection: OrderDirection.Asc,
      label: "Oldest",
    },
    {
      orderBy: Proposal_OrderBy.PollResultTotalVotersCount,
      orderDirection: OrderDirection.Desc,
      label: "Highest Participation",
    },
    {
      orderBy: Proposal_OrderBy.PollResultTotalVotersCount,
      orderDirection: OrderDirection.Asc,
      label: "Lowest Participation",
    },
  ];

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex w-fit cursor-pointer items-center rounded-full border border-border text-sm hover:bg-muted">
            <div className="flex h-10 w-[160px] items-center whitespace-nowrap border-r px-3 font-medium capitalize">
              {
                options.find(
                  (v) =>
                    v.orderBy === value.orderBy &&
                    v.orderDirection === value.orderDirection,
                )?.label
              }
            </div>
            <Icons.chevronDown className="ml-1 mr-2 h-4 w-4 text-foreground" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border border-border">
          <DropdownMenuLabel>Order By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {options.map((order) => (
            <DropdownMenuCheckboxItem
              className="capitalize"
              key={order.label}
              checked={
                order.orderBy === value.orderBy &&
                order.orderDirection === value.orderDirection
              }
              onCheckedChange={() => setSortBy(order)}
            >
              {order.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
