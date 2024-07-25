import { SimpleTable, useAsyncTable } from "@bera/shared-ui";
import { type Address } from "viem";

import { delegatedAddressColumns } from "~/columns/delegated-address-columns";

export const DelegatedAddressTable = ({ validatorAddress }) => {
  const mockedData = [
    {
      address: "0x12s192n....a21Da1xa",
      bgt: "124,215.14",
    },
    {
      address: "0x12s192n....a21Da1xa",
      bgt: "124,215.14",
    },
    {
      address: "0x12s192n....a21Da1xa",
      bgt: "124,215.14",
    },
  ];

  const delegatedAddress = useAsyncTable({
    fetchData: async () => {},
    columns: delegatedAddressColumns,
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
        table={delegatedAddress}
        variant="ghost"
        wrapperClassName={"w-full"}
        flexTable
        dynamicFlex
        showToolbar={false}
      />
    </div>
  );
};
