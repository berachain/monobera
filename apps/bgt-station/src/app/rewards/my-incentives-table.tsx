import { UserValidator, useUserValidators } from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";
import { user_incentives_columns } from "~/columns/general-validator-columns";

export const MyIncentivesTableTable = () => {
  const { data, isLoading } = useUserValidators();
  const depositedValidators = data?.filter((validator: UserValidator) => {
    return parseFloat(validator.userStaked) !== 0;
  });
  return (
    <div>
      <DataTable
        columns={user_incentives_columns}
        loading={isLoading}
        data={depositedValidators ?? []}
        className="min-w-[800px] shadow"
        enablePagination
      />
    </div>
  );
};
