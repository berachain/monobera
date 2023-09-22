import { AsesetCardMobile } from "~/app/portfolio/userAssets";
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
        className="hidden w-full min-w-[1200px] sm:block"
      />
      <div className="flex flex-col gap-8 px-6 py-8 sm:hidden">
        {positions.map((position, index) => (
          <AsesetCardMobile position={position} key={index} />
        ))}
      </div>
    </div>
  );
}
