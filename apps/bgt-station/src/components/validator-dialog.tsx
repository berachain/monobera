import React, { useEffect, useState } from "react";
import { truncateHash } from "@bera/berajs";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@bera/ui/dialog";
import { Input } from "@bera/ui/input";

import { validators, type Validator } from "~/app/stake/data/validators";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelectedValidator: (validator: Validator) => void;
  fromAddress: `0x{string}`;
};

export default function ValidatorDialog({
  open,
  onSelectedValidator,
  setOpen,
  fromAddress,
}: Props) {
  const [search, setSearch] = useState("");

  const [filteredValidators, setFilteredValidators] = useState<Validator[]>(
    validators.filter((v) => v.address !== fromAddress),
  );

  useEffect(() => {
    const filteredValidators = validators.filter(
      (validator) =>
        validator.name.toLowerCase().includes(search.toLowerCase()) ||
        validator.address.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredValidators(filteredValidators);
  }, [search]); // Include 'filteredValidators' in the dependency array

  const onValidatorSelect = (validator: Validator) => {
    onSelectedValidator(validator);
    setOpen(false);
    setSearch("");
  };

  const handleOpenChange = () => {
    if (open) {
      setSearch("");
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="px-4 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Validator search</DialogTitle>
          </DialogHeader>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or address"
          />
          <div className="grid gap-4 py-4">
            {filteredValidators.map((validator, i) => (
              <ValidatorDialogRow
                key={i}
                validator={validator}
                onValidatorSelect={onValidatorSelect}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

type RowProps = {
  validator: Validator;
  onValidatorSelect: (validator: Validator) => void;
};
const ValidatorDialogRow = ({ validator, onValidatorSelect }: RowProps) => {
  return (
    <Button
      variant="ghost"
      className="flex w-full items-center justify-start gap-2 px-2 text-left"
      onClick={() => {
        onValidatorSelect(validator);
      }}
    >
      <div className="my-6 flex items-center gap-2">
        <div className="h-12 w-12 rounded-full bg-gray-300" />
        <div>
          <h3 className="text-lg font-semibold">{validator.name}</h3>
          <Badge variant="secondary">{truncateHash(validator.address)}</Badge>
        </div>
      </div>
    </Button>
  );
};
