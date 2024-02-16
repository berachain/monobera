"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cloudinaryUrl, dexUrl } from "@bera/config";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { isAddress } from "viem";

import { DripToken } from "~/components/drip-tokens";
import NonSSRWrapper from "~/components/no-ssr-wrapper";
import { TokenBadge } from "~/components/token-badge";

export default function Content() {
  const [address, setAddress] = React.useState<string>("");
  const [alert, setAlert] = React.useState<
    "success" | "destructive" | "error" | undefined
  >(undefined);
  const [showAlet, setShowAlert] = React.useState<boolean>(false);
  const [inputError, setInputError] = React.useState<string | null>(null);

  const handleFaucetAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAddress(e.target.value);
    if (!e.target.value || isAddress(e.target.value)) {
      setInputError(null);
    } else {
      setInputError("Please enter a valid address. ex: 0x...");
    }
    if (showAlet) setShowAlert(false);
    setAlert(undefined);
  };

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
          unoptimized
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="h-7 text-sm font-medium">
          Wallet Address <span className="text-destructive-foreground">*</span>
        </div>
        <NonSSRWrapper>
          <div className="relative">
            <Input value={address} onChange={handleFaucetAddressChange} />
            <Icons.close
              className="absolute right-3 top-3 h-4 w-4 cursor-pointer text-muted-foreground"
              onClick={() => {
                setAddress("");
                setInputError(null);
                if (showAlet) setShowAlert(false);
                setAlert(undefined);
              }}
            />
          </div>
          {inputError && (
            <Alert variant={"destructive"}>
              <AlertTitle className="align-center flex gap-1">
                <Icons.alertCircle className="inline-block h-4 w-4" />
                {inputError}
              </AlertTitle>
            </Alert>
          )}
        </NonSSRWrapper>
      </div>
      {showAlet && alert === "success" && (
        <Alert variant={"success"}>
          <AlertTitle>
            <Icons.checkCircle className="inline-block h-4 w-4" /> Request
            Submitted
          </AlertTitle>
          <AlertDescription>
            You’ll receive the testnet tokens in your wallet in about 2 minutes.
            Use your BERA to acquire a basket of other tokens from our{" "}
            <Link
              href={dexUrl}
              target="_blank"
              className="cursor-pointer underline"
            >
              DEX
            </Link>
            .
          </AlertDescription>
        </Alert>
      )}
      {showAlet && alert === "destructive" && (
        <Alert variant={"destructive"}>
          <AlertTitle>
            {" "}
            <Icons.info className="inline-block h-4 w-4" /> Wallet Grey-listed
            for 8 hours
          </AlertTitle>
          <AlertDescription>
            To ensure a sufficient balance for all users, the Faucet is set to
            dispense testnet tokens every 8 hours. Please retry in 8 hours.
          </AlertDescription>
        </Alert>
      )}
      {showAlet && alert === "error" && (
        <Alert variant={"destructive"}>
          <AlertTitle>
            {" "}
            <Icons.XOctagon className="inline-block h-4 w-4" /> Oh no!
          </AlertTitle>
          <AlertDescription>
            We are currently experiencing high traffic, causing temporary
            unavailability of our service. Please try again in a few minutes. We
            apologize for any inconvenience and appreciate your patience.
          </AlertDescription>
        </Alert>
      )}
      <DripToken
        address={address}
        setAlert={setAlert}
        setShowAlert={() => setShowAlert(true)}
      />
      <hr />
      <div className="leading-12 text-center text-sm opacity-70 sm:text-start">
        To ensure a sufficient balance for all users, the Faucet is set to
        dispense {process.env.NEXT_PUBLIC_FAUCET_DRIP_AMOUNT} testnet BERA
        tokens every {process.env.NEXT_PUBLIC_FAUCET_DRIP_TIME_GAP} hours.
      </div>

      {/* <div className="leading-12 text-center text-sm text-muted-foreground sm:text-start">
        Faucet drips: 10 Bera, 10K HONEY, 10K STGUSDC, .01 BTC, and 0.25 ETH{" "}
        <br className="hidden md:block" />
        Every 210,000 blocks for each user.
      </div>
      <div className="flex flex-col items-center gap-2 sm:items-start">
        {" "}
        {Object.keys(tokenDictionary ?? {}).map((key) => (
          <TokenList token={tokenDictionary![key]!} key={key} />
        ))}
      </div> */}
    </div>
  );
}
