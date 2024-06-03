import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { type Validator, usePollValidatorInfo } from "@bera/berajs";
import type { ColumnDef } from "@tanstack/react-table";

import { general_validator_columns } from "~/columns/general-validator-columns";
import { TableLoading } from "./table-loading";

const DataTable = dynamic(
  () => import("@bera/shared-ui").then((mod) => mod.DataTable),
  {
    ssr: false,
    loading: () => <TableLoading />,
  },
);

export const AllValidator = ({ keyword }: { keyword: any }) => {
  // const [page, setPage] = useState(0);
  const router = useRouter();
  const { validatorInfoList, isLoading, isValidating } = usePollValidatorInfo();

  // const fetchData = useCallback(
  //   (state: TableState) => setPage(state?.pagination?.pageIndex),
  //   [setPage],
  // );

  return (
    <DataTable
      //@ts-ignore
      columns={general_validator_columns as ColumnDef<Validator>[]}
      //@ts-ignore
      data={validatorInfoList}
      className="min-w-[900px]"
      // fetchData={fetchData}
      // enablePagination
      loading={isLoading}
      validating={isValidating}
      // additionalTableProps={{
      //   pageCount: 2,
      //   manualFiltering: true,
      //   manualSorting: true,
      //   manualPagination: true,
      // }}
      onRowClick={(row: any) =>
        router.push(`/validators/${row.original.coinbase}`)
      }
    />
  );
};
