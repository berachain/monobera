import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";

import { IMGMap } from "~/utils/image-map";
import { SignInButton } from "~/components/sign-in-btn";

export default function SIWE() {
  return (
    <div className="h-full rounded-sm border border-border bg-background">
      <div className="mx-auto py-6 flex w-full max-w-[480px] flex-col items-center gap-3">
        <Image
          src={`${cloudinaryUrl}/clue/${IMGMap["sign-in-bear"]}`}
          alt="sign-in-bear"
          width={181}
          height={170}
        />
        <div className="text-3xl leading-9 text-foreground">
          Sign-in with Ethereum
        </div>
        <div className="text-center leading-6 text-muted-foreground">
          Please sign-in with your ethereum wallet to access the game.
        </div>
        <SignInButton />
      </div>
    </div>
  );
}
