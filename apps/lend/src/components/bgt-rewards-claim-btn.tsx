import {
  LEND_REWARD_HELPER_ABI,
  TransactionActionType,
  useBeraJs,
  usePollLendUserBGTRewards,
} from "@bera/berajs";
import { bgtTokenAddress, lendRewardsAddress } from "@bera/config";
import { Spinner, TokenIcon, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { formatEther } from "viem";

export default function BGTRewardsClaimBtn() {
  const { account } = useBeraJs();
  const {
    data: rewards = 0n,
    isLoading,
    refetch,
  } = usePollLendUserBGTRewards();
  const {
    write,
    isLoading: isClaimingLoading,
    ModalPortal,
  } = useTxn({
    message: `Claiming ${formatEther((rewards ?? 0n) as bigint)} BGT Rewards`,
    actionType: TransactionActionType.CLAIMING_REWARDS,
    onSuccess: () => refetch(),
  });
  return (
    <>
      {ModalPortal}
      <Button
        variant="outline"
        disabled={rewards === 0n || isClaimingLoading || isLoading}
        className="flex items-center gap-1 border border-yellow-400 bg-gradient-to-br  from-orange-100 to-yellow-300 text-black"
        onClick={() =>
          write({
            address: lendRewardsAddress,
            abi: LEND_REWARD_HELPER_ABI,
            functionName: "claimAllRewards",
            params: [account],
          })
        }
      >
        {rewards === 0n ? (
          <>
            <TokenIcon address={bgtTokenAddress} className="h-6 w-6" />
            No Claimable BGT Rewards
          </>
        ) : isClaimingLoading ? (
          <>
            <Spinner size={16} />
            Claiming BGT Rewards
          </>
        ) : (
          <>
            <TokenIcon address={bgtTokenAddress} className="h-6 w-6" />
            Claim {formatEther(rewards as bigint)} BGT Rewards
          </>
        )}
      </Button>
    </>
  );
}
