"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  type ActiveIncentive,
  type Market,
  type Vault,
  useGauges,
  type CuttingBoardWeight,
  type UserValidator,
} from "@bera/berajs";
import { blockExplorerUrl, cloudinaryUrl } from "@bera/config";
import { DataTable, SearchInput } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { getAddress } from "viem";

import { OTHERS_GAUGES } from "~/components/global-gauge-weight-chart";
import {
  general_validator_columns,
  user_general_validator_columns,
} from "~/columns/general-validator-columns";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@bera/ui/tabs";

export const GaugeIcon = ({
  gauge,
  className,
}: {
  gauge: CuttingBoardWeight;
  className?: string;
}) => {
  const { gaugeDictionary } = useGauges();

  return (
    <Avatar className={cn("h-5 w-5", className)}>
      <AvatarImage
        src={
          gauge.receiver.name !== OTHERS_GAUGES && gaugeDictionary
            ? gauge.receiver.imageUri
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
export const CuttingBoardDisplay = ({
  cuttingBoard,
}: { cuttingBoard: CuttingBoardWeight }) => {
  return (
    <Link
      className="flex  h-full w-[160px] items-center justify-start gap-2"
      href={`${blockExplorerUrl}/address/${getAddress(
        cuttingBoard.receiver.address,
      )}`}
      target="_blank"
      onClick={(e) => e.stopPropagation()}
    >
      <GaugeIcon gauge={cuttingBoard} />
      <span className=" hover:underline">{cuttingBoard.receiver.name}</span>
    </Link>
  );
};

export default function ValidatorsTable() {
  const router = useRouter();
  const prices = undefined;

  const mockMarkets: Market[] = [
    {
      name: "Market One",
      imageUri: "http://example.com/market1.png",
      website: "http://example.com/market1",
    },
    {
      name: "Market Two",
      imageUri: "http://example.com/market2.png",
      website: "http://example.com/market2",
    },
  ];

  const mockActiveIncentives: ActiveIncentive[] = [
    {
      token: {
        symbol: "TKN",
        decimals: 18,
        address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
        name: "",
      },
      incentiveRate: "0.05",
      amountLeft: "1000",
    },
    {
      token: {
        symbol: "TKN2",
        decimals: 18,
        address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0dD",
        name: "",
      },
      incentiveRate: "0.05",
      amountLeft: "1000",
    },
    {
      token: {
        symbol: "TKN3",
        decimals: 18,
        address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb1aD",
        name: "",
      },
      incentiveRate: "0.05",
      amountLeft: "1000",
    },
    {
      token: {
        symbol: "TKN5",
        decimals: 18,
        address: "0xb10a6CE3423Bf521EcB144b416F42D55A22e10aD",
        name: "",
      },
      incentiveRate: "0.05",
      amountLeft: "1000",
    },
    {
      token: {
        symbol: "TKN6",
        decimals: 18,
        address: "0xd10a6CE3423Bf521EcB144b416F42D55A22e10aD",
        name: "",
      },
      incentiveRate: "0.05",
      amountLeft: "1000",
    },
    {
      token: {
        symbol: "ALT",
        decimals: 18,
        address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
        name: "",
      },
      incentiveRate: "0.10",
      amountLeft: "500",
    },
  ];

  const mockVaults: Vault[] = [
    {
      address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
      market: mockMarkets[0],
      stakingToken: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
      name: "Vault One",
      imageUri: "http://example.com/vault1.png",
      website: "http://example.com/vault1",
      activeIncentives: mockActiveIncentives,
    },
    {
      address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
      market: mockMarkets[1],
      stakingToken: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
      name: "Vault Two",
      imageUri: "http://example.com/vault2.png",
      website: "http://example.com/vault2",
      activeIncentives: mockActiveIncentives,
    },
  ];

  const mockCuttingBoardWeights: CuttingBoardWeight[] = [
    {
      percentage: 20,
      amount: 200,
      receiver: mockVaults[0],
    },
    {
      percentage: 30,
      amount: 300,
      receiver: mockVaults[1],
    },
  ];

  const mockValidators: UserValidator[] = [
    {
      coinbase: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
      name: "Validator One",
      amountStaked: "100000",
      commission: "0.02",
      description: "A reliable and efficient validator.",
      website: "http://example.com/validator1",
      imageUri: "http://example.com/validator1.png",
      cuttingboard: mockCuttingBoardWeights,
      apy: "10",
      rewardRate: "1000",
      allTimeStats: {
        totalBgtDirected: "500000",
        totalHoneyValueBgtDirected: "200000",
        totalHoneyValueTokenRewards: "10000",
      },
    },
    {
      coinbase: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
      name: "Validator Two",
      commission: "0.03",
      description: "A highly secure validator with a focus on stability.",
      website: "http://example.com/validator2",
      imageUri: "http://example.com/validator2.png",
      amountStaked: "2000000",
      cuttingboard: mockCuttingBoardWeights,
      apy: "12",
      rewardRate: "1000",
      allTimeStats: {
        totalBgtDirected: "600000",
        totalHoneyValueBgtDirected: "250000",
        totalHoneyValueTokenRewards: "15000",
      },
    },
  ];

  const [isTyping, setIsTyping] = useState(false);
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  let typingTimer: NodeJS.Timeout;

  useEffect(() => {
    if (isTyping) return;
    setKeyword(search);
  }, [isTyping, search]);

  const handleClearSearch = () => {
    setKeyword("");
    setSearch("");
  };

  return (
    <div className="mt-16">
      <Tabs defaultValue="allValidators">
        <div className="w-full justify-start flex flex-col sm:flex-row mb-6 gap-6">
          <TabsList>
            <TabsTrigger
              value="allValidators"
              onClick={handleClearSearch}
              className="w-full"
            >
              All Validators
            </TabsTrigger>
            <TabsTrigger
              value="myValidators"
              onClick={handleClearSearch}
              className="w-full"
            >
              My Validators
            </TabsTrigger>
          </TabsList>
          <div className="flex flex-row w-full items-start justify-start items-center gap-2">
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
              className="w-full md:w-[350px]"
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
        </div>

        <TabsContent value="allValidators">
          <DataTable
            columns={general_validator_columns}
            data={mockValidators}
            className="min-w-[900px]"
            onRowClick={(row: any) =>
              router.push(`/validators/${row.original.coinbase}`)
            }
          />
        </TabsContent>
        <TabsContent value="myValidators">
          <DataTable
            columns={user_general_validator_columns}
            data={mockValidators}
            className="min-w-[900px]"
            onRowClick={(row: any) =>
              router.push(`/validators/${row.original.coinbase}`)
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
