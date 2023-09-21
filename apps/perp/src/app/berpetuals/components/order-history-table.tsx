import { usePositions } from "~/hooks/usePositions";
import { positions_columns } from "./columns";
import { DataTable } from "./data-table";

export function OrderHistorTable() {
  const { generatepositionData } = usePositions();
  const positions = generatepositionData();
  return (
    <div className="relative w-full overflow-x-auto">
      <DataTable
        columns={positions_columns}
        data={positions.slice(0, 5) ?? []}
        className="w-full min-w-[1200px]"
      />
    </div>
  );
}
