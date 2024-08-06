import { useCallback, useMemo, useState } from "react";
import {
  usePollValidatorInfo,
  useUserValidators,
  type UserValidator,
  type Validator,
} from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";
import type { ColumnDef, TableState } from "@tanstack/react-table";

import {
  general_validator_columns,
  user_general_validator_columns,
} from "~/columns/general-validator-columns";

const VALIDATOR_PAGE_SIZE = 10;

export const AllValidator = ({
  user = false,
  keyword,
  isTyping,
  onRowClick,
}: {
  user?: boolean;
  keyword?: any;
  isTyping?: boolean;
  onRowClick?: any;
}) => {
  const [page, setPage] = useState(0);
  const [sorting, setSorting] = useState([{ id: "votingpower", desc: true }]);
  const handleNewSort = (newSort: any) => {
    if (newSort === sorting) return;
    setSorting(newSort);
  };
  const fetchData = useCallback(
    (state: TableState) => setPage(state?.pagination?.pageIndex),
    [setPage],
  );
  const {
    validatorInfoList,
    isLoading,
    isValidating,
    validatorCounts = 0,
  } = usePollValidatorInfo({
    sortBy: sorting[0]?.id as "commission" | "apy" | "votingpower" | undefined,
    sortOrder: sorting[0]?.desc ? "desc" : "asc",
    page: page + 1,
    pageSize: VALIDATOR_PAGE_SIZE,
    query: isTyping ? "" : keyword,
  });

  const {
    data = [],
    isLoading: isUserLoading,
    isValidating: isUserValidating,
  } = useUserValidators();

  const validators = useMemo(() => {
    if (user) {
      return validatorInfoList.map((validator: Validator) => {
        const uVali = data.find(
          (userValidator: UserValidator) =>
            userValidator.coinbase === validator.coinbase,
        );
        if (uVali) {
          return {
            ...validator,
            userStaked: uVali.userStaked,
            userQueued: uVali.userQueued,
            latestBlock: uVali.latestBlock,
            latestBlockTime: uVali.latestBlockTime,
          };
        }
        return {
          ...validator,
          userStaked: "0",
          userQueued: "0",
          latestBlock: "0",
          latestBlockTime: "0",
        };
      });
    }
    return validatorInfoList;
  }, [data, validatorInfoList]);

  return (
    <DataTable
      columns={
        (user
          ? (user_general_validator_columns as ColumnDef<UserValidator>[])
          : general_validator_columns) as ColumnDef<Validator>[]
      }
      data={validators}
      className="min-h-[600px] min-w-[1000px]"
      fetchData={fetchData}
      enablePagination
      loading={isLoading || isUserLoading}
      validating={isValidating || isUserValidating}
      additionalTableProps={{
        initialState: { pagination: { pageSize: VALIDATOR_PAGE_SIZE } },
        state: { sorting },
        pageCount: Math.ceil(validatorCounts / VALIDATOR_PAGE_SIZE),
        manualPagination: true,
      }}
      onRowClick={onRowClick}
      onCustomSortingChange={(a: any) => handleNewSort(a)}
    />
  );
};
