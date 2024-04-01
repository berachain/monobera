import {
  useBeraJs,
  usePollAssetWalletBalance,
  usePollReservesDataList,
  usePollReservesPrices,
  usePollUserAccountData,
  type Token,
} from "@bera/berajs";
import { honeyAddress } from "@bera/config";
import { FormattedNumber, Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import BigNumber from "bignumber.js";
import { formatUnits, parseUnits } from "viem";

import Card from "~/components/card";
import BorrowBtn from "~/components/modals/borrow-button";
import SupplyBtn from "~/components/modals/supply-button";

export default function UserInfo({ token }: { token: Token | undefined }) {
  const { isReady } = useBeraJs();
  const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();
  const { data: tokenBalance, isLoading } = useSelectedAssetWalletBalance(
    token?.address ?? "",
  );
  const { useSelectedReserveData, useBaseCurrencyData } =
    usePollReservesDataList();
  const { data: reserveData } = useSelectedReserveData(token?.address ?? "");
  const { data: baseCurrencyData } = useBaseCurrencyData();
  const { useUserAccountData } = usePollUserAccountData();
  const { data: userAccountData } = useUserAccountData();
  const { useReservesPrices } = usePollReservesPrices();
  const { data: reservesPrices } = useReservesPrices();

  const tokenPrice =
    token && reservesPrices && reservesPrices[token.address]
      ? reservesPrices[token.address].formattedPrice
      : "1";
  const supplyAmount = isReady
    ? Number(reserveData?.supplyCap) > Number(tokenBalance?.formattedBalance)
      ? Number(tokenBalance?.formattedBalance)
      : Number(reserveData?.supplyCap)
    : 0;

  const borrowBase = formatUnits(
    userAccountData?.availableBorrowsBase ?? 0n,
    baseCurrencyData?.marketReferenceCurrencyDecimals ?? 8,
  );
  const borrowPower = BigNumber(borrowBase)
    .div(BigNumber(tokenPrice))
    .times(0.99)
    .toFixed(token?.decimals ?? 18);

  const availableLiquidity = BigNumber(reserveData?.totalLiquidity)
    .times(BigNumber(reserveData?.formattedPriceInMarketReferenceCurrency))
    .times(BigNumber(1 - reserveData?.borrowUsageRatio))
    .toFixed(baseCurrencyData?.marketReferenceCurrencyDecimals ?? 8);

  const borrowAmout = BigNumber(borrowPower).gt(BigNumber(availableLiquidity))
    ? availableLiquidity
    : borrowPower;

  return (
    <div className="w-full flex-shrink-0 xl:w-[378px]">
      <div>
        <div className="text-2xl font-semibold leading-loose">Your Info</div>
        <Card className="p-6">
          <div className="flex items-center gap-4 border-b border-border pb-4">
            <div className="h-fit w-fit rounded-full border border-border bg-muted p-2 hover:cursor-pointer md:rounded-lg">
              <Icons.wallet className="relative h-8 w-8 text-muted-foreground" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-sm text-muted-foreground">
                Wallet Balance
              </div>
              <div className="text-muted-foreground">
                <b className="text-foreground">
                  {tokenBalance || !isLoading || !isReady ? (
                    <FormattedNumber
                      value={tokenBalance?.formattedBalance ?? 0}
                      compact={false}
                    />
                  ) : (
                    <Skeleton className="inline-block h-5 w-20" />
                  )}
                </b>{" "}
                {token ? (
                  token.symbol
                ) : (
                  <Skeleton className="inline-block h-5 w-20" />
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium leading-tight">
                  Available to Supply{" "}
                  <Tooltip>
                    <div className="max-w-[350px]">
                      This is the total amount that you are able to supply to in
                      this reserve. You are able to supply your wallet balance
                      up until the supply cap is reached.
                    </div>
                  </Tooltip>
                </div>
                <div className="mt-[-2px] leading-7 text-muted-foreground">
                  <b>
                    {!Number.isNaN(supplyAmount) ? (
                      <FormattedNumber value={supplyAmount} />
                    ) : (
                      <Skeleton className="inline-block h-7 w-20" />
                    )}
                  </b>{" "}
                  {token ? (
                    token.symbol
                  ) : (
                    <Skeleton className="inline-block h-7 w-20" />
                  )}
                </div>
                <div className="text-xs font-medium leading-tight text-muted-foreground">
                  <FormattedNumber
                    value={
                      Number(
                        reserveData?.formattedPriceInMarketReferenceCurrency,
                      ) * supplyAmount
                    }
                    symbol="USD"
                  />
                </div>
              </div>
              <div>
                {token ? (
                  <SupplyBtn token={token} disabled={supplyAmount === 0} />
                ) : (
                  <Skeleton className="h-9 w-20" />
                )}
              </div>
            </div>

            {token && token.address === honeyAddress && (
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium leading-tight">
                    Available to Borrow{" "}
                    <Tooltip>
                      <div className="max-w-[350px]">
                        This is the total amount available for you to borrow.{" "}
                        You can borrow based on your collateral and until the{" "}
                        borrow cap is reached.
                      </div>
                    </Tooltip>
                  </div>
                  <div className="mt-[-2px] leading-7 text-muted-foreground">
                    <b>
                      {!Number.isNaN(borrowAmout) ? (
                        <FormattedNumber value={borrowAmout} />
                      ) : (
                        <Skeleton className="inline-block h-7 w-20" />
                      )}
                    </b>{" "}
                    {token ? (
                      token.symbol
                    ) : (
                      <Skeleton className="inline-block h-7 w-20" />
                    )}
                  </div>
                  <div className="text-xs font-medium leading-tight text-muted-foreground">
                    <FormattedNumber
                      value={
                        Number(
                          reserveData?.formattedPriceInMarketReferenceCurrency,
                        ) * Number(borrowAmout)
                      }
                      symbol="USD"
                    />
                  </div>
                </div>
                <div>
                  {token ? (
                    <BorrowBtn
                      token={{
                        ...token,
                        balance: parseUnits(borrowPower, token.decimals),
                        formattedBalance: borrowPower,
                      }}
                      disabled={borrowAmout === "0"}
                    />
                  ) : (
                    <Skeleton className="h-9 w-20" />
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
