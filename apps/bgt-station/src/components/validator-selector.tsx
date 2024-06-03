import { get } from "http";
import React, { useEffect, useMemo } from "react";
import { formatter, usePollValidators, type Validator } from "@bera/berajs";
import {
  DataTable,
  SearchInput,
  TokenIconList,
  ValidatorIcon,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { formatUnits, getAddress, type Address } from "viem";

import { validator_table_columns } from "~/columns/validator-table-columns";

export default function ValidatorSelector({
  validatorAddress = "0x",
  onSelectValidator,
  showDelegated = false,
  filter,
}: {
  validatorAddress?: Address;
  onSelectValidator?: (address: string) => void;
  showDelegated?: boolean;
  filter?: Address[];
}) {
  const [open, setOpen] = React.useState(false);
  const { validatorDictionary = {}, validatorList } = usePollValidators();
  //@ts-ignore
  const validValidator = validatorDictionary?.[validatorAddress];

  return (
    <div>
      <Button
        variant="outline"
        className="ml-3 min-w-[148px] whitespace-nowrap border-border bg-background shadow"
        onClick={() => setOpen(true)}
      >
        {validValidator ? (
          <div className="flex items-center gap-2 text-base font-medium leading-normal">
            <ValidatorIcon
              address={validValidator.id as Address}
              className="h-8 w-8"
            />
            {validValidator.name}
            <Icons.chevronDown className="relative h-3 w-3" />
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm font-medium leading-normal sm:text-base">
            Select Validator
            <Icons.chevronDown className="relative h-3 w-3" />
          </div>
        )}
      </Button>
      <ValidatorModal
        open={open}
        validators={validatorList}
        onSelect={(address) => onSelectValidator?.(address)}
        onClose={() => setOpen(false)}
        // emptyMessage={emptyMessage}
      />
    </div>
  );
}

const ValidatorModal = ({
  onClose,
  open,
  validators,
  onSelect,
}: {
  onClose: () => void;
  open: boolean;
  validators: any[];
  onSelect: (address: string) => void;
}) => {
  const [search, setSearch] = React.useState("");
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full justify-center sm:max-w-fit">
        <div className="flex w-[100vw] flex-col gap-4 p-6 lg:w-fit">
          <div className="text-lg font-semibold leading-7">
            Validator select
          </div>
          <div className="flex justify-between">
            <SearchInput
              placeholder="Search by name, address, or token"
              className="w-full md:w-[400px]"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>
          <DataTable
            columns={validator_table_columns}
            data={validators}
            onRowClick={(value: any) => {
              onSelect(value.original.id);
              onClose();
            }}
            className="max-h-[500px] min-w-[1000px] overflow-y-scroll"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
