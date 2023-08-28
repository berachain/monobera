"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  BeravaloperToEth,
  truncateHash,
  usePollGlobalValidatorBribes,
  usePollValidatorCuttingBoard,
  useTokens,
  type PoLValidator,
} from "@bera/berajs";
import { DataTable, SearchInput } from "@bera/shared-ui";
import { getAddress, type Address } from "viem";

import { general_validator_columns } from "~/columns/general-validator-columns";
import { usePollPrices } from "~/hooks/usePollPrices";

export const ValidatorGauge = ({ address }: { address: string }) => {
  const { useValidatorCuttingBoard } = usePollValidatorCuttingBoard(
    address as Address,
  );
  const cuttingBoard = useValidatorCuttingBoard();
  const highestVotedGauge = React.useMemo(() => {
    return cuttingBoard ? cuttingBoard[0].address : undefined;
  }, [cuttingBoard]);
  const { gaugeDictionary } = useTokens();
  const value =
    highestVotedGauge === undefined || gaugeDictionary === undefined
      ? "no gauges"
      : gaugeDictionary[getAddress(highestVotedGauge)]?.name ??
        truncateHash(highestVotedGauge);
  return (
    <div className="flex h-full w-[141px] items-center justify-center">
      {value}
    </div>
  );
};
export default function ValidatorsTable() {
  const router = useRouter();
  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const { usePolValidators, isLoading } = usePollGlobalValidatorBribes(prices);
  const [keyword, setKeyword] = React.useState("");
  const validators = usePolValidators();

  const filteredValidators = React.useMemo(() => {
    return validators?.filter((validator: PoLValidator) => {
      return (
        validator.description.moniker
          .toLowerCase()
          .includes(keyword.toLowerCase()) ||
        BeravaloperToEth(validator.operatorAddress)
          .toLowerCase()
          .includes(keyword.toLowerCase())
      );
    });
  }, [validators, keyword]);

  return (
    <div className="mt-16">
      <div className="mb-4">
        <SearchInput
          className="w-full md:w-[400px]"
          placeholder="Search by name or address"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div
          onClick={() =>
            router.push(
              `/validators/${BeravaloperToEth(
                `cosmosvaloper1gy3nz5n6k8uhm5yqsg6sss3hkzfhfpdgfup7mr`,
              )}`,
            )
          }
        >
          {" "}
          go 2
        </div>
      </div>
      {isLoading ? (
        <>loading...</>
      ) : (
        <DataTable
          columns={general_validator_columns}
          data={filteredValidators ?? []}
          onRowClick={(row: any) => {
            router.push(
              `/validators/${BeravaloperToEth(row.original.address)}`,
            );
            console.log(
              "hiiii",
              row.original.address,
              BeravaloperToEth(row.original.address),
            );
          }}
        />
      )}
    </div>
  );
}
