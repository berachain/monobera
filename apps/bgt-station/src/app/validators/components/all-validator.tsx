import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Validator, ValidatorInfo, usePollValidatorInfo } from "@bera/berajs";
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
  const {
    validatorInfoDictionary,
    isLoading: isValidatorInfoLoading,
    isValidating: isValidatorInfoValidating,
  } = usePollValidatorInfo();

  // const fetchData = useCallback(
  //   (state: TableState) => setPage(state?.pagination?.pageIndex),
  //   [setPage],
  // );

  //@ts-ignore
  const validators: Validator = validatorList?.map((validator: Validator) => ({
    ...validator,
    //@ts-ignore
    ...(validatorInfoDictionary[validator.id] as ValidatorInfo),
  }));

  return (
    <DataTable
      //@ts-ignore
      columns={general_validator_columns as ColumnDef<Validator>[]}
      //@ts-ignore
      data={validators}
      className="min-w-[900px]"
      // fetchData={fetchData}
      // enablePagination
      loading={isValidatorInfoLoading}
      validating={isValidatorInfoValidating}
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
