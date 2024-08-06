import { useUserActiveValidators } from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";
import { user_incentives_columns } from "~/columns/general-validator-columns";

export const MyIncentivesTableTable = () => {
  const { data, isLoading } = useUserActiveValidators();

  return (
    <div>
      <DataTable
        columns={user_incentives_columns}
        loading={isLoading}
        data={data ? data.filter((v: any) => v.userStaked !== "0") : []}
        className="min-w-[800px] shadow"
      />
    </div>
  );
};
