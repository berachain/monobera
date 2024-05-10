"use client";

import React, { useState, useContext } from "react";
import { DataTable } from "@bera/shared-ui";

import { ClosePositionModal } from "~/app/components/close-position-modal";
import { generatePositionColumns } from "~/app/components/table-columns/positions";
import { UpdatePositionModal } from "~/app/components/update-position-modal";
import { TableContext } from "~/context/table-context";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import type { IMarket } from "~/types/market";
import type { ICards, IOpenTrade, IRow } from "~/types/order-history";

export default function UserOpenPositions({ markets }: { markets: IMarket[] }) {
  const { tableState } = useContext(TableContext);
  const { useMarketOpenPositions } = usePollOpenPositions(tableState);
  const openPositions = useMarketOpenPositions(markets);
  const [updateOpen, setUpdateOpen] = useState<boolean | IOpenTrade>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean | IOpenTrade>(false);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 ">
      <div className="flex w-full flex-col items-start justify-between gap-2 pl-2 md:flex-row">
        <div className="flex-shrink-0 text-2xl font-semibold leading-loose">
          Open Positions
          <div className="text-xs font-medium leading-tight text-muted-foreground">
            {" "}
            Breakdown of your Open Positions
          </div>
        </div>
      </div>
      <UpdatePositionModal
        openPosition={updateOpen as IOpenTrade}
        controlledOpen={!!updateOpen}
        onOpenChange={setUpdateOpen}
      />
      <ClosePositionModal
        openPosition={deleteOpen as IOpenTrade}
        controlledOpen={!!deleteOpen}
        onOpenChange={setDeleteOpen}
      />
      <DataTable
        enablePagination
        columns={generatePositionColumns(markets, setUpdateOpen, setDeleteOpen)}
        data={openPositions ?? []}
        className="min-w-[1136px]"
      />
    </div>
  );
}

export function AsesetCardMobile({ card }: { card: ICards }) {
  return (
    <div className="flex flex-col gap-4 rounded-md border border-border bg-background p-4 lg:hidden">
      <p className="text-xs font-medium leading-tight">{card.title}</p>
      <div className="flex flex-col gap-1">
        {card.rows.map((row: IRow, index) => {
          return (
            <div key={index} className="flex w-full flex-row justify-between">
              <p className="text-xs leading-tight text-muted-foreground">
                {row.key}
              </p>
              {row.value}
            </div>
          );
        })}
      </div>
      {card.footer}
    </div>
  );
}
