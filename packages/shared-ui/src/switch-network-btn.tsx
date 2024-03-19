import { useState } from "react";
import { defaultBeraConfig } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export const SwicthNetworkBtn = ({ className }: { className?: string }) => {
  const { walletConnector } = useDynamicContext();
  const [switching, setSwitching] = useState(false);
  return (
    <Button
      onClick={async () => {
        if (walletConnector?.supportsNetworkSwitching()) {
          setSwitching(true);
          try {
            await walletConnector.switchNetwork({
              networkChainId: defaultBeraConfig.chain.id,
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
