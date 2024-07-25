import { SimpleTable, useAsyncTable } from "@bera/shared-ui";
import { type Address } from "viem";

import { validatorEventColumns } from "~/columns/validator-event-columns";

export const ValidatorEvents = ({
  validatorAddress,
}: {
  validatorAddress: Address;
}) => {
  // TODO: Fetch data
  const mockedData = [
    {
      eventType: "Event 1",
      timestamp: "2021-10-01 12:00:00",
      info: "Info 1",
    },
    {
      eventType: "Event 2",
      timestamp: "2021-10-01 12:00:00",
      info: "Info 2",
    },
    {
      eventType: "Event 3",
      timestamp: "2021-10-01 12:00:00",
      info: "Info 3",
    },
  ];
  const validatorEvents = useAsyncTable({
    fetchData: async () => {},
    columns: validatorEventColumns,
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
    <div className="mt-8">
      <SimpleTable
        table={validatorEvents}
        variant="ghost"
        wrapperClassName={"w-full"}
        flexTable
        dynamicFlex
        showToolbar={false}
      />
    </div>
  );
};
