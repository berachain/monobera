"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { truncateHash, useBeraJs, type CuttingBoardWeight } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { GaugeIcon, SearchInput } from "@bera/shared-ui";
import { getHubValidatorPath } from "@bera/shared-ui/src/utils/getHubUrls";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { getAddress } from "viem";

import { AllValidator } from "./all-validator";
import { BoostQueue } from "./boost-queue";
import { MyValidator } from "./my-validators";

export const CuttingBoardDisplay = ({
  cuttingBoard,
}: {
  cuttingBoard: CuttingBoardWeight | undefined;
}) => {
  if (!cuttingBoard) return <div>No Gauge Found</div>;
  return (
    <Link
      className="flex  h-full w-[160px] items-center justify-start gap-2"
      href={`${blockExplorerUrl}/address/${getAddress(cuttingBoard.receiver)}`}
      target="_blank"
      onClick={(e) => e.stopPropagation()}
    >
      <GaugeIcon
        address={cuttingBoard.receiverMetadata?.vaultAddress ?? "0x"}
        overrideImage={cuttingBoard.receiverMetadata?.logoURI ?? ""}
      />
      <span className="max-w-[200px] truncate hover:underline">
        {cuttingBoard.receiverMetadata?.name ??
          truncateHash(cuttingBoard.receiver)}
      </span>
    </Link>
  );
};

export default function ValidatorsTable() {
  const { isReady } = useBeraJs();
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const [isValidatorDataLoading, setIsValidatorDataLoading] = useState(false);
  const [allValidatorPage, setAllValidatorPage] = useState(0);

  useEffect(() => {
    return () => {
      if (typingTimer) clearTimeout(typingTimer);
    };
  }, [typingTimer]);

  return (
    <div>
      <Tabs defaultValue="all-validators">
        <div className="mb-6 flex w-full flex-col justify-between gap-6 sm:flex-row">
          <TabsList variant="ghost">
            <TabsTrigger
              value="all-validators"
              onClick={() => setKeyword("")}
              className="w-full"
            >
              All Validators
            </TabsTrigger>
            <TabsTrigger
              value="my-validators"
              onClick={() => setKeyword("")}
              className="w-full"
              disabled={!isReady}
            >
              My Validators
            </TabsTrigger>
            <TabsTrigger value="queued" className="w-full" disabled={!isReady}>
              Delegation Queue
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all-validators">
            <div className="flex w-fit items-center justify-between gap-2">
              {/* {isTyping && (
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
              )} */}
              <SearchInput
                value={keyword}
                onChange={(e: any) => {
                  setAllValidatorPage(0);
                  setKeyword(e.target.value);
                  setIsTyping?.(true);
                  if (typingTimer) clearTimeout(typingTimer);
                  const newTimer = setTimeout(() => {
                    setIsTyping(false);
                  }, 1000);
                  setTypingTimer(newTimer);
                }}
                placeholder="Search..."
                id="all-pool-search"
                className="w-full md:w-[350px]"
              />
            </div>
          </TabsContent>
        </div>

        <TabsContent value="all-validators">
          <AllValidator
            keyword={keyword}
            isTyping={isTyping}
            page={allValidatorPage}
            setPage={setAllValidatorPage}
            onRowClick={(row: any) =>
              router.push(getHubValidatorPath(row.original.coinbase))
            }
          />
        </TabsContent>
        <TabsContent value="my-validators">
          <MyValidator
            keyword={keyword}
            onRowClick={(row: any) =>
              router.push(getHubValidatorPath(row.original.coinbase))
            }
          />
        </TabsContent>
        <TabsContent value="queued">
          <BoostQueue
            isValidatorDataLoading={isValidatorDataLoading}
            setIsValidatorDataLoading={setIsValidatorDataLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
