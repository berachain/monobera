import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import dynamic from "next/dynamic";

const ConnectBtn = dynamic(
    () => import("@bera/shared-ui").then((mod) => mod.ConnectButton),
    {
      ssr: false,
      loading: () => (
        <Button>
          {" "}
          <Icons.spinner className="relative mr-1 h-6 w-6 animate-spin" />
          Loading
        </Button>
      ),
    },
  );

export default function ConnetWallet() {
  return (
    <div className="h-full rounded-sm border border-border bg-background">
      <div className="mx-auto flex w-full max-w-[480px] flex-col items-center gap-3 mt-6">
        <div className="h-[170px] w-[300px] bg-warning-foreground"></div>
        <div className="text-3xl leading-9 text-foreground">
          Connect your wallet
        </div>
        <div className="leading-6 text-muted-foreground text-center">
          Validators must be invited to the game and should connect their
          wallets to play the game.
        </div>
        <ConnectBtn/>
      </div>
    </div>
  );
}
