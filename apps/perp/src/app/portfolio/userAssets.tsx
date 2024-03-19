"use client";

import React, { useState } from "react";
import { DataTable } from "@bera/shared-ui";

import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { ClosePositionModal } from "~/app/components/close-position-modal";
import { UpdatePositionModal } from "~/app/components/update-position-modal";
import type { IMarketOrder } from "../berpetuals/components/order-history";
import { getPositionColumns } from "../berpetuals/components/columns";
import type {
  ICards,
  IRow,
} from "../berpetuals/components/order-history-table";
import type { IMarket } from "../berpetuals/page";

export default function UserOpenPositions({ markets }: { markets: IMarket[] }) {
  const { useMarketOpenPositions } = usePollOpenPositions();
  const openPositions = useMarketOpenPositions(markets);
  const [updateOpen, setUpdateOpen] = useState<boolean | IMarketOrder>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean | IMarketOrder>(false);

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
        openPosition={updateOpen as IMarketOrder}
        controlledOpen={!!updateOpen}
        onOpenChange={setUpdateOpen}
      />
      <ClosePositionModal
        openPosition={deleteOpen as IMarketOrder}
        controlledOpen={!!deleteOpen}
        onOpenChange={setDeleteOpen}
      />
      <DataTable
        enablePagination
        columns={getPositionColumns(markets, setUpdateOpen, setDeleteOpen)}
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
