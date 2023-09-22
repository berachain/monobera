import { AsesetCardMobile } from "~/app/portfolio/userAssets";
import { usePositions } from "~/hooks/usePositions";
import { orders_columns, positions_columns, history_columns, pnl_columns } from "./columns";
import { DataTable } from "./data-table";

export function OrderHistorTable({
  tab,
}: {
  tab: "positions" | "orders" | "history" | "pnl";
}) {
  const { generatepositionData } = usePositions();
  const positions = generatepositionData();

  return (
    <div className="relative w-full overflow-x-auto">
      {tab === "positions" && (
        <DataTable
          columns={positions_columns}
          data={positions.slice(0, 5) ?? []}
          className="hidden w-full min-w-[1200px] sm:block"
        />
      )}
      {tab === "orders" && (
        <DataTable
          columns={orders_columns}
          data={positions.slice(0, 2) ?? []}
          className="hidden w-full min-w-[1000px] sm:block"
        />
      )}
      {tab === "history" && (
        <DataTable
          columns={history_columns}
          data={positions.slice(0, 5) ?? []}
          className="hidden w-full min-w-[850px] sm:block"
        />
      )}
      {tab === "pnl" && (
        <DataTable
          columns={pnl_columns}
          data={positions.slice(0, 5) ?? []}
          className="hidden w-full min-w-[1200px] sm:block"
        />
      )}
      <div className="flex flex-col gap-8 px-6 py-8 sm:hidden">
        {positions.map((position, index) => (
          <AsesetCardMobile position={position} key={index} />
        ))}
      </div>
    </div>
  );
}
