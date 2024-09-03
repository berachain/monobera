"use client";

import { useMemo, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import {
  BERA_VAULT_REWARDS_ABI,
  TransactionActionType,
  truncateHash,
  usePollAllowance,
  usePollIncentivesInfo,
  useSelectedGauge,
  useTokenInformation,
  type Token,
} from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import {
  ActionButton,
  ApproveButton,
  FormattedNumber,
  GaugeIcon,
  MarketIcon,
  PoolHeader,
  TokenInput,
  useTxn,
} from "@bera/shared-ui";
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Skeleton } from "@bera/ui/skeleton";
import BigNumber from "bignumber.js";
import { Address, formatUnits, isAddress, parseUnits } from "viem";

export const Incentivize = () => {
  const sp = useSearchParams();
  const gauge = sp.get("gauge");
  const selectedToken = sp.get("selectedToken") as Address | null;
  //is valid pool address
  if (
    !gauge ||
    !isAddress(gauge) ||
    !selectedToken ||
    !isAddress(selectedToken)
  )
    return notFound();

  const {
    data: gaugeInfo,
    isLoading: isGaugeLoading,
    isValidating: isGaugeValidating,
  } = useSelectedGauge(gauge);
  if (!gauge && !isGaugeLoading && !isGaugeValidating) return notFound();

  const [token, setToken] = useState<Token | undefined>(undefined);
  const { data: tokenT, isLoading: isTokenLoading } = useTokenInformation({
    address: selectedToken,
  });

  useMemo(() => {
    if (tokenT) setToken(tokenT);
  }, [tokenT]);

  const [totalAmount, setTotalAmount] = useState("0");
  const [incentiveRate, setIncentiveRate] = useState("0");

  const whiteListedTokens = useMemo(() => {
    return gaugeInfo
      ? gaugeInfo.vaultWhitelist.whitelistedTokens.map((t) => t.token)
      : [];
  }, [gaugeInfo]);

  const amountOfProposals = useMemo(
    () => BigNumber(totalAmount).div(incentiveRate, 18).toString(),
    [totalAmount, incentiveRate],
  );

  const { data: allowance } = usePollAllowance({
    spender: gaugeInfo?.vaultAddress ?? "0x",
    token: token,
  });

  const { data: incentive, isLoading: isIncentiveLoading } =
    usePollIncentivesInfo(token?.address ?? "0x", gauge ?? "0x");

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

  const [exceeding, setExceeding] = useState(false);
  const isLoading = isGaugeLoading || isTokenLoading || isIncentiveTxnLoading;

  const isInvalidInput = useMemo(() => {
    return (
      incentiveRate !== "" &&
      incentiveRate !== "0" &&
      totalAmount !== "" &&
      totalAmount !== "0" &&
      parseFloat(incentiveRate) > parseFloat(totalAmount)
    );
  }, [totalAmount, incentiveRate]);

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
                <GaugeIcon
                  address={gauge}
                  size="xl"
                  overrideImage={gaugeInfo?.metadata?.logoURI ?? ""}
                />
                {gaugeInfo?.metadata?.name ?? truncateHash(gauge)}
              </>
            }
            subtitles={[
              {
                title: "Platform",
                content: (
                  <>
                    {" "}
                    <MarketIcon
                      market={gaugeInfo?.metadata?.product ?? ""}
                      size={"md"}
                    />
                    {gaugeInfo?.metadata?.product ?? "OTHER"}
                  </>
                ),
                externalLink: gaugeInfo?.metadata?.url ?? "",
              },
              {
                title: "Reward Vault",
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
          className="cursor-not-allowed rounded-md border border-border px-3 py-2 text-sm	"
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
              disabled={isLoading || !token}
              selected={token}
              amount={totalAmount}
              customTokenList={[...whiteListedTokens]}
              setAmount={(amount) => setTotalAmount(amount as `${number}`)}
              onTokenSelection={(token: Token | undefined) => setToken(token)}
              onExceeding={(exceeding) => setExceeding(exceeding)}
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
        {incentive && (
          <div className="text-right text-xs font-semibold text-muted-foreground">
            Minimum Incentive Rate:{" "}
            <FormattedNumber
              value={formatUnits(
                incentive?.minIncentiveRate,
                token?.decimals ?? 18,
              )}
              compact
              symbol={token?.symbol ?? ""}
            />
          </div>
        )}
      </div>

      {parseUnits(incentiveRate, token?.decimals ?? 18) <
        (incentive?.minIncentiveRate ?? 0n) &&
        incentiveRate !== "" &&
        incentiveRate !== "0" && (
          <Alert variant="destructive">Minimum incentive rate not meet</Alert>
        )}

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
        <div className="flex items-center justify-between gap-4 text-muted-foreground">
          <div className="whitespace-nowrap py-1 text-sm font-medium leading-5">
            Amount of Proposals
          </div>
          <FormattedNumber
            className="truncate font-semibold leading-7"
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

      <ActionButton>
        {((allowance !== undefined && allowance?.formattedAllowance === "0") ||
          (allowance?.allowance ?? 0n) <
            parseUnits(totalAmount, token?.decimals ?? 18)) &&
        totalAmount !== "" &&
        totalAmount !== "0" &&
        !exceeding &&
        token ? (
          <ApproveButton
            token={token}
            spender={gaugeInfo?.vaultAddress ?? "0x"}
            amount={parseUnits(totalAmount, token?.decimals ?? 18)}
          />
        ) : (
          <Button
            className="w-full"
            disabled={
              isInvalidInput ||
              isIncentiveTxnLoading ||
              totalAmount === "0" ||
              totalAmount === "" ||
              incentiveRate === "0" ||
              incentiveRate === "" ||
              exceeding ||
              isIncentiveLoading ||
              !incentive
            }
            onClick={() =>
              write({
                address: gaugeInfo?.vaultAddress ?? "0x",
                abi: BERA_VAULT_REWARDS_ABI,
                functionName: "addIncentive",
                params: [
                  token?.address,
                  parseUnits(totalAmount, token?.decimals ?? 18),
                  parseUnits(incentiveRate, token?.decimals ?? 18),
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
