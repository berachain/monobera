import React from "react";
import { type Gauge, type ValidatorInfo } from "@bera/berajs";
import {
  DataTableColumnHeader,
  FormattedNumber,
  Tooltip,
  ValidatorIcon,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { type ColumnDef } from "@tanstack/react-table";

import { BribesPopover } from "~/components/bribes-tooltip";
import { GaugeHeaderWidget } from "~/components/gauge-header-widget";

export const global_gauge_weight_columns: ColumnDef<Gauge>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gauge Vaults" />
    ),
    cell: ({ row }) => (
      <GaugeHeaderWidget
        address={row.original.vaultAddress}
        className="w-[150px]"
      />
    ),
    accessorKey: "gauge",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Incentive Value"
        className="whitespace-nowrap"
        tooltip={"The total value of incentives in the gauge."}
      />
    ),
    cell: ({ row }) => (
      <FormattedNumber
        className="w-full justify-start"
        symbol="USD"
        compact={false}
        compactThreshold={999_999_999}
        value={row.original.activeIncentivesInHoney}
      />
    ),
    accessorKey: "activeIncentivesInHoney",
    enableSorting: true,
  },
  // {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="BGT Staked"
  //       className="whitespace-nowrap"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <FormattedNumber
  //       className="w-full justify-start"
  //       symbol="BGT"
  //       compact={false}
  //       compactThreshold={999_999_999}
  //       value={row.original.amountStaked}
  //     />
  //   ),
  //   accessorKey: "bgt-staked",
  //   enableSorting: false,
  // },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="BGT Capture"
        tooltip={"The percentage of global BGT captured by the gauge."}
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <FormattedNumber
        className="w-full justify-start"
        compact={false}
        compactThreshold={999_999_999}
        percent
        value={row.original.bgtInflationCapture / 10000 ?? 0}
      />
    ),
    accessorKey: "bgtInflationCapture",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Validators"
        tooltip={
          "The validators that are directing BGT emissions to this gauge."
        }
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="ml-[5px] flex flex-row items-center gap-1">
        {row.original.activeValidators.length > 3
          ? row.original.activeValidators
              .slice(0, 3)
              .map((validator: ValidatorInfo, index: number) => (
                <ValidatorIcon
                  imgOverride={validator.logoURI}
                  address={validator.id}
                  key={index}
                  className="ml-[-5px] cursor-pointer"
                  onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                    e.stopPropagation();
                    e.preventDefault();
                    window.open(`/validators/${validator.id}`, "_self");
                  }}
                />
              ))
          : row.original.activeValidators.map(
              (validator: ValidatorInfo, index: number) => (
                <ValidatorIcon
                  imgOverride={validator.logoURI}
                  address={validator.id}
                  key={index}
                  className="ml-[-5px] cursor-pointer"
                  onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                    e.stopPropagation();
                    e.preventDefault();
                    window.open(`/validators/${validator.id}`, "_self");
                  }}
                />
              ),
            )}
        {row.original.activeValidators.length > 3 && (
          <span>+{row.original.activeValidators.length - 3}</span>
        )}
      </div>
    ),
    accessorKey: "validators-emissions",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Incentives"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="flex w-full items-center justify-center gap-1">
        <BribesPopover incentives={row.original.activeIncentives} />
      </div>
    ),
    accessorKey: "incentives",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Deposit LP"
        className="whitespace-nowrap"
      />
    ),
    cell: () => (
      <Button size="sm" variant="ghost">
        Deposit
      </Button>
    ),
    accessorKey: "deposit-lp",
    enableSorting: false,
  },
];
