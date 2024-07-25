import { SimpleTable, useAsyncTable } from "@bera/shared-ui";
import { type Address } from "viem";
import { validatorIncentivesColumns } from "~/columns/validator-incentives-columns";

export const ValidatorIncentivesTable = ({ validatorAddress }) => {
    const total = Math.random() * 1000000 + 1000000
    const mockedData = [
        {
            earned: total/5 * 2,
            symbol: "BGT",
            value: total/5 * 2 * 3
        },
        {
            earned: total/5 * 2,
            symbol: "HONEY",
            value: total/5 * 2 * 3
        },
        {
            earned: total/5 * 1,
            symbol: "TOKEN",
            value: total/5 * 1 * 3
        },
      ];

      const incentivesTable = useAsyncTable({
        fetchData: async () => {},
        columns: validatorIncentivesColumns,
        data: mockedData ?? [],
        additionalTableProps: {
          manualSorting: false,
          //   meta: {
          //     loading: isLoading,
          //     loadingText: "Loading...",
          //     validating: isValidating,
          //   },
        },
      });

    return (
        <div className="">
          <SimpleTable
            table={incentivesTable}
            variant="ghost"
            wrapperClassName={"w-full"}
            flexTable
            dynamicFlex
            showToolbar={false}
          />
        </div>
      );
}