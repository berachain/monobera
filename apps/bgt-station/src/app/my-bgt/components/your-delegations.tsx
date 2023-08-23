import React from "react";
import { usePollDelegatorValidators, type Validator } from "@bera/berajs";

import ValidatorCard from "./validator-card";

export default function YourDelegations() {
  const { useDelegatorValidators } = usePollDelegatorValidators();
  // const [sort, setSort] =
  //  React.useState(
  //   ValidatorSortEnum.HIGHEST_VOTING_POWER,
  // );

  const validators = useDelegatorValidators();
  const validValidators = validators;
  // const validValidators = useMemo(
  //   () =>
  //     validators?.sort((a, b) => {
  //       switch (sort) {
  //         case ValidatorSortEnum.HIGHEST_VOTING_POWER:
  //           return Number(b.delegatorShares - a.delegatorShares);
  //         case ValidatorSortEnum.LOWEST_VOTING_POWER:
  //           return Number(a.delegatorShares - b.delegatorShares);
  //         case ValidatorSortEnum.MOST_BGT_DELEGATED:
  //           return Number(b.delegatorShares - a.delegatorShares);
  //         case ValidatorSortEnum.LEAST_BGT_DELEGATED:
  //           return Number(a.delegatorShares - b.delegatorShares);
  //         case ValidatorSortEnum.HIGHEST_COMMISION:
  //           return Number(b.commission) - Number(a.commission);
  //         case ValidatorSortEnum.LOWEST_COMMISION:
  //           return Number(a.commission) - Number(b.commission);
  //         case ValidatorSortEnum.HIGHEST_VAPY:
  //           return Number(b.commission) - Number(a.commission);
  //         case ValidatorSortEnum.LOWEST_VAPY:
  //           return Number(a.commission) - Number(b.commission);
  //         default:
  //           return 0;
  //       }
  //     }),
  //   [validators, sort],
  // );
  return (
    <div>
      <div className="mb-4 flex flex-col-reverse items-center  gap-4 md:flex-row md:justify-between">
        {/* <SearchInput
          className="w-full md:w-[400px]"
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Search by name, address, or token"
        /> */}
        {/* <div className="flex items-center gap-2 text-sm font-medium leading-[14px] text-muted-foreground md:w-[330px]">
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
        </div> */}
      </div>
      <div className="flex flex-col gap-3">
        {validValidators?.map((validator: Validator) => (
          <ValidatorCard
            validator={validator}
            key={validator.operatorAddress}
          />
        ))}
        {validValidators?.length === 0 && (
          <p className="mt-4 self-center text-xl font-semibold">
            No BGT Delegated.
          </p>
        )}
      </div>
    </div>
  );
}
