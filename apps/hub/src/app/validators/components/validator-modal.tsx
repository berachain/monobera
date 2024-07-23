import React from "react";
import dynamic from "next/dynamic";
import {
  usePollValidatorInfo,
  useUserValidators,
  type Validator,
} from "@bera/berajs";
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

export const AllValidatorModal = ({
  keyword,
  onRowClick,
}: {
  keyword?: any;
  onRowClick?: any;
}) => {
  // const [page, setPage] = useState(0);
  const { data, isLoading } = useUserValidators();

  const filteredValidators = data?.filter((validator: Validator) => {
    return (
      validator.coinbase.toLowerCase().includes(keyword) ||
      validator.metadata?.name.toLowerCase().includes(keyword)
    );
  });

  return (
    <DataTable
      //@ts-ignore
      columns={user_general_validator_columns as ColumnDef<UserValidator>[]}
      //@ts-ignore
      data={filteredValidators ?? []}
      className="min-w-[900px]"
      // fetchData={fetchData}
      // enablePagination
      loading={isLoading}
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
