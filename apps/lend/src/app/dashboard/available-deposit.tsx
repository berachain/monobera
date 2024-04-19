import React from "react";
import {
  defaultBeraConfig,
  usePollWalletBalances,
  type Token,
} from "@bera/berajs";
import { NotFoundBear } from "@bera/shared-ui";

import UserTokenCard from "~/components/user-token-card";

export default function AvailableDeposit() {
  const { useSelectedTagWalletBalances } = usePollWalletBalances({
    config: defaultBeraConfig,
  });
  const assets = useSelectedTagWalletBalances("deposit");
  return (
    <>
      <div className="mt-4">
        <div className="text-2xl font-semibold leading-8">
          Available to Deposit
        </div>
        <div className="text-sm text-muted-foreground">
          You can deposit the following assets to borrow HONEY
        </div>
      </div>
      {(assets?.length ?? 0) > 0 ? (
        <>
          {assets?.map((asset: Token, index: number) => (
            <UserTokenCard token={asset} key={index} />
          ))}
        </>
      ) : (
        <div className="flex justify-center rounded-2xl border border-border px-4 py-6">
          <NotFoundBear
            subtitle={
              <>
                It looks like there are no assets to supply right now. <br />
                When you have eligible assets available, they will appear in
                this section.
              </>
            }
          />
        </div>
      )}
    </>
  );
}
