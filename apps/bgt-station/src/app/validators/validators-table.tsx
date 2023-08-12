import React from "react";
import { useRouter } from "next/navigation";
import { usePollActiveValidators, type Validator } from "@bera/berajs";
import { SearchInput } from "@bera/shared-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Icons } from "@bera/ui/icons";
import { formatUnits } from "viem";

import { general_validator_columns } from "./columns/general-validator-columns";
import RT from "./components/react-table";

export default function ValidatorsTable() {
  const router = useRouter();
  const {
    useActiveValidators,
    useTotalDelegated,
    // useValidatorCuttingBoards,
    // useSelectedValidatorActiveBribes,
  } = usePollActiveValidators();

  const validators: Validator[] = useActiveValidators();
  const totalDelegated: number = useTotalDelegated();
  const [keyword, setKeyword] = React.useState("");
  const validatorTableData = React.useMemo(() => {
    return validators
      .filter((validator) => !validator.jailed)
      .filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(keyword.toLowerCase()),
        ),
      )
      .map((validator) => ({
        address: validator.operatorAddress,
        delegate: (
          <div
            className="w-[49px] hover:cursor-pointer"
            onClick={() => router.push("/delegate")}
          >
            <Icons.add className="relative mx-auto flex h-9 w-9 flex-col items-start justify-start rounded border border-border p-1" />
          </div>
        ),
        validator: (
          <div className="flex h-full w-[137px] items-center gap-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{validator.description.moniker}</AvatarFallback>
            </Avatar>
            {validator.description.moniker}
          </div>
        ),
        votingPower: (
          <div className="flex h-full w-[96px] items-center justify-center">
            {(
              (Number(formatUnits(validator.delegatorShares, 18)) * 100) /
              totalDelegated
            ).toFixed(2)}
            %
          </div>
        ),
        commission: (
          <div className="flex h-full w-[91px] items-center justify-center">
            {(
              Number(
                formatUnits(validator.commission.commissionRates.rate, 18),
              ) * 100
            ).toFixed(2)}
            %
          </div>
        ),
        vAPY: (
          <div className="flex h-full w-[67px] items-center justify-center">
            6.9%
          </div>
        ),
        mostWeightedGauge: (
          <div className="flex h-full w-[141px] items-center justify-center">
            Pool name or address
          </div>
        ),
        bribes: <div className="flex h-full w-[136px] items-center">hi</div>,
      }));
  }, [validators, keyword]);

  return (
    <div className="mt-16">
      <div className="mb-4">
        <SearchInput
          className="w-[400px]"
          placeholder="Search by name, address, or token"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <RT
        columns={general_validator_columns}
        data={validatorTableData}
        rowOnClick={(row) => router.push(`/validators/${row.original.address}`)}
      />
    </div>
  );
}
