import {
  truncateHash,
  useBeraJs,
  usePollUserDelegates,
  usePollWalletBalances,
} from "@bera/berajs";
import { bgtTokenAddress } from "@bera/config";
import { ActionButton, FormattedNumber } from "@bera/shared-ui";
import Identicon from "@bera/shared-ui/src/identicon";
import { Button } from "@bera/ui/button";

export const UserVotingPower = () => {
  const { isReady, account } = useBeraJs();
  const { useSelectedWalletBalance } = usePollWalletBalances();
  const bgtBalance = useSelectedWalletBalance(bgtTokenAddress);
  const { data } = usePollUserDelegates();

  console.log("usePollUserDelegates", data);

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
            <Identicon account={account!} className="" size={24} />
            {truncateHash(account ?? "0x", 6)}
          </div>
          <div className="text-sm font-semibold">
            <div className="text-muted-foreground">Total Voting Power</div>
            <FormattedNumber value={data?.currentVotes ?? 0} symbol="BGT" />
          </div>
          <div className="text-sm font-semibold">
            <div className="text-muted-foreground">Delegated to</div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Identicon
                account={data?.delegate ?? "0x"}
                className=""
                size={24}
              />
              {data?.delegate === account
                ? "My Self"
                : truncateHash(data?.delegate ?? "0x")}
            </div>
          </div>
        </>
      )}
      <ActionButton>
        <Button className="w-full">Update Delegation</Button>
      </ActionButton>
    </div>
  );
};
