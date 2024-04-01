import Image from "next/image";
import Link from "next/link";
import {
  usePollAssetWalletBalance,
  usePollBgtRewardsForAddress,
  usePollLendUserBGTRewards,
  usePollReservesDataList,
} from "@bera/berajs";
import {
  cloudinaryUrl,
  honeyTokenAddress,
  lendHoneyDebtTokenAddress,
} from "@bera/config";
import { FormattedNumber, TokenIcon, Tooltip } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import BigNumber from "bignumber.js";
import { formatEther } from "viem";

import BGTRewardsClaimBtn from "./bgt-rewards-claim-btn";
import BorrowBtn from "./modals/borrow-button";
import RepayBtn from "./modals/repay-button";

export default function HoneyBorrowCard({ honeyAsset }: { honeyAsset: any }) {
  const { data: rewards, isLoading: isUserBGTRewardLoading } =
    usePollLendUserBGTRewards();
  const { useBgtApr } = usePollBgtRewardsForAddress({
    address: lendHoneyDebtTokenAddress,
  });
  const { useTotalBorrowed } = usePollReservesDataList();
  const totalBorrowed = useTotalBorrowed();
  const bgtApr = useBgtApr(totalBorrowed);

  const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();
  const { data: debtTokenBalance } = useSelectedAssetWalletBalance(
    lendHoneyDebtTokenAddress,
  );
  const userTotalBorrowAllowance = BigNumber(honeyAsset?.formattedBalance)
    .plus(BigNumber(debtTokenBalance?.formattedBalance ?? 0))
    .toString();

  return (
    <div className="relative rounded-md border border-accent bg-gradient-to-br from-stone-50 via-amber-50 to-orange-100 px-4 py-3 dark:from-[#1A1608] dark:via-[#201E09] dark:to-[#312A09] ">
      <div className="flex flex-col gap-4 sm:px-3 py-4">
        <div>
          <div className="flex items-center gap-1 text-xs font-medium leading-5 text-yellow-900 text-opacity-60 dark:text-yellow-200">
            Your Borrow Capacity Used
            <Tooltip>
              <div className="bg-background sm:w-[300px]">
                The first value is the amount of HONEY you have borrowed, the{" "}
                second value is the Amount of HONEY you are potentially eligible
                to borrow based on deposited collateral.
              </div>
            </Tooltip>
          </div>
          <div className="flex items-center gap-1 text-3xl font-semibold text-yellow-900 dark:text-yellow-200">
            <TokenIcon address={honeyTokenAddress} className="h-8 w-8" />
            <FormattedNumber
              className="opacity-80"
              value={debtTokenBalance?.formattedBalance ?? "0"}
            />
            /
            <FormattedNumber value={userTotalBorrowAllowance ?? "0"} />
          </div>
        </div>

        <hr className="w-full border-t border-yellow-500 opacity-30 sm:w-[250px]" />

        <div className="flex w-full justify-between sm:w-[250px]">
          <div>
            <div className="text-xs font-medium leading-5 text-yellow-900 opacity-60 dark:text-yellow-200">
              Earning BGT APY
            </div>
            <div className=" text-xl font-semibold leading-7  text-success-foreground">
              +<FormattedNumber value={bgtApr ?? "0"} percent />
            </div>
          </div>
          <div>
            <div className="text-xs font-medium leading-5 text-yellow-900 opacity-60 dark:text-yellow-200">
              Paying Loan APY
            </div>
            <div className="text-xl font-semibold leading-7 text-warning-foreground">
              <FormattedNumber
                value={-honeyAsset?.reserveData?.variableBorrowAPY}
                percent
              />
            </div>
          </div>
        </div>

        <hr className="w-full border-t border-yellow-500 opacity-30 sm:w-[250px]" />

        <div className="mb-8 flex h-5 w-full items-center justify-between sm:w-[250px]">
          <div className="text-xs font-medium text-yellow-900 text-opacity-60 dark:text-yellow-200">
            Your BGT Rewards
          </div>
          <div className="flex items-center gap-1">
            <Icons.bgt className="h-3 w-3" />
            {isUserBGTRewardLoading ? (
              <Skeleton className="h-4 w-20" />
            ) : (
              <FormattedNumber
                className="text-sm font-semibold text-yellow-900 dark:text-yellow-200"
                value={formatEther((rewards ?? 0n) as bigint)}
                symbol="BGT"
              />
            )}
          </div>
        </div>

        <div className="flex w-full gap-3">
          <BorrowBtn
            token={honeyAsset}
            variant="outline"
            className="w-full flex-1 border border-yellow-900 bg-background bg-opacity-20 py-2 text-lg font-semibold leading-7 text-yellow-900 backdrop-blur-2xl hover:bg-yellow-900 hover:text-white hover:opacity-90 dark:border-yellow-600 dark:text-yellow-600 dark:hover:bg-yellow-600 dark:hover:text-white"
          />
          <RepayBtn
            token={{
              ...honeyAsset,
              formattedBalance: debtTokenBalance?.formattedBalance,
              balance: debtTokenBalance?.balance,
            }}
            variant="outline"
            className="w-full flex-1 border border-yellow-900 bg-background bg-opacity-20 py-2 text-lg font-semibold leading-7 text-yellow-900 backdrop-blur-2xl hover:bg-yellow-900 hover:text-white hover:opacity-90 dark:border-yellow-600 dark:text-yellow-600 dark:hover:bg-yellow-600 dark:hover:text-white"
          />
          <Link href={`/markets/${honeyTokenAddress}`}>
            <Button className="w-fit border border-yellow-900 bg-background bg-opacity-20 py-2 text-lg font-semibold leading-7 text-yellow-900 backdrop-blur-2xl hover:bg-yellow-900 hover:text-white hover:opacity-90 dark:border-yellow-600 dark:text-yellow-600 dark:hover:bg-yellow-600 dark:hover:text-white">
              Details
            </Button>
          </Link>
        </div>

        <BGTRewardsClaimBtn />
      </div>
      <Image
        src={`${cloudinaryUrl}/bears/wmbe33wwgz8vevwybb0u`}
        alt="home bear"
        width={320}
        height={320}
        className="absolute right-0 top-3 hidden sm:block"
      />
    </div>
  );
}
