"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  truncateHash,
  useGauges,
  usePollGlobalValidatorBribes,
  usePollValidatorCuttingBoard,
  type PoLValidator,
} from "@bera/berajs";
import { blockExplorerUrl, cloudinaryUrl } from "@bera/config";
import { DataTable, SearchInput } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Skeleton } from "@bera/ui/skeleton";
import { getAddress, type Address } from "viem";

import { OTHERS_GAUGES } from "~/components/global-gauge-weight-chart";
import { general_validator_columns } from "~/columns/general-validator-columns";

export const GaugeIcon = ({
  address,
  className,
}: {
  address: string;
  className?: string;
}) => {
  const { gaugeDictionary } = useGauges();

  return (
    <Avatar className={cn("h-5 w-5", className)}>
      <AvatarImage
        src={
          address !== OTHERS_GAUGES && gaugeDictionary
            ? gaugeDictionary[getAddress(address)]?.logoURI
            : ""
        }
        className="rounded-full"
      />
      <AvatarFallback>
        {/* DARK MODE */}
        <Image
          src={`${cloudinaryUrl}/shared/s8kfq1dupk8buydgjxdf`}
          width={100}
          height={100}
          className="hidden h-full w-full dark:block"
          alt={"gauge-icon"}
        />
        {/* LIGHT MODE  */}
        <Image
          src={`${cloudinaryUrl}/shared/ocaxgutrs2voe8umwxxc`}
          width={100}
          height={100}
          className="block h-full w-full dark:hidden"
          alt={"gauge-icon"}
        />
      </AvatarFallback>
    </Avatar>
  );
};

export const GaugeCategoryIcon = ({
  address,
  className,
}: {
  address: string;
  className?: string;
}) => {
  const { gaugeDictionary } = useGauges();

  return (
    <Avatar className={cn("h-5 w-5", className)}>
      <AvatarImage
        src={
          gaugeDictionary
            ? gaugeDictionary[getAddress(address)]?.categoryIcon
            : ""
        }
        className="rounded-lg"
      />
      <AvatarFallback>
        {/* DARK MODE */}
        <Image
          src={`${cloudinaryUrl}/shared/s8kfq1dupk8buydgjxdf`}
          width={100}
          height={100}
          className="hidden h-full w-full rounded-md dark:block"
          alt={"gauge-icon"}
        />
        {/* LIGHT MODE  */}
        <Image
          src={`${cloudinaryUrl}/shared/ocaxgutrs2voe8umwxxc`}
          width={100}
          height={100}
          className="block h-full w-full rounded-md dark:hidden"
          alt={"gauge-icon"}
        />
      </AvatarFallback>
    </Avatar>
  );
};
export const ValidatorGauge = ({ address }: { address: string }) => {
  const { useValidatorCuttingBoard } = usePollValidatorCuttingBoard(
    address as Address,
  );
  const cuttingBoard = useValidatorCuttingBoard();
  const highestVotedGauge = React.useMemo(() => {
    return cuttingBoard ? cuttingBoard[0].receiver : undefined;
  }, [cuttingBoard]);
  const { gaugeDictionary } = useGauges();

  return (
    <>
      {highestVotedGauge === undefined || gaugeDictionary === undefined ? (
        "no gauges"
      ) : (
        <Link
          className="flex  h-full w-[160px] items-center justify-start gap-2"
          href={`${blockExplorerUrl}/address/${getAddress(highestVotedGauge)}`}
          target="_blank"
          onClick={(e) => e.stopPropagation()}
        >
          <GaugeIcon address={highestVotedGauge} />
          <span className=" hover:underline">
            {gaugeDictionary[getAddress(highestVotedGauge)]?.name ??
              truncateHash(highestVotedGauge)}
          </span>
        </Link>
      )}
    </>
  );
};
export default function ValidatorsTable() {
  const router = useRouter();
  const prices = undefined;
  const { usePolValidators, isLoading } = usePollGlobalValidatorBribes(prices);
  const [keyword, setKeyword] = React.useState("");
  const validators = usePolValidators();

  const filteredValidators = React.useMemo(() => {
    return validators
      ?.sort(
        (a: PoLValidator, b: PoLValidator) =>
          Number(b.tokens) - Number(a.tokens),
      )
      .filter((validator: PoLValidator) => {
        return (
          validator.description.moniker
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          validator.operatorAddr.toLowerCase().includes(keyword.toLowerCase())
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
      </div>
      {isLoading ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : (
        <DataTable
          columns={general_validator_columns}
          data={filteredValidators ?? []}
          className="min-w-[900px]"
          onRowClick={(row: any) =>
            router.push(`/validators/${row.original.operatorAddr}`)
          }
        />
      )}
    </div>
  );
}
