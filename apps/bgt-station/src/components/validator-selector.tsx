import { get } from "http";
import React, { useMemo } from "react";
import {
  usePollAccountDelegations,
  usePollActiveValidators,
  usePollDelegatorValidators,
  usePollGlobalValidatorBribes,
  usePollPrices,
  type PoLValidator,
  type Validator,
} from "@bera/berajs";
import { formatter } from "@bera/berajs/src/utils";
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

import { ValidatorGauge } from "~/app/validators/validators-table";
import { validator_table_columns } from "~/columns/validator-table-columns";

export default function ValidatorSelector({
  validatorAddress,
  onSelectValidator,
  showDelegated = false,
  filter,
}: // emptyMessage,
{
  validatorAddress?: string;
  onSelectValidator?: (address: string) => void;
  showDelegated?: boolean;
  filter?: Address[];
  // emptyMessage?: string;
}) {
  const { useActiveValidator } = usePollActiveValidators();

  const validValidator = useActiveValidator(validatorAddress);
  const [open, setOpen] = React.useState(false);

  const { useDelegatorValidators } = usePollDelegatorValidators(); // => this took to long
  const delegatedValidators: Validator[] | undefined = useDelegatorValidators();

  const { usePrices } = usePollPrices();
  const { data: prices } = usePrices();
  const { usePolValidators, useDelegatorPolValidators } =
    usePollGlobalValidatorBribes(prices);
  const validators = usePolValidators();
  const delegatorPolValidators = useDelegatorPolValidators(
    delegatedValidators?.map((d) => d.operatorAddr),
  );

  const filteredValidators = useMemo(
    () => (showDelegated ? delegatorPolValidators : validators),
    [validators, showDelegated, delegatorPolValidators, prices],
  );

  return (
    <div>
      <Button
        variant="outline"
        className="border-border bg-background shadow"
        onClick={() => setOpen(true)}
      >
        {validValidator ? (
          <div className="flex items-center gap-2 text-base font-medium leading-normal">
            <ValidatorIcon
              address={validValidator.operatorAddr as Address}
              description={validValidator?.description?.identity ?? undefined}
              className="h-8 w-8"
            />
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
        validators={
          filteredValidators?.filter(
            (vali: Validator) => !filter?.find((f) => f === vali.operatorAddr),
          ) ?? []
        }
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
}: // emptyMessage,
{
  onClose: () => void;
  open: boolean;
  validators: PoLValidator[];
  onSelect: (address: string) => void;
  // emptyMessage?: string;
}) => {
  const [search, setSearch] = React.useState("");

  const tableV = React.useMemo(
    () =>
      validators
        .filter(
          (validator) =>
            validator.description.moniker
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            validator.operatorAddr.toLowerCase().includes(search.toLowerCase()),
        )
        .map((validator: PoLValidator) => ({
          address: validator.operatorAddr,
          validator: (
            <div className="flex w-[100px] items-center gap-1">
              <ValidatorIcon
                address={validator.operatorAddr as Address}
                description={validator?.description?.identity ?? undefined}
                className="h-8 w-8"
              />
              {validator.description.moniker}
            </div>
          ),
          bgt_delegated: <BGTDelegated operatorAddr={validator.operatorAddr} />,
          voting_power: validator.tokens,
          vp: (
            <VP
              operatorAddr={validator.operatorAddr}
              tokens={validator.tokens}
            />
          ),
          commission: validator.commission.commissionRates.rate,
          vapy: validator.vApy.toFixed(2),
          mwg: <ValidatorGauge address={validator.operatorAddr} />,
          bribes:
            validator.bribeTokenList.length !== 0 ? (
              <TokenIconList showCount={3} tokenList={[]} />
            ) : (
              <p>No bribes</p>
            ),
        })),
    [validators, search],
  );

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
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <div className="hidden gap-2 md:flex ">
              <Button size="sm" variant="secondary">
                Filter by bribe
              </Button>
              <Button size="sm" variant="secondary">
                Filter by pool
              </Button>
            </div> */}
          </div>
          <DataTable
            columns={validator_table_columns}
            data={tableV}
            onRowClick={(value: any) => {
              onSelect(value.original.address);
              onClose();
            }}
            className="max-h-[500px] min-w-[1000px] overflow-y-scroll"
            // emptyMessage={emptyMessage}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const BGTDelegated = ({ operatorAddr }: { operatorAddr: string }) => {
  const { useSelectedAccountDelegation, isLoading } = usePollAccountDelegations(
    getAddress(operatorAddr),
  );
  const bgtDelegated = useSelectedAccountDelegation();
  return (
    <div className="flex h-full w-24 items-center justify-center">
      {isLoading
        ? "Loading"
        : bgtDelegated && Number(bgtDelegated) === 0
          ? "0 BGT"
          : `${Number(bgtDelegated ?? 0).toFixed(2)} BGT`}
    </div>
  );
};

export const VP = ({
  operatorAddr,
  tokens,
}: {
  operatorAddr: string;
  tokens: bigint;
}) => {
  const { usePercentageDelegated } = usePollActiveValidators();
  const percentageDelegated = usePercentageDelegated(operatorAddr);

  return (
    <div className="flex h-full w-full flex-shrink-0 items-center">
      {formatter.format(Number(formatUnits(tokens, 18)))} (
      {percentageDelegated?.toFixed(2)}%)
    </div>
  );
};
