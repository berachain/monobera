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
import { FormattedNumber } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";
import { Icons } from "@bera/ui/icons";

import { Epochs } from "./epochs";
import { bhoneyVaultContractAddress, blockExplorerUrl } from "@bera/config";

const StatCard = ({
  title,
  value,
  isHoney,
  isBHoney,
  isLoading,
}: {
  title: string | JSX.Element;
  value: string | JSX.Element;
  isHoney?: boolean;
  isBHoney?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <div className="flex w-full flex-col justify-between gap-1 rounded-md border border-border px-6 py-4">
      {typeof title === "string" ? (
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      ) : (
        title
      )}
      {isLoading ? (
        <Skeleton className="h-[28px] w-1/2" />
      ) : (
        <div className="flex flex-row items-center gap-2 text-xl font-semibold leading-7">
          {value}{" "}
          {isHoney && (
            <Image
              src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/honey.png"
              alt="Honey"
              width={20}
              height={20}
            />
          )}
          {isBHoney && (
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
  const { isLoading: isBHoneyPriceLoading, useHoneyPrice } =
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
  const honeyPrice = useHoneyPrice();
  const collateralization = useBHoneyCollateralization();
  const epoch = useBHoneyEpoch();

  const bHoneyTitle = (
    <div className="mt-2 flex flex-row gap-1">
      <div
        className="text-sm font-semibold hover:underline cursor-pointer"
        onClick={() =>
          window.open(
            `${blockExplorerUrl}/address/${bhoneyVaultContractAddress}`,
            "_blank",
          )
        }
      >
        bHONEY Price
      </div>
      <Icons.external className="mt-1 h-4 w-4" />
    </div>
  );
  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-3 lg:gap-4">
      <div className="col-span-2 mb-4 grid w-full grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2 lg:mb-0">
        <StatCard
          title={"TVL"}
          value={
            <FormattedNumber
              value={honeyLocked}
              compact={false}
              compactThreshold={999_999_999_999}
            />
          }
          isLoading={isLoading}
          isHoney={true}
        />
        <StatCard
          title={bHoneyTitle}
          value={
            <FormattedNumber
              value={honeyPrice}
              compact={false}
              compactThreshold={999_999_999_999}
            />
          }
          isLoading={isLoading}
          isBHoney
        />
        <StatCard
          title={"Collateralization Ratio"}
          value={`${collateralization.toFixed(2)}%`}
          isLoading={isLoading}
        />
        <StatCard
          title={"bHONEY Supply"}
          value={
            <FormattedNumber
              value={bHoneySupply}
              compact={false}
              compactThreshold={999_999_999_999}
            />
          }
          isBHoney
          isLoading={isLoading}
        />
      </div>
      <Epochs isLoading={isLoading} epoch={epoch} />
    </div>
  );
};
