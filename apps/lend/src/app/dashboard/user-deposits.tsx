import React from "react";
import { usePollWalletBalances, type BalanceToken } from "@bera/berajs";
import { aHoneyTokenAddress } from "@bera/config";
import { FormattedNumber, TokenIcon, Tooltip } from "@bera/shared-ui";
import { Badge } from "@bera/ui/badge";
import { Card } from "@bera/ui/card";

import WithdrawBtnQ from "~/components/modals/withdraw-button-quick";
import UserTokenCard from "~/components/user-token-card";

export default function UserDeposits() {
  const wethDT = {
    address: "0x8Ce5C1c42CD58B7aE61512790e514a82d84375Ed" as `0x${string}`,
    decimals: 18,
    symbol: "WETH",
    logoURI:
      "https://artio-static-asset-public.s3.ap-southeast-1.amazonaws.com/assets/eth.png",
    name: "wrapped ether atoken (deprecated)",
  };

  const { useSelectedTagWalletBalances, useSelectedWalletBalance } =
    usePollWalletBalances({
      externalTokenList: [wethDT],
    });

  const atokens = useSelectedTagWalletBalances("aToken")?.filter(
    (atoken: BalanceToken) =>
      atoken?.balance &&
      atoken?.balance > 0n &&
      atoken?.address !== aHoneyTokenAddress,
  );
  const wethD = useSelectedWalletBalance(wethDT.address);
  return (
    <>
      <div>
        <div className="text-2xl font-semibold leading-8">Your Deposits</div>
        <div className="text-sm text-muted-foreground">
          You must deposit collateral in order to borrow HONEY
        </div>
      </div>
      {atokens?.length === 0 ? (
        <Card className="flex h-[72px] items-center justify-between px-6 py-4 text-muted-foreground">
          You have not deposited any assets
        </Card>
      ) : (
        <>
          {atokens?.map((atoken: BalanceToken, index: number) => (
            <UserTokenCard token={atoken} key={index} deposited />
          ))}
        </>
      )}

      {wethD && wethD?.balance > 0n && (
        <Card className="bg-muted p-4">
          <div className="flex flex-row items-center justify-between gap-6">
            <div className="flex flex-shrink-0 items-center gap-4 ">
              <TokenIcon
                address={wethDT.address}
                imgOverride={wethDT.logoURI}
                size="2xl"
                className="opacity-50"
              />
              <div>
                <div className="flex items-center gap-1 text-xs font-medium leading-tight text-muted-foreground">
                  Deposited
                </div>
                <div className="flex h-8 items-center text-lg font-bold uppercase gap-4">
                  <FormattedNumber
                    value={wethD.formattedBalance}
                    symbol={"WETH"}
                  />
                  <Tooltip
                    toolTipTrigger={
                      <Badge
                        variant="destructive"
                        className="font-semibold capitalize"
                      >
                        Deprecated
                      </Badge>
                    }
                    children={
                      <div className="p-2 normal-case">
                        <div className="font-bold">
                          This token is deprecated
                        </div>
                        <div className="font-semibold leading-5 text-muted-foreground">
                          You are still able to withdraw <br />
                          but no new deposit can be made
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>

            <div className="grow-1 hidden w-full items-center gap-2 md:flex md:w-fit">
              <WithdrawBtnQ token={wethD} />
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
