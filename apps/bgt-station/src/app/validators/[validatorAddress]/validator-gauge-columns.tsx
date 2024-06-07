import React from "react";
import { Validator, type Gauge } from "@bera/berajs";
import { DataTableColumnHeader, FormattedNumber } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { type ColumnDef } from "@tanstack/react-table";

import { BribesPopover } from "~/components/bribes-tooltip";
import { GaugeHeaderWidget } from "~/components/gauge-header-widget";

export const getValidatorGaugeColumns = (validator: Validator) => {
  const validatorGaugeColumns: ColumnDef<Gauge>[] = [
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
          tooltip={"Total value of active incentives outstanding on this vault"}
        />
      ),
      cell: ({ row }) => (
        <FormattedNumber
          symbol="USD"
          compact={false}
          compactThreshold={999_999_999}
          value={row.original.activeIncentivesInHoney}
        />
      ),
      accessorKey: "incentive-value",
      enableSorting: false,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="BGT Per Proposal"
          className="whitespace-nowrap"
          tooltip={
            "Amount of BGT per proposal sent by this validator to a vault"
          }
        />
      ),
      cell: ({ row }) => {
        const cuttingBoard = validator.cuttingBoard.weights.find(
          (cb) =>
            cb.receiver.toLowerCase() ===
            row.original.vaultAddress.toLowerCase(),
        );
        if (!cuttingBoard)
          return (
            <FormattedNumber
              className="w-full justify-start"
              symbol="BGT"
              compact={false}
              compactThreshold={999_999_999}
              value={0}
            />
          );
        const weight =
          parseFloat(cuttingBoard?.percentageNumerator) / 10000 ?? 0;
        const perProposal = weight * parseFloat(validator.rewardRate);

        return (
          <FormattedNumber
            className="w-full justify-start"
            symbol="BGT"
            compact={false}
            compactThreshold={999_999_999}
            showIsSmallerThanMin
            value={perProposal}
          />
        );
      },
      accessorKey: "bgt-staked",
      enableSorting: false,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Incentives"
          className="whitespace-nowrap"
          tooltip={
            "Incentives being emitted by this vault to attract BGT rewards"
          }
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <BribesPopover incentives={row.original.activeIncentives} />
          {/* <Button
            size="sm"
            variant="ghost"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(
                `/incentivize?gauge=${row.original.vaultAddress}`,
                "_self",
              );
            }}
          >
            Add
          </Button> */}
        </div>
      ),
      accessorKey: "incentives",
      enableSorting: false,
    },
  ];
  return validatorGaugeColumns;
};
