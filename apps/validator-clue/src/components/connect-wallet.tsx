import dynamic from "next/dynamic";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { IMGMap } from "~/utils/image-map";

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
      <div className="mx-auto flex w-full max-w-[480px] flex-col items-center gap-3 py-6">
        <Image
          src={`${cloudinaryUrl}/clue/${IMGMap["connect-wallet-bear"]}`}
          alt="connect-wallet-bear"
          width={218}
          height={164}
        />
        <div className="font-retro-gaming text-3xl leading-9 text-foreground">
          Connect your wallet
        </div>
        <div className="font-retro-gaming text-center leading-6 text-muted-foreground">
          Validators must be invited to the game and should connect their
          wallets to play the game.
        </div>
        <ConnectBtn />
      </div>
    </div>
  );
}
