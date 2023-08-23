import React from "react";
import { useRouter } from "next/navigation";
import { BeravaloperToEth, usePollActiveValidators } from "@bera/berajs";
import { SearchInput } from "@bera/shared-ui";
import { ValidatorIcon } from "@bera/shared-ui/src/validator-icon";
import { Icons } from "@bera/ui/icons";
import { formatUnits } from "viem";

import { formatCommission } from "~/utils/formatCommission";
import IconList from "~/components/icon-list";
import RT from "~/components/react-table";
import { general_validator_columns } from "~/columns/general-validator-columns";

export default function ValidatorsTable() {
  const router = useRouter();
  const { useActiveValidators, useTotalDelegated } = usePollActiveValidators();

  const validators = useActiveValidators();
  const totalDelegated: number = useTotalDelegated();
  const [keyword, setKeyword] = React.useState("");
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
        votingPower: (
          <div className="flex h-full w-[96px] items-center justify-center">
            {(
              (Number(formatUnits(BigInt(validator?.tokens), 18)) * 100) /
              totalDelegated
            ).toFixed(2)}
            %
          </div>
        ),
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
          <div className="flex h-full w-[141px] items-center justify-center">
            ETH-10/BERA-20
          </div>
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
