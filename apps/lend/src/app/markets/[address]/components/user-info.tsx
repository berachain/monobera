import {
  formatter,
  useSelectedAssetWalletBalance,
  type Token,
} from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { formatUnits } from "viem";

import Card from "~/components/card";
import BorrowBtn from "~/components/modals/borrow-button";
import SupplyBtn from "~/components/modals/supply-button";
import { usePollReservesDataList } from "~/hooks/usePollReservesDataList";
import { usePollUserAccountData } from "~/hooks/usePollUserAccountData";

export default function UserInfo({ token }: { token: Token | undefined }) {
  const tokenBalance = useSelectedAssetWalletBalance(token?.address ?? "");
  const { useSelectedReserveData, useBaseCurrencyData } =
    usePollReservesDataList();
  const { data: reserveData } = useSelectedReserveData(token?.address ?? "");
  const { data: baseCurrencyData } = useBaseCurrencyData();
  const { useUserAccountData } = usePollUserAccountData();
  const { data: userAccountData } = useUserAccountData();

  const supplyAmount =
    Number(reserveData?.supplyCap) > Number(tokenBalance?.formattedBalance)
      ? Number(tokenBalance?.formattedBalance)
      : Number(reserveData?.supplyCap);

  const borrowPower =
    Number(
      formatUnits(
        userAccountData?.availableBorrowsBase ?? "0",
        baseCurrencyData?.networkBaseTokenPriceDecimals,
      ),
    ) / Number(reserveData?.formattedPriceInMarketReferenceCurrency);

  const availableLiquidity =
    Number(reserveData?.totalLiquidity) *
    Number(reserveData?.formattedPriceInMarketReferenceCurrency) *
    Number(1 - reserveData?.borrowUsageRatio);

  const borrowAmout =
    borrowPower > availableLiquidity ? availableLiquidity : borrowPower;

  return (
    <div className="w-full flex-shrink-0 lg:w-[378px]">
      {token ? (
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
                    {Number(tokenBalance?.formattedBalance).toLocaleString()}
                  </b>{" "}
                  {token.symbol}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium leading-tight">
                    Available to Supply{" "}
                    <Tooltip text="This is the total amount that you are able to supply to in this reserve. You are able to supply your wallet balance up until the supply cap is reached." />
                  </div>
                  <div className="mt-[-2px] leading-7 text-muted-foreground">
                    <b>{formatter.format(supplyAmount)}</b> {token.symbol}
                  </div>
                  <div className="text-xs font-medium leading-tight text-muted-foreground">
                    $
                    {formatter.format(
                      Number(
                        reserveData?.formattedPriceInMarketReferenceCurrency,
                      ) * supplyAmount,
                    )}
                  </div>
                </div>
                <div>
                  <SupplyBtn token={token} disabled={supplyAmount === 0} />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium leading-tight">
                    Available to Borrow{" "}
                    <Tooltip text="This is the total amount available for you to borrow. You can borrow based on your collateral and until the borrow cap is reached." />
                  </div>
                  <div className="mt-[-2px] leading-7 text-muted-foreground">
                    <b>{formatter.format(borrowAmout)}</b> {token.symbol}
                  </div>
                  <div className="text-xs font-medium leading-tight text-muted-foreground">
                    $
                    {formatter.format(
                      Number(
                        reserveData?.formattedPriceInMarketReferenceCurrency,
                      ) * borrowAmout,
                    )}
                  </div>
                </div>
                <div>
                  <BorrowBtn token={token} disabled={borrowAmout === 0} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div>Loading</div>
      )}{" "}
    </div>
  );
}
