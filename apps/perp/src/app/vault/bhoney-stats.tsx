"use client";

import Image from "next/image";
import {
  formatUsd,
  usePollBHoneyCollateralization,
  usePollBHoneyEpochs,
  usePollBHoneyPrice,
  usePollBHoneySupply,
  usePollHoneyVaultBalance,
} from "@bera/berajs";
import { Skeleton } from "@bera/ui/skeleton";

import { Epochs } from "./epochs";

const StatCard = ({
  title,
  value,
  isHoney,
  isLoading,
}: {
  title: string;
  value: string;
  isHoney?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <div className="flex w-full flex-col justify-between gap-1 rounded-xl border border-border px-6 py-4">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      {isLoading ? (
        <Skeleton className="h-[28px] w-1/2" />
      ) : (
        <div className="flex flex-row items-center gap-2 text-xl font-semibold leading-7">
          {value}{" "}
          {isHoney ? (
            <Image
              src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/honey.png"
              alt="Honey"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/bhoney.png"
              alt="Honey"
              width={20}
              height={20}
            />
          )}
        </div>
      )}
    </div>
  );
};
export const BhoneyStats = () => {
  const {
    isLoading: isHoneyVaultBalanceLoading,
    useFormattedHoneyVaultBalance,
  } = usePollHoneyVaultBalance();

  const { isLoading: isBHoneySupplyLoading, useFormattedBHoneySupply } =
    usePollBHoneySupply();
  const { isLoading: isBHoneyPriceLoading, useFormattedHoneyPrice } =
    usePollBHoneyPrice();

  const { isLoading: isBHoneyCollateralization, useBHoneyCollateralization } =
    usePollBHoneyCollateralization();

  const { isLoading: isEpochsLoading, useBHoneyEpoch } = usePollBHoneyEpochs();
  const isLoading =
    isBHoneySupplyLoading ||
    isHoneyVaultBalanceLoading ||
    isBHoneyPriceLoading ||
    isBHoneyCollateralization ||
    isEpochsLoading;

  const honeyLocked = useFormattedHoneyVaultBalance();
  const bHoneySupply = useFormattedBHoneySupply();
  const honeyPrice = useFormattedHoneyPrice();
  const collateralization = useBHoneyCollateralization();
  const epoch = useBHoneyEpoch();
  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-3 lg:gap-4">
      <div className="col-span-2 mb-4 grid w-full grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2 lg:mb-0">
        <StatCard
          title={"TVL"}
          value={formatUsd(honeyLocked)}
          isLoading={isLoading}
          isHoney={true}
        />
        <StatCard
          title={"bHONEY Price"}
          value={formatUsd(honeyPrice)}
          isLoading={isLoading}
          isHoney={false}
        />
        <StatCard
          title={"Collateralization Ratio"}
          value={`${collateralization.toFixed(2)}%`}
          isLoading={isLoading}
          isHoney={true}
        />
        <StatCard
          title={"bHONEY Supply"}
          value={bHoneySupply.toFixed(2)}
          isLoading={isLoading}
        />
      </div>
      <Epochs isLoading={isLoading} epoch={epoch} />
    </div>
  );
};
