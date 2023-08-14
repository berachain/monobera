import React, { useMemo } from "react";
import { usePollActiveValidators, type Validator } from "@bera/berajs";
import { SearchInput } from "@bera/shared-ui";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";

import { ValidatorSortEnum } from "../types";
import ValidatorCard from "./validator-card";

export default function YourDelegations() {
  const { useActiveValidators } = usePollActiveValidators();
  const [sort, setSort] = React.useState(
    ValidatorSortEnum.HIGHEST_VOTING_POWER,
  );
  const [keywords, setKeywords] = React.useState("");
  const validators: Validator[] = useActiveValidators();

  const validValidators = useMemo(
    () =>
      validators
        .filter((validator) =>
          Object.values(validator).some((value) =>
            String(value).toLowerCase().includes(keywords.toLowerCase()),
          ),
        )
        .sort((a, b) => {
          switch (sort) {
            case ValidatorSortEnum.HIGHEST_VOTING_POWER:
              return Number(b.delegatorShares - a.delegatorShares);
            case ValidatorSortEnum.LOWEST_VOTING_POWER:
              return Number(a.delegatorShares - b.delegatorShares);
            case ValidatorSortEnum.MOST_BGT_DELEGATED:
              return Number(b.delegatorShares - a.delegatorShares);
            case ValidatorSortEnum.LEAST_BGT_DELEGATED:
              return Number(a.delegatorShares - b.delegatorShares);
            case ValidatorSortEnum.HIGHEST_COMMISION:
              return Number(b.commission) - Number(a.commission);
            case ValidatorSortEnum.LOWEST_COMMISION:
              return Number(a.commission) - Number(b.commission);
            case ValidatorSortEnum.HIGHEST_VAPY:
              return Number(b.commission) - Number(a.commission);
            case ValidatorSortEnum.LOWEST_VAPY:
              return Number(a.commission) - Number(b.commission);
            default:
              return 0;
          }
        }),
    [validators, keywords, sort],
  );
  return (
    <div>
      <div className="mb-4 flex justify-between">
        <SearchInput
          className="w-[400px]"
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Search by name, address, or token"
        />
        <div className="flex items-center gap-2 text-sm font-medium leading-[14px] text-stone-500">
          Order by
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex h-[30px] w-fit items-center justify-center gap-1 rounded-xl border border-border p-2 text-sm font-medium capitalize leading-[14px] text-foreground">
                {sort.replaceAll("-", " ")}
                <Icons.chevronDown className="relative h-3 w-3 text-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {Object.values(ValidatorSortEnum).map((vsort) => (
                <DropdownMenuCheckboxItem
                  checked={sort === vsort}
                  key={vsort}
                  onClick={() => setSort(vsort)}
                >
                  {vsort.replaceAll("-", " ")}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {validValidators.map((validator: Validator) => (
          <ValidatorCard
            validator={validator}
            key={validator.operatorAddress}
          />
        ))}
      </div>
    </div>
  );
}
