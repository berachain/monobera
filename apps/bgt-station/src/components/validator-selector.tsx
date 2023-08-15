import React from "react";
import { usePollActiveValidators, type Validator } from "@bera/berajs";
import { SearchInput } from "@bera/shared-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";

import { validator_table_columns } from "~/columns/validator-table-columns";
import RT from "./react-table";

export default function ValidatorSelector({
  validatorAddress,
  onSelectValidator,
}: {
  validatorAddress?: string;
  onSelectValidator?: (address: string) => void;
}) {
  const { useActiveValidators } = usePollActiveValidators();
  const validators: Validator[] = useActiveValidators();
  const validValidator = validators.find(
    (validator) =>
      validator.operatorAddress.toLowerCase() ===
      validatorAddress?.toLowerCase(),
  );
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button
        variant="secondary"
        className="bg-background shadow"
        onClick={() => setOpen(true)}
      >
        {validValidator ? (
          <div className="flex items-center gap-2 text-base font-medium leading-normal">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="font-bold">
                validator avatar
              </AvatarFallback>
            </Avatar>
            {validValidator.description.moniker}
            <Icons.chevronDown className="relative h-3 w-3" />
          </div>
        ) : (
          <div className="flex items-center gap-2 text-base font-medium leading-normal">
            Select validator
            <Icons.chevronDown className="relative h-3 w-3" />
          </div>
        )}
      </Button>
      <ValidatorModal
        open={open}
        validators={validators}
        onSelect={(validator) => onSelectValidator(validator.original.address)}
        onClose={() => setOpen(false)}
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
  validators: Validator[];
  onSelect: (validator) => void;
}) => {
  const tableV = React.useMemo(
    () =>
      validators.map((validator: Validator) => ({
        address: validator.operatorAddress,
        validator: (
          <div className="flex w-[137px] items-center gap-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="font-bold">
                {validator.description.moniker}
              </AvatarFallback>
            </Avatar>
            {validator.description.moniker}
          </div>
        ),
        bgt_delegated: (
          <div className="flex h-full w-24 items-center justify-center">
            300
          </div>
        ),
        vp: <div className="flex h-full w-24 items-center">69.42M (0.69%)</div>,
        commission: (
          <div className="flex h-full w-[91px] items-center">20%</div>
        ),
        vapy: <div className="flex h-full w-[67px] items-center">6.9%</div>,
        mwg: (
          <div className="flex h-full w-[141px] items-center">
            Most weighted gauge, pool name
          </div>
        ),
        bribes: (
          <div className="flex w-[136px] items-center justify-center gap-1">
            bribs icon list
          </div>
        ),
      })),
    [validators],
  );
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className=" w-full  items-center justify-center gap-4 p-6">
        <div className="flex w-[1000px] flex-col  gap-4 ">
          <div className="text-lg font-semibold leading-7">
            Validator select
          </div>
          <div className="flex justify-between">
            <SearchInput
              placeholder="Search by name, address, or token"
              className="w-[400px]"
            />
            <div className="flex gap-2">
              <Button size="sm" variant="secondary">
                Filter by bribe
              </Button>
              <Button size="sm" variant="secondary">
                Filter by pool
              </Button>
            </div>
          </div>
          <RT
            columns={validator_table_columns}
            data={tableV}
            rowOnClick={(value) => {
              onSelect(value);
              onClose();
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
