"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  useBeraJs,
  usePollReferralsDetails,
  usePollTraderReferral,
} from "@bera/berajs";
import { cloudinaryUrl, perpsUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Skeleton } from "@bera/ui/skeleton";
import cn from "classnames";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";

interface ReferralsDataProps {
  isLoading: boolean;
  title: string;
  value: string;
  showHoneyIcon?: boolean;
  borderBottom?: boolean;
}

interface ReferralCardProps {
  bgId: string;
  title: string;
  text: string;
}

const BLANK_WALLET_ADDRESS = "0x0000000000000000000000000000000000000000";

const Connect = dynamic(
  () => import("@bera/shared-ui").then((mod) => mod.ConnectButton),
  {
    ssr: false,
    loading: () => (
      <Button className="h-11 min-w-32 px-4 py-2">
        <div className="flex">
          <Icons.wallet className="mr-2 h-4 w-4 self-center" />
          Connect
        </div>
      </Button>
    ),
  },
);

const ReferralsData = ({
  isLoading,
  title,
  value,
  showHoneyIcon,
  borderBottom,
}: ReferralsDataProps) => {
  return (
    <div
      className={cn(
        "flex w-full justify-between gap-2",
        borderBottom && "border-b pb-4",
      )}
    >
      <p
        className={cn(
          "font-['IBM Plex Sans'] min-w-20 self-center text-sm font-semibold leading-tight",
          isLoading ? "text-muted-foreground" : "text-foreground",
        )}
      >
        {title}
      </p>
      <div className="flex w-auto flex-row items-center gap-2 truncate">
        {isLoading ? (
          <Skeleton className="h-[28px] w-20" />
        ) : (
          <>
            {showHoneyIcon && (
              <Image
                src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/honey.png"
                alt="Honey"
                width={20}
                height={20}
              />
            )}
            <span className="font-['IBM Plex Sans'] self-center truncate text-lg font-semibold text-foreground">
              {value}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

const ReferralCard = ({ bgId, title, text }: ReferralCardProps) => {
  return (
    <div className="relative h-[260px] w-full rounded-lg border border-warning-foreground dark:border-border">
      <Image
        src={`${cloudinaryUrl}/BERPS/${bgId}`}
        alt={`Referral Card Image - ${bgId}`}
        className="h-full rounded-lg object-cover"
        fill
      />
      <div className="z-1 absolute flex h-full w-full flex-col justify-end rounded-lg">
        <span className="font-['IBM Plex Sans'] mb-2 text-center text-xl font-semibold text-foreground">
          {title}
        </span>
        <span className="font-['IBM Plex Sans'] mx-4 mb-4 flex h-[60px] items-center text-center text-xs font-medium leading-tight text-foreground">
          {text}
        </span>
      </div>
    </div>
  );
};

export default function Referrals() {
  const [generated, setGenerated] = useState(false);
  const { isConnected, account } = useBeraJs();
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);

  const { isLoading, useGetReferralsDetails } = usePollReferralsDetails();
  const { isLoading: isReferralLoading, useGetTraderReferrer } =
    usePollTraderReferral(account ?? "");

  const traderReferrer = useGetTraderReferrer();
  const userReferralData = useGetReferralsDetails();
  const referredHoney = useMemo(() => {
    return formatFromBaseUnit(
      userReferralData?.volumeReferredHoney ?? 0,
      18,
    ).toString(10);
  }, [userReferralData?.volumeReferredHoney]);
  const totalRewards = useMemo(() => {
    return formatFromBaseUnit(
      userReferralData?.totalRewardsValueHoney ?? 0,
      18,
    ).toString(10);
  }, [userReferralData?.totalRewardsValueHoney]);

  const handleButtonClick = useCallback(async () => {
    if (!generated) {
      setGenerated(true);
      setReferralLink(`${perpsUrl}/berpetuals?ref=${account}`);
    } else {
      {
        try {
          await navigator.clipboard.writeText(referralLink);
          setCopied(true);
        } catch (error) {
          console.error(error);
        } finally {
          setTimeout(() => setCopied(false), 1000);
        }
      }
    }
  }, [setGenerated, isConnected, generated, referralLink, account, setCopied]);

  return (
    <div className="mx-auto mt-8 flex w-full flex-col gap-2">
      {/* Title */}
      <div>
        <div className="text-2xl font-semibold leading-8">Refer & Earn</div>
        <div className="text-sm text-muted-foreground">
          Invite your friends to trade on berps and earn BGT/Honey
        </div>
      </div>
      {/* Referral code link */}
      <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row">
        <Input
          value={
            isConnected
              ? !generated
                ? "Generate a Referral Code"
                : referralLink
              : "Connect Wallet to Generate Referral Code"
          }
          disabled={!isConnected}
          className={cn(
            "font-['IBM Plex Sans'] h-11 truncate border-accent bg-[#FEFCE8] px-3 py-2 pl-9 text-xl font-semibold text-accent focus:border-accent focus:bg-[#FEF08A] disabled:border-muted-foreground dark:bg-[#1D1401] dark:focus:bg-[#423C00]",
          )}
          readOnly
          startAdornment={<Icons.link2 className="h-4 w-4" />}
        />
        {!isConnected ? (
          <Connect />
        ) : (
          <Button
            className="h-11 min-w-32 rounded-xl bg-accent px-4 py-2"
            onClick={handleButtonClick}
          >
            <div className="flex">
              {generated ? (
                copied ? (
                  <>
                    <Icons.check className="mr-2 h-4 w-4 self-center" />
                    Copied
                  </>
                ) : (
                  <>
                    <Icons.copy className="mr-2 h-4 w-4 self-center" />
                    Copy
                  </>
                )
              ) : (
                <>
                  <Icons.link2 className="mr-2 h-4 w-4 self-center" />
                  Generate
                </>
              )}
            </div>
          </Button>
        )}
      </div>
      {/* Cards */}
      <div className="hidden sm:block">
        <div className="mt-4 hidden justify-between gap-6 dark:flex">
          <ReferralCard
            bgId={"Frame_Dark_3_obukzi"}
            title="Refer Friends"
            text="Share your unique referral link to start earning some BGT Rewards."
          />
          <ReferralCard
            bgId={"Frame_Dark_2_oax7ew"}
            title="New Users"
            text="When a new user enters & deposits via your link, they become your referral."
          />
          <ReferralCard
            bgId={"Frame_Dark_1_hb3r9r"}
            title="Details"
            text="Honey Rewards accumulate in real-time and disperse to your wallet as soon as the platform collect’s the fee."
          />
        </div>
        <div className="mt-4 flex justify-between gap-6 dark:hidden ">
          <ReferralCard
            bgId={"Frame_Light_3_mkjrlm"}
            title="Refer Friends"
            text="Share your unique referral link to start earning some BGT Rewards."
          />
          <ReferralCard
            bgId={"Frame_Light_2_rai62d"}
            title="New Users"
            text="When a new user enters & deposits via your link, they become your referral."
          />
          <ReferralCard
            bgId={"Frame_Light_1_apajeb"}
            title="Details"
            text="Honey Rewards accumulate in real-time and disperse to your wallet as soon as the platform collect’s the fee."
          />
        </div>
      </div>
      {/* Referrer */}
      <div className="mt-4 flex h-full w-full flex-col gap-4 rounded-md border border-border px-6 py-4">
        <ReferralsData
          isLoading={isReferralLoading}
          title="Referred by"
          value={
            traderReferrer && traderReferrer !== BLANK_WALLET_ADDRESS
              ? traderReferrer
              : "N/A"
          }
        />
      </div>
      {/* Referral Stats */}
      <div className="mt-4 flex h-full w-full flex-col gap-4 rounded-md border border-border px-6 py-4">
        <ReferralsData
          isLoading={isLoading}
          title="Traders Referred"
          value={userReferralData?.tradersReferred?.length}
          borderBottom
        />
        <ReferralsData
          isLoading={isLoading}
          title="Total Referral Volume"
          showHoneyIcon
          value={referredHoney}
          borderBottom
        />
        <ReferralsData
          isLoading={isLoading}
          title="Total Rewards from Referral Volume"
          showHoneyIcon
          value={totalRewards}
          borderBottom
        />
        <div className="flex w-full justify-between pb-2">
          <p
            className={cn(
              "font-['IBM Plex Sans'] self-center text-sm font-semibold leading-tight",
              isLoading ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {
              "By copying the referral code you are accepting the terms and conditions listed in BeraPerps “use of service” agreement."
            }
          </p>
        </div>
      </div>
    </div>
  );
}
