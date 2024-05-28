import { usePollValidators } from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";

import { user_incentives_columns } from "~/columns/user-incentives-columns";

export const MyIncentivesTableTable = () => {
  const { data, isLoading, isValidating } = usePollValidators();
  return (
    <div>
      <DataTable
        columns={user_incentives_columns as any}
        loading={isLoading}
        validating={isValidating}
        data={data ?? []}
        className="min-w-[800px] shadow"
        enablePagination
      />
    </div>
  );
};
