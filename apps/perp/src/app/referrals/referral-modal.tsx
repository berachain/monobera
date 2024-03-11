"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  REFERRALS_ABI,
  TransactionActionType,
  useBeraJs,
  usePollReferralsDetails,
  usePollTraderReferral,
} from "@bera/berajs";
import { perpsReferralsAddress } from "@bera/config";
import { useTxn } from "@bera/shared-ui/src/hooks";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { isAddress } from "viem";
import { ConnectButton } from "@bera/shared-ui";

const BLANK_WALLET_ADDRESS = "0x0000000000000000000000000000000000000000";

export const ReferralModal = () => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();

  const { write, ModalPortal, isSuccess } = useTxn({
    actionType: TransactionActionType.REFER,
    message: "Activating Referral",
  });

  useEffect(() => setOpen(false), [isSuccess]);

  const referralsContract = perpsReferralsAddress;

  const { isConnected, account } = useBeraJs();

  const referralAddress = useMemo(() => {
    const ref = searchParams.get("ref");
    if (isAddress(ref ?? "")) {
      return ref;
    }
    return null;
  }, [searchParams]);

  const { isLoading, useGetTraderReferrer } = usePollTraderReferral(
    account ?? "",
  );

  const { isLoading: isLoadingDetails, useGetReferralsDetails } =
    usePollReferralsDetails();

  const traderReferralData = useGetReferralsDetails();

  const traderReferral = useGetTraderReferrer();

  const disabled = useMemo(() => {
    if (
      isConnected &&
      !traderReferralData?.tradersReferred.some(
        (trader: string) => trader === referralAddress,
      ) &&
      referralAddress !== account
    ) {
      return false;
    }
    return true;
  }, [isConnected, traderReferralData, referralAddress, account]);

  useEffect(() => {
    if (
      !isLoading &&
      !isLoadingDetails &&
      referralAddress &&
      (traderReferral === BLANK_WALLET_ADDRESS || !isConnected) &&
      isAddress(referralAddress ?? "")
    ) {
      setOpen(true);
    }
  }, [
    traderReferral,
    isLoading,
    isLoadingDetails,
    referralAddress,
    isConnected,
  ]);

  return (
    <>
      <div className="">{ModalPortal}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[340px] w-[300px] overflow-y-hidden pb-6 focus:outline-none md:h-fit">
          <div className="flex h-full w-full flex-col gap-2">
            <Icons.ticket className="h-16 w-16 self-center text-accent" />
            <div className="font-['IBM Plex Sans'] text-center text-lg font-semibold text-foreground">
              Confirm Referral
            </div>
            <p className="text-neutral-foreground font-['IBM Plex Sans'] mb-2 text-center text-sm font-normal">
              Complete a one-time transaction to finalize your referral setup
              and start earning rewards.
            </p>
            {isConnected ? (
              <Button
                onClick={() =>
                  write({
                    address: referralsContract,
                    abi: REFERRALS_ABI,
                    functionName: "registerPotentialReferrer",
                    params: [referralAddress],
                  })
                }
                className="flex-1"
                disabled={disabled}
              >
                {`${
                  disabled
                    ? "Invalid Referral Address"
                    : "Enable Referral Rewards"
                }`}
              </Button>
            ) : (
              <div className="self-center">
                <ConnectButton
                  className="w-full"
                  onOpen={() => setOpen(false)}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
