import React from "react";
import { usePollWalletBalances, type Token } from "@bera/berajs";
import { aHoneyTokenAddress } from "@bera/config";
import { Card } from "@bera/ui/card";

import UserTokenCard from "~/components/user-token-card";
import { beraJsConfig } from "@bera/wagmi";

export default function UserDeposits() {
  const { useSelectedTagWalletBalances } = usePollWalletBalances({
    config: beraJsConfig,
  });
  const atokens = useSelectedTagWalletBalances("aToken")?.filter(
    (atoken: Token) =>
      atoken?.balance &&
      atoken?.balance > 0n &&
      atoken?.address !== aHoneyTokenAddress,
  );
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
          {atokens?.map((atoken: Token, index: number) => (
            <UserTokenCard token={atoken} key={index} deposited />
          ))}
        </>
      )}
    </>
  );
}
