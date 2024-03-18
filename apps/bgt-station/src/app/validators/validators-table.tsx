"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  truncateHash,
  useGauges,
  usePollValidatorCuttingBoard,
} from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { DataTable, SearchInput } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Skeleton } from "@bera/ui/skeleton";
import { getAddress, type Address } from "viem";

import { OTHERS_GAUGES } from "~/components/global-gauge-weight-chart";
import { general_validator_columns } from "~/columns/general-validator-columns";
import { ValidatorV2 } from "@bera/proto/src";

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
          src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/shared/s8kfq1dupk8buydgjxdf`}
          width={100}
          height={100}
          className="hidden h-full w-full dark:block"
          alt={"gauge-icon"}
        />
        {/* LIGHT MODE  */}
        <Image
          src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/shared/ocaxgutrs2voe8umwxxc`}
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
          src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/shared/s8kfq1dupk8buydgjxdf`}
          width={100}
          height={100}
          className="hidden h-full w-full rounded-md dark:block"
          alt={"gauge-icon"}
        />
        {/* LIGHT MODE  */}
        <Image
          src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/shared/ocaxgutrs2voe8umwxxc`}
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

export default function ValidatorsTable({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  let typingTimer: NodeJS.Timeout;

  useEffect(() => {
    if (isTyping) return;
    setKeyword(search);
  }, [isTyping, search]);

  const [pagination, setPagination] = useState({
    pageIndex: page,
    pageSize: limit,
  });

  const validatorsV2: ValidatorV2[] | undefined = [];

  const isLoading = false;

  return (
    <div className="mt-16">
      <div className="flex w-fit flex-row items-center gap-2 mb-2 lg:flex-row lg:items-center ">
        <SearchInput
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsTyping?.(true);
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
              setIsTyping?.(false);
            }, 1000);
            return;
          }}
          placeholder="Search..."
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              setKeyword(search);
              clearTimeout(typingTimer);
              setIsTyping?.(false);
            }
          }}
          id="all-pool-search"
          className="w-full md:w-[400px]"
        />
        {isTyping && (
          <div role="status">
            <svg
              aria-hidden="true"
              className="h-6 w-6 animate-spin fill-green-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
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
          data={validatorsV2 ?? []}
          className="min-w-[900px]"
          onRowClick={(row: any) =>
            router.push(`/validators/${row.original.operatorAddr}`)
          }
          enablePagination
          additionalTableProps={{
            state: {
              pagination,
            },
            manualPagination: false,
            pageCount: Math.ceil(100 / limit),
            onPaginationChange: setPagination,
            autoResetPageIndex: false,
          }}
        />
      )}
    </div>
  );
}
