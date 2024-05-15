import { DataTable } from "@bera/shared-ui";
import { user_incentives_columns } from "~/columns/user-incentives-columns";

export const MyIncentivesTableTable = () => {
  return (
    <div>
      <DataTable
        columns={user_incentives_columns as any}
        data={[]}
        className="max-h-[300px] min-w-[1000px] shadow"
        enablePagination
      />
    </div>
  );
};
