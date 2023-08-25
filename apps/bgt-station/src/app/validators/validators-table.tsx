import React from "react";
import { useRouter } from "next/navigation";
import {
  BeravaloperToEth,
  cosmosvaloperToEth,
  formatter,
  truncateHash,
  usePollActiveValidators,
  usePollValidatorCuttingBoard,
  useTokens,
  type Validator,
} from "@bera/berajs";
import { IconList, SearchInput } from "@bera/shared-ui";
import { ValidatorIcon } from "@bera/shared-ui/src/validator-icon";
import { Icons } from "@bera/ui/icons";
import { formatUnits, type Address } from "viem";

import { formatCommission } from "~/utils/formatCommission";
import RT from "~/components/react-table";
import { general_validator_columns } from "~/columns/general-validator-columns";

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
      ? ""
      : gaugeDictionary[highestVotedGauge]?.name ??
        truncateHash(highestVotedGauge);
  return (
    <div className="flex h-full w-[141px] items-center justify-center">
      {value}
    </div>
  );
};
export default function ValidatorsTable() {
  const router = useRouter();
  const { useActiveValidators } = usePollActiveValidators();
  const validators = useActiveValidators();
  const [keyword, setKeyword] = React.useState("");

  const VP = ({ validator }: { validator: Validator }) => {
    const { usePercentageDelegated } = usePollActiveValidators();
    const percentageDelegated = usePercentageDelegated(
      cosmosvaloperToEth(validator.operatorAddress),
    );

    return (
      <div className="flex h-full w-24 items-center">
        {formatter.format(Number(formatUnits(BigInt(validator.tokens), 18)))} (
        {percentageDelegated?.toFixed(2)}%)
      </div>
    );
  };
  const validatorTableData = React.useMemo(() => {
    return validators
      ?.filter((validator) => !validator.jailed)
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
            <ValidatorIcon
              address={BeravaloperToEth(validator.operatorAddress)}
              className="h-8 w-8"
            />
            {validator.description.moniker}
          </div>
        ),
        votingPower: <VP validator={validator} />,
        commission: (
          <div className="flex h-full w-[91px] items-center justify-center">
            {formatCommission(validator.commission.commissionRates.rate)}%
          </div>
        ),
        vAPY: (
          <div className="flex h-full w-[67px] items-center justify-center">
            6.9%
          </div>
        ),
        mostWeightedGauge: (
          <ValidatorGauge
            address={BeravaloperToEth(validator.operatorAddress)}
          />
        ),
        bribes: (
          <div className="flex h-full w-[136px] items-center">
            <IconList
              showCount={4}
              iconList={[
                "/icons/eth-icons.svg",
                "/icons/atom-icons.svg",
                "/icons/usdc-icons.svg",
                "/icons/usdt-icons.svg",
                "/icons/btc-icons.svg",
                "/icons/honey-icons.svg",
                "/icons/bera-icons.svg",
              ]}
            />
          </div>
        ),
      }));
  }, [validators, keyword]);

  return (
    <div className="mt-16">
      <div className="mb-4">
        <SearchInput
          className="w-full md:w-[400px]"
          placeholder="Search by name, address, or token"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <RT
        columns={general_validator_columns}
        data={validatorTableData ?? []}
        rowOnClick={(row) =>
          router.push(`/validators/${BeravaloperToEth(row.original.address)}`)
        }
      />
    </div>
  );
}
