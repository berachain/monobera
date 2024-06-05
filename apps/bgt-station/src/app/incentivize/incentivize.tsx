"use client";

import { useEffect, useMemo, useState } from "react";
import { notFound } from "next/navigation";
import {
  BERA_VAULT_REWARDS_ABI,
  TransactionActionType,
  truncateHash,
  useBeraJs,
  usePollAllowance,
  usePollGauges,
  useTokenInformation,
  type Token,
} from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import {
  ActionButton,
  ApproveButton,
  FormattedNumber,
  PoolHeader,
  TokenIconList,
  TokenInput,
  useTxn,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { Address, parseUnits } from "viem";
import { Alert } from "@bera/ui/alert";

export const Incentivize = ({
  gauge,
  selectedToken,
}: {
  gauge: Address;
  selectedToken?: Address;
}) => {
  //is valid pool address
  if (!gauge) return notFound();
  const { isReady } = useBeraJs();
  const { gaugeDictionary, isLoading: isGaugeLoading } = usePollGauges();
  const gaugeInfo = gaugeDictionary?.[gauge];
  if (!gaugeInfo && !isGaugeLoading) return notFound();

  const [token, setToken] = useState<Token | undefined>(undefined);
  const { data: tokenT, isLoading: isTokenLoading } = useTokenInformation({
    address: selectedToken,
  });

  useEffect(() => {
    if (!isTokenLoading && tokenT) setToken(tokenT);
  }, [tokenT, isTokenLoading]);

  const [totalAmount, setTotalAmount] = useState("0");
  const [incentiveRate, setIncentiveRate] = useState("0");

  const whiteListedTokens = gaugeInfo
    ? gaugeInfo.vaultWhitelist.whitelistedTokens.map((t) => t.token)
    : [];

  const amountOfProposals = useMemo(() => {
    return Number(totalAmount) / Number(incentiveRate);
  }, [totalAmount, incentiveRate]);

  const isInvalidInput = useMemo(() => {
    return parseFloat(incentiveRate) > parseFloat(totalAmount);
  }, [totalAmount, incentiveRate]);

  const { data: allowance } = usePollAllowance({
    spender: gaugeInfo?.vaultAddress ?? "",
    token: token,
  });

  const {
    write,
    ModalPortal,
    isLoading: isIncentiveTxnLoading,
  } = useTxn({
    message: "Adding Incentives",
    actionType: TransactionActionType.CREATE_BRIBE,
    onSuccess: () => {
      setTotalAmount("");
      setIncentiveRate("");
    },
  });

  const isLoading = isGaugeLoading || isTokenLoading || isIncentiveTxnLoading;
  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col gap-8 rounded-md border border-border p-4 shadow">
      {ModalPortal}
      {isGaugeLoading ? (
        <Skeleton className="h-[102px] w-full" />
      ) : (
        <>
          <PoolHeader
            title={
              <>
                <TokenIconList tokenList={[]} size="xl" />
                {gaugeInfo?.metadata.name}
              </>
            }
            subtitles={[
              {
                title: "Platform",
                content: (
                  <>
                    {" "}
                    <Icons.bexFav className="h-4 w-4" />
                    Bex
                  </>
                ),
                externalLink: "https://berachain.com",
              },
              {
                title: "Pool Contract",
                content: <>{truncateHash(gaugeInfo?.vaultAddress ?? "")}</>,
                externalLink: `${blockExplorerUrl}/address/${
                  gaugeInfo?.vaultAddress ?? ""
                }`,
              },
            ]}
            center
            className="flex flex-col gap-4 rounded-md border border-border bg-muted px-2 py-3"
          />
        </>
      )}

      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold leading-7">
          Incentivize a Pool
        </div>
        <div className="text-sm leading-5 text-muted-foreground">
          Note: Incentives are generally distributed by protocols.
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium leading-5">1. Pool Address</div>
        <input
          className="rounded-md border border-border px-3 py-2 text-sm cursor-not-allowed	"
          disabled
          placeholder={gauge}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium leading-5">
          2. Select Token & Set Amounts
        </div>
        {isTokenLoading ? (
          <Skeleton className="h-[92px] w-full rounded-sm" />
        ) : (
          <div className="rounded-md border border-border">
            <TokenInput
              selectable={selectedToken === undefined}
              showExceeding
              disabled={isLoading}
              selected={token}
              amount={totalAmount}
              customTokenList={whiteListedTokens}
              setAmount={(amount) => setTotalAmount(amount as `${number}`)}
              onTokenSelection={(token: Token | undefined) => setToken(token)}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium leading-5">
          3. How many Token(s) would you like to Distribute Per BGT
        </div>
        {isTokenLoading ? (
          <Skeleton className="h-[72px] w-full rounded-sm" />
        ) : (
          <div className="rounded-md border border-border">
            <TokenInput
              selectable={false}
              disabled={isLoading || !token}
              hideBalance
              hideMax
              hidePrice
              selected={token}
              amount={incentiveRate}
              setAmount={(amount) => setIncentiveRate(amount as `${number}`)}
            />
          </div>
        )}
      </div>

      {isInvalidInput && (
        <Alert variant="destructive">
          Incentive Rate cannot exceed Total Amount
        </Alert>
      )}
      <div className="flex flex-col gap-3 rounded-md bg-muted p-4">
        <div className="text-sm font-medium leading-5">
          Incentive Distribution
        </div>
        <hr />
        <div className="flex justify-between text-muted-foreground">
          <div className="flex flex-col gap-1 py-1">
            <div className="text-sm font-medium leading-5">
              Amount of Proposals
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-lg font-semibold leading-7">
              <FormattedNumber
                value={
                  isInvalidInput ||
                  totalAmount === "" ||
                  incentiveRate === "" ||
                  totalAmount === "0" ||
                  incentiveRate === "0"
                    ? 0
                    : amountOfProposals
                }
                compact
                showIsSmallerThanMin
              />
            </div>
          </div>
        </div>
        {/* <div className="flex justify-between text-muted-foreground">
          <div className="flex flex-col gap-1 py-1">
            <div className="text-sm font-medium leading-5">Estimated Duration</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-lg font-semibold leading-7">
              16.65{" "}
            </div>
          </div>
        </div> */}
      </div>

      <ActionButton>
        {((allowance !== undefined && allowance?.formattedAllowance === "0") ||
          (allowance?.allowance ?? 0n) < parseUnits(totalAmount, 18)) &&
        totalAmount !== "" &&
        totalAmount !== "0" ? (
          <ApproveButton
            token={token}
            spender={gaugeInfo.vaultAddress}
            amount={parseUnits(totalAmount, 18)}
          />
        ) : (
          <Button
            className="w-full"
            disabled={isInvalidInput || isIncentiveTxnLoading}
            onClick={() =>
              write({
                address: gaugeInfo.vaultAddress,
                abi: BERA_VAULT_REWARDS_ABI,
                functionName: "addIncentive",
                params: [
                  token?.address,
                  parseUnits(totalAmount, 18),
                  parseUnits(incentiveRate, 18),
                ],
              })
            }
          >
            Incentivize
          </Button>
        )}
      </ActionButton>
    </div>
  );
};
