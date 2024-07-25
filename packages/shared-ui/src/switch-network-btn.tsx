import { useState } from "react";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useChainId } from "@bera/berajs";

export const SwitchNetworkBtn = ({ className }: { className?: string }) => {
  const { walletConnector } = useDynamicContext();
  const chainId = useChainId();
  const [switching, setSwitching] = useState(false);
  return (
    <Button
      onClick={async () => {
        if (walletConnector?.supportsNetworkSwitching()) {
          setSwitching(true);
          try {
            await walletConnector.switchNetwork({
              networkChainId: chainId as number,
            });
          } catch (e) {
            console.log("Error switching network", e);
          }
          setSwitching(false);
        }
      }}
      disabled={switching}
      className={cn("w-full", className)}
    >
      {switching ? "Switching..." : "Wrong network"}
    </Button>
  );
};
