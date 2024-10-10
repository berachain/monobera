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

import { StatusEnum } from "../../types";
import { ProposalStatus } from "@bera/graphql/governance";

export const ProposalStatusFilter = () => {
  const config = Object.keys(ProposalStatus).reduce(
    (acc, curr) => {
      acc[curr] = true;
      return acc;
    },
    {} as { [key: string]: boolean },
  );
  const [statusConfig, setStatusConfig] = React.useState(config);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex w-fit cursor-pointer items-center rounded-full border border-border text-sm hover:bg-muted">
            <div className="flex h-10 w-fit items-center border-r px-3 font-medium whitespace-nowrap">
              Filter by Status
            </div>
            <Icons.chevronDown className="ml-1 mr-2 h-4 w-4 text-foreground" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border border-border">
          <DropdownMenuLabel>Proposal Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.keys(StatusEnum).map((status) => (
            <DropdownMenuCheckboxItem
              className="capitalize"
              key={status}
              checked={statusConfig[status]}
              onCheckedChange={() =>
                setStatusConfig((prev) => ({
                  ...prev,
                  [status]: !prev[status],
                }))
              }
            >
              {StatusEnum[status as keyof typeof StatusEnum].replace("-", " ")}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
