import React from "react";
import { formatter } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";
import { formatUnits } from "viem";

export interface GlobalGaugeColumnsV2 {
  gauge: JSX.Element;
  incentiveAmount: number;
  incentivePercentage: number;
}

export interface GlobalGaugeColumns {
  gauge: JSX.Element;
  incentiveAmount: number;
  incentivePercentage: number;
  tvl: number;
  hide: JSX.Element;
}
export interface UnbondingQueueColumns {
  validator: JSX.Element;
  unbondingAmount: bigint;
  timeRemaining: string;
  hide: JSX.Element;
}

export const global_gauge_weight_columns_v2: ColumnDef<GlobalGaugeColumnsV2>[] =
  [
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pool or Address" />
      ),
      cell: ({ row }) => (
        <div className="truncate whitespace-nowrap text-center">
          {row.original.gauge}
        </div>
      ),
      accessorKey: "gauge",
      enableSorting: false,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Estimated BGT/yr"
          className="w-full items-center justify-end text-center"
        />
      ),
      cell: ({ row }) => {
        const incentiveAmount = row.original.incentiveAmount;
        const incentivePercentage = row.original.incentivePercentage;
        return (
          <div className="flex w-full flex-row items-center justify-end">
            {" "}
            {formatter.format(incentiveAmount)} (
            {(incentivePercentage * 100).toFixed(2)}%)
          </div>
        );
      },
      accessorKey: "incentiveAmount",
      enableSorting: true,
    },
  ];

export const global_gauge_weight_columns: ColumnDef<GlobalGaugeColumns>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pool or Address" />
    ),
    cell: ({ row }) => (
      <div className="w-[250px] truncate whitespace-nowrap text-left">
        {row.original.gauge}
      </div>
    ),
    accessorKey: "gauge",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BGT Incentive" />
    ),
    cell: ({ row }) => {
      const incentiveAmount = row.original.incentiveAmount;
      const incentivePercentage = row.original.incentivePercentage;
      return (
        <div className="flex w-[120px] flex-row items-center">
          {" "}
          {formatter.format(incentiveAmount)} (
          {(incentivePercentage * 100).toFixed(2)}%)
        </div>
      );
    },
    accessorKey: "incentiveAmount",
    enableSorting: true,
  },
  // {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="TVL" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="flex w-[53px] gap-1">
  //       ${formatter.format(row.original.tvl)}
  //     </div>
  //   ),
  //   accessorKey: "tvl",
  //   enableSorting: true,
  // },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Hide"
        className="w-full items-center text-center"
      />
    ),
    cell: ({ row }) => (
      <div className="flex w-full justify-center">{row.original.hide}</div>
    ),
    accessorKey: "hide",
    enableSorting: false,
  },
];

// deprecated
export const unbonding_queue_columns: ColumnDef<UnbondingQueueColumns>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validator" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[150px] text-left">{row.original.validator}</div>
      );
    },
    accessorKey: "validator",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BGT Unbonding" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[100px]">
          {formatter.format(
            Number(formatUnits(row.original.unbondingAmount, 18)),
          )}{" "}
          BGT
        </div>
      );
    },
    accessorKey: "unbondingAmount",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time Remaining" />
    ),
    cell: ({ row }) => {
      return <div className="w-[120px]">{row.original.timeRemaining}</div>;
    },
    accessorKey: "timeRemaining",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cancel" />
    ),
    cell: ({ row }) => {
      return row.original.hide;
    },
    accessorKey: "hide",
    enableSorting: false,
  },
];
