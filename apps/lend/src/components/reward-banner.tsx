import Image from "next/image";
import {
  LEND_REWARD_HELPER_ABI,
  TransactionActionType,
  formatter,
  useBeraJs,
  usePollUserBGTRewards,
} from "@bera/berajs";
import {
  bgtTokenAddress,
  bgtUrl,
  cloudinaryUrl,
  lendRewardsAddress,
} from "@bera/config";
import { TokenIcon, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { formatEther } from "viem";

export const Banner = () => {
  const { isReady, account } = useBeraJs();
  const { data: rewards, isLoading, refetch } = usePollUserBGTRewards();
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
    <div className="relative flex flex-col-reverse items-start items-center justify-center gap-4 rounded-lg border border-accent bg-gradient-to-b from-[#FFFCF2] to-[#FFF2D0] px-8 py-6 dark:from-[#27251F] dark:to-[#322400] lg:flex-row lg:gap-16">
      {ModalPortal}
      <Image
        src={`${cloudinaryUrl}/bears/lendbear_npxhb3`}
        width={213}
        height={197}
        className="absolute -right-0 hidden w-[213px] lg:bottom-0 lg:block"
        alt="happy bear"
      />
      <div className="flex h-full w-full flex-shrink-0 flex-col gap-4 rounded-xl border border-amber-400 bg-gradient-to-br from-[#FFF6D7] via-[#FFEAA3] to-[#FFD977] p-4 dark:from-[#413E33] dark:to-[#453509] lg:w-fit">
        <div className="flex items-center justify-center gap-2 text-3xl font-semibold leading-9 lg:justify-start">
          <TokenIcon address={bgtTokenAddress} fetch />
          {isReady && !isLoading //@ts-ignore
            ? formatter.format(formatEther((rewards ?? 0n) as bigint))
            : "~~"}
        </div>
        <Button
          disabled={!isReady || !rewards || rewards === 0n || isClaimingLoading}
          onClick={() =>
            write({
              address: lendRewardsAddress,
              abi: LEND_REWARD_HELPER_ABI,
              functionName: "claimAllRewards",
              params: [account],
            })
          }
        >
          Claim Rewards
        </Button>
      </div>

      <div className="flex w-full flex-col gap-2 md:items-center md:justify-center lg:items-start">
        <div className="mx-auto flex inline-flex w-fit items-center rounded-full bg-background pr-4 lg:mx-0">
          <div className="relative flex h-[32px] w-[32px] items-center">
            <TokenIcon address={bgtTokenAddress} fetch />
          </div>
          <div className="text-wrapper w-auto text-lg font-bold">
            69.69% APY
          </div>
        </div>
        <div className="w-full text-center font-bold md:text-lg md:leading-10 lg:w-fit lg:text-left">
          What can I do with my BGT rewards?
          <div className="text-xs font-normal leading-normal text-muted-foreground md:text-sm">
            Now that you&apos;ve got some BGT rewards, you can start using them!
          </div>
        </div>
        <div className="flex w-full justify-center gap-4 lg:justify-start">
          <div className="flex items-center gap-1 text-sm font-semibold leading-7 hover:cursor-pointer md:text-lg">
            🐝{" "}
            <span
              className="hover:underline"
              onClick={() => window.open(`${bgtUrl}/delegate`, "_blank")}
            >
              {" "}
              Stake
            </span>
            <Icons.externalLink className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold leading-7 hover:cursor-pointer md:text-lg">
            🔥{" "}
            <span
              className="hover:underline"
              onClick={() => window.open(`${bgtUrl}/redeem`, "_blank")}
            >
              {" "}
              Burn
            </span>{" "}
            <Icons.externalLink className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold leading-7 hover:cursor-pointer md:text-lg">
            🗳️{" "}
            <span
              className="hover:underline"
              onClick={() => window.open(`${bgtUrl}/governance`, "_blank")}
            >
              {" "}
              Vote
            </span>{" "}
            <Icons.externalLink className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
