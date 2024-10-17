import { truncateHash, useBeraJs, usePollUserDelegates } from "@bera/berajs";
import { ActionButton, FormattedNumber, TokenIcon } from "@bera/shared-ui";
import { Identicon } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";

import { DelegateModal } from "./delegate-modal";
import { Button } from "@bera/ui/button";
import { useState } from "react";
import { useGovernance } from "./governance-provider";
import { governanceTokenAddress } from "@bera/config";
import { ADDRESS_ZERO } from "@bera/berajs/config";

export const UserVotingPower = () => {
  const { isReady, account } = useBeraJs();
  const { data } = usePollUserDelegates();
  const { delegatedByOthers, tokenBalance } = useGovernance();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-fit w-full flex-col gap-6 rounded-sm border border-border p-4 lg:w-[340px]">
      {!isReady ? (
        <div className="flex flex-col gap-3">
          <div className="font-semibold leading-none text-xl">Your info</div>
          <div className="text-sm font-medium leading-5 text-muted-foreground">
            Connect your wallet to view your voting power and delegations.
          </div>
        </div>
      ) : (
        <>
          <h3 className="font-semibold leading-6">Your info</h3>
          <div className="flex flex-row sm:flex-col gap-y-6 gap-4">
            <div className="text-sm font-semibold basis-1/2">
              <div className="text-muted-foreground">Total Voting Power</div>
              {data?.currentVotes ? (
                <p className="flex items-center leading-none gap-1">
                  <FormattedNumber
                    value={data?.currentVotes ?? 0}
                    symbol="BGT"
                  />
                  <TokenIcon size="md" address={governanceTokenAddress} />
                </p>
              ) : (
                <Skeleton className="h-6 w-full" />
              )}
            </div>
            <div className="text-sm font-semibold basis-1/2">
              <div className="text-muted-foreground capitalize">
                Your delegation
              </div>
              {data?.delegate ? (
                data.delegate !== ADDRESS_ZERO ? (
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Identicon account={data?.delegate as string} size={24} />
                    {data?.delegate === account
                      ? "My Self"
                      : truncateHash(data?.delegate)}
                  </div>
                ) : (
                  <p className="sm:flex items-center gap-1">
                    <span className="leading-none max-sm:grow flex">
                      Unassigned
                    </span>
                    <span className="text-muted-foreground whitespace-nowrap max-sm:hidden">
                      ––
                    </span>
                    <p className="flex items-center leading-none gap-1 text-muted-foreground">
                      {tokenBalance ? (
                        <FormattedNumber
                          value={tokenBalance}
                          symbol="BGT"
                          compact={true}
                        />
                      ) : (
                        <Skeleton className="h-6 w-full" />
                      )}
                      <TokenIcon size="md" address={governanceTokenAddress} />
                    </p>
                  </p>
                )
              ) : (
                <Skeleton className="h-6 w-full" />
              )}
            </div>
          </div>
          <div className="text-sm font-semibold">
            <div className="text-muted-foreground capitalize">
              Delegations (from other wallets)
            </div>
            {data?.delegate ? (
              <p className="flex items-center gap-2">
                <p className="flex items-center gap-1">
                  {delegatedByOthers ? (
                    <FormattedNumber
                      className="text-primary font-medium"
                      value={delegatedByOthers}
                      symbol="BGT"
                      compact={true}
                    />
                  ) : (
                    <Skeleton className="h-6 w-full" />
                  )}
                  <TokenIcon size="md" address={governanceTokenAddress} />
                </p>
              </p>
            ) : (
              <Skeleton className="h-6 w-full" />
            )}
          </div>
        </>
      )}
      <ActionButton>
        <Button className="w-full" onClick={() => setIsOpen(true)}>
          Update
        </Button>
      </ActionButton>
      {!!data?.delegate && (
        <DelegateModal isOpen={isOpen} onOpenChange={setIsOpen} />
      )}
    </div>
  );
};
