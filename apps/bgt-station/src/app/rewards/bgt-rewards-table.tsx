import { DataTable } from "@bera/shared-ui";
import { user_bgt_columns } from "~/columns/user-bgt-columns";

export const BGTRewardsTable = () => {
  return (
    <div>
      <DataTable
        columns={user_bgt_columns as any}
        data={[]}
        className="max-h-[300px] min-w-[1000px] shadow"
        enablePagination
      />
    </div>
  );
};
