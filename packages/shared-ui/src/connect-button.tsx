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
  isNavItem,
}: {
  className?: string;
  isNavItem?: boolean;
}) => {
  const { isConnected } = useBeraJs();
  return (
    <RainbowConnectButton.Custom>
      {({
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";

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
            {(() => {
              if (!isConnected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    type="button"
                    className={cn(
                      "w-full gap-2",
                      !isNavItem && "font-semibold",
                    )}
                  >
                    <Icons.wallet
                      className={cn("h-4 w-4", !isNavItem && "h-6 w-6")}
                    />
                    Connect
                  </Button>
                );
              }

              if (chain?.unsupported) {
                return (
                  <Button onClick={openChainModal} type="button">
                    Wrong network
                  </Button>
                );
              }

              return <ConnectedWalletPopover />;
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};
