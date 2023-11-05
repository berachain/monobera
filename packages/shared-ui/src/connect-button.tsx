"use client";

import { Button } from "@bera/ui/button";
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";
import { useBeraJs } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";

import ConnectedWalletPopover from "./connected-wallet-popover";

export const ConnectButton = ({
  className,
  isNavItem = false,
  isHoney = false,
}: {
  className?: string;
  isNavItem?: boolean;
  isHoney?: boolean;
}) => {
  const { isWrongNetwork, isReady, account: altAccount } = useBeraJs();
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        console.log({
          account,
          altAccount,
          chain,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        });
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          altAccount &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className={cn("flex w-full", className)}
          >
            {!connected && (
              <Button
                onClick={openConnectModal}
                type="button"
                className={cn("w-full gap-2", !isNavItem && "font-semibold")}
              >
                <Icons.wallet
                  className={cn("h-4 w-4", !isNavItem && "h-6 w-6")}
                />
                Connect
              </Button>
            )}
            {isWrongNetwork && (
              <Button onClick={openChainModal} type="button" className="w-full">
                Wrong network
              </Button>
            )}
            {isReady && <ConnectedWalletPopover isHoney={isHoney} />}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};
