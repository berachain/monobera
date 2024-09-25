import { useMemo } from "react";
import { useUserActiveValidators, type UserValidator } from "@bera/berajs";
import { SimpleTable, useAsyncTable } from "@bera/shared-ui";
import type { ColumnDef } from "@tanstack/react-table";

import { user_general_validator_columns } from "~/columns/general-validator-columns";

export const MyValidator = ({
  keyword,
  onRowClick,
}: {
  keyword?: any;
  onRowClick: any;
}) => {
  const { data = [], isLoading, isValidating } = useUserActiveValidators();
  const validators = useMemo(() => {
    return data.filter((validator: UserValidator) => {
      if (
        parseFloat(validator.userStaked) !== 0 ||
        parseFloat(validator.userQueued) !== 0
      ) {
        if (keyword === "") return true;
        if (validator.id.includes(keyword)) return true;
        if (validator.metadata?.name.includes(keyword)) return true;
      } else {
        return false;
      }
    });
  }, [data, keyword]);

  const allValidatorTable = useAsyncTable({
    fetchData: () => {},
    columns: user_general_validator_columns as ColumnDef<UserValidator>[],
    data: validators ?? [],
    enablePagination: false,
    additionalTableProps: {
      meta: {
        loading: isLoading,
        loadingText: "Loading...",
        validating: isValidating,
      },
    },
  });

  return (
    <SimpleTable
      table={allValidatorTable}
      flexTable
      variant="ghost"
      showToolbar={false}
      onRowClick={onRowClick}
      mutedBackgroundOnHead={false}
    />
  );
};
