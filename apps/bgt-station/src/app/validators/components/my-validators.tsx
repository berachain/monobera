import dynamic from "next/dynamic";
import { UserValidator, useUserActiveValidators, useUserValidators } from "@bera/berajs";
import type { ColumnDef } from "@tanstack/react-table";

import { user_general_validator_columns } from "~/columns/general-validator-columns";
import { TableLoading } from "./table-loading";

const DataTable = dynamic(
  () => import("@bera/shared-ui").then((mod) => mod.DataTable),
  {
    ssr: false,
    loading: () => <TableLoading />,
  },
);

export const MyValidator = ({
  keyword,
  onRowClick,
}: {
  keyword: any;
  onRowClick: any;
}) => {
  // const [page, setPage] = useState(0);
  // const fetchData = useCallback(
  //   (state: TableState) => setPage(state?.pagination?.pageIndex),
  //   [setPage],
  // );
  const { data } = useUserActiveValidators();

  const depositedValidators = data?.filter((validator: UserValidator) => {
    return parseFloat(validator.userStaked) !== 0;
  });

  return (
    <DataTable
      //@ts-ignore
      columns={user_general_validator_columns as ColumnDef<UserValidator>[]}
      data={depositedValidators ?? []}
      className="min-w-[900px]"
      // fetchData={fetchData}
      // enablePagination
      // loading={isLoading}
      // validating={isValidating}
      // additionalTableProps={{
      //   pageCount: 2,
      //   manualFiltering: true,
      //   manualSorting: true,
      //   manualPagination: true,
      // }}
      onRowClick={onRowClick}
    />
  );
};
