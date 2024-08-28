"use client";

import dynamic from "next/dynamic";
import { useBeraJs } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import ConnectedWalletPopover from "./connected-wallet-popover";
import { SwitchNetworkBtn } from "./switch-network-btn";

const DynamicConnectButton = dynamic(
  () =>
    import("@dynamic-labs/sdk-react-core").then(
      (mod) => mod.DynamicConnectButton,
    ),
  {
    ssr: false,
    loading: () => (
      <Button className="w-full">
        <Icons.spinner className="relative mr-1 h-6 w-6 animate-spin" />
        Loading
      </Button>
    ),
  },
);

export const ConnectButton = ({
  className,
  isNavItem = false,
  isHoney = false,
  isPopover = true,
}: {
  className?: string;
  isNavItem?: boolean;
  isHoney?: boolean;
  isPopover?: boolean;
}) => {
  const { isConnected, isWrongNetwork, isReady } = useBeraJs();
  return (
    <>
      {!isConnected && (
        <DynamicConnectButton buttonClassName={"w-full"}>
          <Button
            className={cn(
              "w-full gap-2",
              !isNavItem && "font-semibold",
              className,
            )}
            as="div"
          >
            <Icons.wallet className={cn("h-4 w-4", !isNavItem && "h-6 w-6")} />
            Connect
          </Button>
        </DynamicConnectButton>
      )}
      {isWrongNetwork && isConnected && (
        <SwitchNetworkBtn className={className} />
      )}
      {isReady && (
        <ConnectedWalletPopover isPopover={isPopover} isHoney={isHoney} />
      )}
    </>
  );
};
