import React, { useEffect, useState } from "react";
import {
  BeravaloperToEth,
  truncateHash,
  usePollActiveValidators,
  type Validator,
} from "@bera/berajs";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@bera/ui/dialog";
import { Input } from "@bera/ui/input";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelectedValidator: (validator: Validator) => void;
  selectedValidators: string[];
  fromAddress: `0x{string}`;
};

export default function ValidatorDialog({
  open,
  onSelectedValidator,
  setOpen,
  selectedValidators,
  fromAddress,
}: Props) {
  const { useActiveValidators } = usePollActiveValidators();

  const [search, setSearch] = useState("");

  const validators = useActiveValidators();

  const [filteredValidators, setFilteredValidators] = useState<Validator[]>(
    validators.filter(
      (validator: Validator) =>
        BeravaloperToEth(validator.operatorAddress) !== fromAddress &&
        !selectedValidators?.some(
          (selectedValidatorAddress: string) =>
            selectedValidatorAddress ===
            BeravaloperToEth(validator.operatorAddress),
        ),
    ),
  );

  useEffect(() => {
    if (search.length !== 0) {
      const filteredValidators = validators.filter(
        (validator: Validator) =>
          validator.description.moniker
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          BeravaloperToEth(validator.operatorAddress)
            .toLowerCase()
            .includes(search.toLowerCase()),
      );

      setFilteredValidators(filteredValidators);
    }
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
            {filteredValidators.length
              ? filteredValidators.map((validator, i) => (
                  <ValidatorDialogRow
                    key={i}
                    validator={validator}
                    onValidatorSelect={onValidatorSelect}
                  />
                ))
              : "No validators found"}
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
          <h3 className="text-lg font-semibold">
            {validator.description.moniker}
          </h3>
          <Badge variant="secondary">
            {truncateHash(
              BeravaloperToEth(validator.operatorAddress) as `0x{string}`,
            )}
          </Badge>
        </div>
      </div>
    </Button>
  );
};
