import { type PropsWithChildren } from "react";
import { useBeraJs } from "@bera/berajs";
import { cn } from "@bera/ui";

import { ConnectButton } from "./connect-button";

interface Props extends PropsWithChildren {
  className?: string;
}
export const ActionButton = ({ children, className }: Props) => {
  const { isReady } = useBeraJs();

  return (
    <div className={cn("w-full", className)}>
      {isReady ? children : <ConnectButton className="w-full" />}
    </div>
  );
};
