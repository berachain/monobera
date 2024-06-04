import React from "react";
import { usePollValidatorInfo } from "@bera/berajs";
import { SearchInput, TokenIconList, ValidatorIcon } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { type Address } from "viem";

import { AllValidator } from "~/app/validators/components/all-validator";
import { MyValidator } from "~/app/validators/components/my-validators";

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
  const { validatorInfoDictionary } = usePollValidatorInfo();
  //@ts-ignore
  const validValidator = validatorInfoDictionary?.[validatorAddress];

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
            {validValidator.metadata.name}
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
        unbond={showDelegated}
        onClose={() => setOpen(false)}
        onSelect={(address) => onSelectValidator?.(address)}
      />
    </div>
  );
}

const ValidatorModal = ({
  open,
  unbond,
  onClose,
  onSelect,
}: {
  open: boolean;
  unbond?: boolean;
  onClose: () => void;
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
          {unbond ? (
            <MyValidator
              keyword={search}
              onRowClick={(row: any) => {
                onSelect(row.original.coinbase);
                onClose();
              }}
            />
          ) : (
            <AllValidator
              keyword={search}
              onRowClick={(row: any) => {
                onSelect(row.original.coinbase);
                onClose();
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
