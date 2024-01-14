"use client";

import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import { DripToken } from "~/components/drip-tokens";
import { TokenBadge } from "~/components/token-badge";
import AlertGroups from "../components/alert-groups";
import TwitterDialog from "../components/twitter-dialog";

export default function Content() {
  const [address, setAddress] = React.useState<string>("");
  const [alert, setAlert] = React.useState<
    "success" | "destructive" | "error" | undefined
  >(undefined);
  const [showAlet, setShowAlert] = React.useState<boolean>(false);
  const [twitterId, settwitterId] = React.useState<string | undefined>(false);

  return (
    <div className="flex w-full max-w-[600px] flex-col gap-8 text-stone-50 xl:max-w-[473px]">
      <div className="items-center justify-between text-center sm:flex sm:text-left">
        <div className="flex flex-col gap-4">
          <div className="leading-12 w-full text-5xl font-bold">
            Bootstrap Your
            <br /> Testnet Wallet
          </div>
          <div className="items-center text-lg font-semibold sm:flex">
            {" "}
            Fund your testnet wallet with <TokenBadge />
          </div>
        </div>
        <Image
          src={`${cloudinaryUrl}/faucet/faucet_v3_uktibg`}
          alt="machine"
          width={162}
          height={198}
          loading="eager"
          className="hidden h-[198px] object-cover sm:block xl:hidden"
        />
      </div>

      {!twitterId ? (
        <div className="flex flex-col gap-4">
          <TwitterDialog settwitterId={settwitterId} />
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="h-7 text-sm font-medium">
            Wallet Address{" "}
            <span className="text-destructive-foreground">*</span>
          </div>

          <div className="relative mb-4">
            <Input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (showAlet) setShowAlert(false);
              }}
            />
            <Icons.close
              className="absolute right-3 top-3 h-4 w-4 cursor-pointer text-muted-foreground"
              onClick={() => {
                setAddress("");
                if (showAlet) setShowAlert(false);
              }}
            />
          </div>
          <DripToken
            address={address}
            setAlert={setAlert}
            setShowAlert={() => setShowAlert(true)}
            twitterId={twitterId}
          />
        </div>
      )}

      <AlertGroups showAlet={showAlet} alert={alert} />

      <hr />
      <div className="leading-12 text-center text-sm opacity-70 sm:text-start">
        To ensure a sufficient balance for all users, the Faucet is set to
        dispense {process.env.NEXT_PUBLIC_FAUCET_DRIP_AMOUNT} testnet BERA
        tokens every {process.env.NEXT_PUBLIC_FAUCET_DRIP_TIME_GAP} hours.
      </div>
    </div>
  );
}
