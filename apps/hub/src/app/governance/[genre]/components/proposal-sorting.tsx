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

import { OrderByEnum } from "../../types";

export const ProposalSorting = () => {
  const [sortBy, setSortBy] = React.useState(OrderByEnum.MOST_RECENT);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex w-fit cursor-pointer items-center rounded-full border border-border text-sm hover:bg-muted">
            <div className="flex h-10 w-[160px] items-center whitespace-nowrap border-r px-3 font-medium capitalize">
              {sortBy.replace("-", " ")}
            </div>
            <Icons.chevronDown className="ml-1 mr-2 h-4 w-4 text-foreground" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border border-border">
          <DropdownMenuLabel>Proposal Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.keys(OrderByEnum).map((order) => (
            <DropdownMenuCheckboxItem
              className="capitalize"
              key={order}
              checked={order === sortBy}
              onCheckedChange={() =>
                setSortBy(OrderByEnum[order as keyof typeof OrderByEnum])
              }
            >
              {OrderByEnum[order as keyof typeof OrderByEnum].replace("-", " ")}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
