import {
  truncateHash,
  usePollValidatorBgtBoost,
  type UserValidatorBoostDeposited,
  type UserValidatorBoostQueued,
} from "@bera/berajs";
import { SimpleTable, useAsyncTable } from "@bera/shared-ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { type ColumnDef } from "@tanstack/react-table";
import { type Address } from "viem";

export const userValidatorBoostQueuedColumns: ColumnDef<UserValidatorBoostQueued>[] =
  [
    {
      header: "Address",
      accessorKey: "user",
      cell: ({ row }) => <span>{truncateHash(row.original.user, 6, 4)}</span>,
      enableSorting: false,
    },
    {
      header: "Boost (BGT)",
      accessorKey: "amountQueued",
      enableSorting: false,
    },
  ];

export const userValidatorBoostDepositedColumns: ColumnDef<UserValidatorBoostDeposited>[] =
  [
    {
      header: "Address",
      accessorKey: "user",
      cell: ({ row }) => <span>{truncateHash(row.original.user, 6, 4)}</span>,
      enableSorting: false,
    },
    {
      header: "Boost (BGT)",
      accessorKey: "amountDeposited",
      enableSorting: false,
    },
  ];

export const DelegatedAddressTable = ({
  validatorAddress,
}: {
  validatorAddress: string;
}) => {
  const { data, isLoading } = usePollValidatorBgtBoost(
    validatorAddress as Address,
  );

  const userValidatorBoostQueued = useAsyncTable({
    fetchData: async () => {},
    columns: userValidatorBoostQueuedColumns,
    data: data?.userValidatorBoostQueued ?? [],
    additionalTableProps: {
      manualSorting: false,
      meta: {
        loading: isLoading,
        loadingText: "Loading...",
      },
    },
  });

  const userValidatorBoostDeposited = useAsyncTable({
    fetchData: async () => {},
    columns: userValidatorBoostDepositedColumns,
    data: data?.userValidatorBoostDeposited ?? [],
    additionalTableProps: {
      manualSorting: false,
      meta: {
        loading: isLoading,
        loadingText: "Loading...",
      },
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <span className="text-md font-semibold">Delegated Addresses</span>

      <Tabs className="mb-4" defaultValue="delegated">
        <TabsList variant="ghost" className="mb-4">
          <TabsTrigger value="delegated">Top 10 Delegated</TabsTrigger>
          <TabsTrigger value="queued">Top 10 Queued</TabsTrigger>
        </TabsList>
        <TabsContent value="delegated">
          <SimpleTable
            table={userValidatorBoostDeposited}
            // variant="ghost"
            wrapperClassName={"w-full"}
            flexTable
            dynamicFlex
            showToolbar={false}
          />
        </TabsContent>
        <TabsContent value="queued">
          <SimpleTable
            table={userValidatorBoostQueued}
            // variant="ghost"
            wrapperClassName={"w-full "}
            flexTable
            dynamicFlex
            showToolbar={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
