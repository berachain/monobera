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
    {
      eventType: "Event 4",
      timestamp: "2021-10-02 09:30:00",
      info: "Info 4",
    },
    {
      eventType: "Event 5",
      timestamp: "2021-10-02 14:45:00",
      info: "Info 5",
    },
    {
      eventType: "Event 6",
      timestamp: "2021-10-03 11:15:00",
      info: "Info 6",
    },
  ];

  const validatorEvents = useAsyncTable({
    fetchData: async () => {},
    columns: validatorEventColumns,
    data: mockedData ?? [],
    additionalTableProps: {
      manualSorting: false,
    },
  });

  return (
    <div className="mt-8">
      <SimpleTable
        table={validatorEvents}
        variant="ghost"
        wrapperClassName="w-full"
        flexTable
        dynamicFlex
        showToolbar={false}
        mutedBackgroundOnHead={false}
      />
    </div>
  );
};
