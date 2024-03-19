"use client";

import { useBeraJs } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { DynamicConnectButton } from "@dynamic-labs/sdk-react-core";

import ConnectedWalletPopover from "./connected-wallet-popover";
import { SwicthNetworkBtn } from "./switch-network-btn";

export const ConnectButton = ({
  className,
  isNavItem = false,
  isHoney = false,
  btnClassName,
}: {
  className?: string;
  isNavItem?: boolean;
  isHoney?: boolean;
  btnClassName?: string;
}) => {
  const { isConnected, isWrongNetwork, isReady } = useBeraJs();
  return (
    <div className={className}>
      {!isConnected && (
        <DynamicConnectButton>
          <Button
            className={cn(
              "w-full gap-2",
              !isNavItem && "font-semibold",
              btnClassName,
            )}
          >
            <Icons.wallet className={cn("h-4 w-4", !isNavItem && "h-6 w-6")} />
            Connect
          </Button>
        </DynamicConnectButton>
      )}
      {isWrongNetwork && isConnected && (
        <SwicthNetworkBtn className={btnClassName} />
      )}
      {isReady && <ConnectedWalletPopover isHoney={isHoney} />}
    </div>
  );
};
