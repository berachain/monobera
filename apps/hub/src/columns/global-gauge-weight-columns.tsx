import React from "react";
import { type Gauge } from "@bera/berajs";
import { DataTableColumnHeader, FormattedNumber } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";

import { BribesPopover } from "~/components/bribes-tooltip";
import { GaugeHeaderWidget } from "~/components/gauge-header-widget";

export const GlobalGaugeWeightColumns: ColumnDef<Gauge>[] = [
  {
    header: "Gauge Vaults",
    cell: ({ row }) => (
      <GaugeHeaderWidget
        address={row.original.vaultAddress}
        // className="w-[150px]"
      />
    ),
    accessorKey: "gauge",
    enableSorting: false,
  },
  {
    header: "Total Incentive Value",
    cell: ({ row }) => (
      <FormattedNumber
        className="justify-start pl-2"
        symbol="USD"
        compact={false}
        compactThreshold={999_999_999}
        value={row.original.activeIncentivesInHoney}
      />
    ),
    meta: {
      tooltip: "The total value of incentives in the gauge.",
      headerClassname: "flex-initial whitespace-nowrap",
    },
    accessorKey: "activeIncentivesInHoney",
    enableSorting: true,
  },
  {
    header: "BGT Capture",
    cell: ({ row }) => (
      <FormattedNumber
        className="pl-2 justify-start"
        compact={false}
        compactThreshold={999_999_999}
        percent
        value={row.original.bgtInflationCapture / 10000 ?? 0}
      />
    ),
    meta: {
      tooltip: "The percentage of global BGT captured by the gauge.",
      headerClassname: "flex-initial whitespace-nowrap",
    },
    accessorKey: "bgtInflationCapture",
    // TODO: fix sorting for bgtInflationCapture
    // enableSorting: true,
  },
  // {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Validators"
  //       tooltip={
  //         "The validators that are directing BGT emissions to this gauge."
  //       }
  //       className="whitespace-nowrap"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="ml-[5px] flex flex-row items-center gap-1">
  //       {row.original.activeValidators.length > 3
  //         ? row.original.activeValidators
  //             .slice(0, 3)
  //             .map((validator: ValidatorInfo, index: number) => (
  //               <ValidatorIcon
  //                 imgOverride={validator.logoURI}
  //                 address={validator.id}
  //                 key={index}
  //                 className="ml-[-5px] cursor-pointer"
  //                 onClick={(e: React.MouseEvent<HTMLImageElement>) => {
  //                   e.stopPropagation();
  //                   e.preventDefault();
  //                   window.open(`/validators/${validator.id}`, "_self");
  //                 }}
  //               />
  //             ))
  //         : row.original.activeValidators.map(
  //             (validator: ValidatorInfo, index: number) => (
  //               <ValidatorIcon
  //                 imgOverride={validator.logoURI}
  //                 address={validator.id}
  //                 key={index}
  //                 className="ml-[-5px] cursor-pointer"
  //                 onClick={(e: React.MouseEvent<HTMLImageElement>) => {
  //                   e.stopPropagation();
  //                   e.preventDefault();
  //                   window.open(`/validators/${validator.id}`, "_self");
  //                 }}
  //               />
  //             ),
  //           )}
  //       {row.original.activeValidators.length > 3 && (
  //         <span>+{row.original.activeValidators.length - 3}</span>
  //       )}
  //     </div>
  //   ),
  //   accessorKey: "validators-emissions",
  //   enableSorting: false,
  // },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Incentives"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="justify-left flex w-full items-center gap-1">
        <BribesPopover incentives={row.original.activeIncentives} />
      </div>
    ),
    accessorKey: "incentives",
    enableSorting: false,
  },
  {
    header: "",
    cell: () => <div className="text-lg text-muted-foreground">&gt;</div>,
    accessorKey: "deposit-lp",
    enableSorting: false,
    minSize: 40,
    size: 40,
  },
];
