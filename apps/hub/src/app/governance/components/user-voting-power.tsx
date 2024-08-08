import { truncateHash, useBeraJs, usePollUserDelegates } from "@bera/berajs";
import { ActionButton, FormattedNumber } from "@bera/shared-ui";
import Identicon from "@bera/shared-ui/src/identicon";
import { Skeleton } from "@bera/ui/skeleton";

import { DelegateModal } from "./delegate-modal";

export const UserVotingPower = () => {
  const { isReady, account } = useBeraJs();
  const { data } = usePollUserDelegates();

  return (
    <div className="flex h-fit w-full flex-col gap-6 rounded-sm border border-border p-4 lg:w-[300px]">
      {!isReady ? (
        <div className="flex flex-col gap-3">
          <div className="font-semibold leading-6">Your info</div>
          <div className="text-sm font-medium leading-5 text-muted-foreground">
            Connect your wallet to view your voting power and delegations.
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Identicon account={account!} size={24} />
            {truncateHash(account ?? "0x", 6)}
          </div>
          <div className="text-sm font-semibold">
            <div className="text-muted-foreground">Total Voting Power</div>
            {data?.currentVotes ? (
              <FormattedNumber value={data?.currentVotes ?? 0} symbol="BGT" />
            ) : (
              <Skeleton className="h-6 w-full" />
            )}
          </div>
          <div className="text-sm font-semibold">
            <div className="text-muted-foreground">Delegated to</div>
            {data?.delegate ? (
              <div className="flex items-center gap-2 text-sm font-medium">
                <Identicon account={data?.delegate as string} size={24} />
                {data?.delegate === account
                  ? "My Self"
                  : truncateHash(data?.delegate)}
              </div>
            ) : (
              <Skeleton className="h-6 w-full" />
            )}
          </div>
        </>
      )}
      <ActionButton>
        {data?.delegate ? (
          <DelegateModal delegated={data?.delegate as `0x${string}`} />
        ) : (
          <Skeleton className="h-11 w-full" />
        )}
      </ActionButton>
    </div>
  );
};
