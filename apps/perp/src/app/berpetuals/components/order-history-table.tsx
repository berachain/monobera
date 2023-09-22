import { AsesetCardMobile } from "~/app/portfolio/userAssets";
import { usePositions } from "~/hooks/usePositions";
import { positions_columns } from "./columns";
import { DataTable } from "./data-table";

export function OrderHistorTable() {
  const { generatepositionData } = usePositions();
  const positions = generatepositionData();
  const getDataTable = (type: "positions" | "orders" | "history" | "pnl") => {
    if (type === "positions") {
      return (
        <DataTable
          columns={positions_columns}
          data={positions.slice(0, 5) ?? []}
          className="hidden w-full min-w-[1200px] sm:block"
        />
      );
    } else if (type === "orders") {
      return (
        <DataTable
          columns={positions_columns}
          data={positions.slice(0, 5) ?? []}
          className="hidden w-full min-w-[1200px] sm:block"
        />
      );
    } else if (type === "history") {
      return (
        <DataTable
          columns={positions_columns}
          data={positions.slice(0, 5) ?? []}
          className="hidden w-full min-w-[1200px] sm:block"
        />
      );
    } else if (type === "pnl") {
      return (
        <DataTable
          columns={positions_columns}
          data={positions.slice(0, 5) ?? []}
          className="hidden w-full min-w-[1200px] sm:block"
        />
      );
    } else {
      return <></>;
    }
  };
  return (
    <div className="relative w-full overflow-x-auto">
      {getDataTable("positions")}
      <div className="flex flex-col gap-8 px-6 py-8 sm:hidden">
        {positions.map((position, index) => (
          <AsesetCardMobile position={position} key={index} />
        ))}
      </div>
    </div>
  );
}
