import Image from "next/image";
import Link from "next/link";
import {
  cloudinaryUrl,
  discord,
  docsUrl,
  telegram,
  twitter,
} from "@bera/config";
import { Icons } from "@bera/ui/icons";

export const Resources = () => {
  return (
    <div className="grid w-full auto-rows-[348px] grid-cols-1 justify-center gap-4 lg:grid-cols-2">
      <div className="relative z-[3] flex w-full flex-1 flex-col justify-center gap-6 rounded-xl border-[1px] border-border bg-black px-4 py-3">
        <div className="text-4xl font-bold">
          Dive Into The <br />
          Documentation.
        </div>
        <div className="mb-4 max-w-[70%] text-sm text-muted-foreground">
          Are you a fellow builder in the making?
          <br /> Check out our docs to start building on BeraChain today.
        </div>
        <Link
          href={docsUrl}
          target="__blank"
          className="w-40  rounded-sm bg-primary p-2 text-center text-sm text-primary-foreground"
        >
          Read Docs
        </Link>
        <div className="absolute  right-0 z-[-1]">
          <img
            className=" w-full rounded-t-lg "
            src={`${cloudinaryUrl}/Station/Developer_Docs_xffp1c.png`}
            alt="bg-dark"
          />
        </div>
      </div>
      <div className="relative z-[3] flex w-full flex-1 flex-col justify-center gap-6 rounded-xl border-[1px] border-border bg-black px-4 py-3">
        <div className="text-4xl font-bold">
          Join The <br />
          Community.
        </div>
        <div className="mb-4 max-w-[70%] text-sm text-muted-foreground">
          Eager to connect and learn with fellow enthusiasts? Explore and join
          our vibrant community.
        </div>
        <div className="flex flex-row gap-6">
          <Link
            href={discord}
            target="__blank"
            className="w-fit rounded-xs border-[1px] border-border bg-black p-3"
          >
            <Icons.discordSquare width={40} height={40} />
          </Link>
          <Link
            href={twitter}
            target="__blank"
            className="w-fit rounded-xs border-[1px] border-border bg-black p-3"
          >
            <Icons.twitterX width={40} height={38} />
          </Link>
          <Link
            href={telegram}
            target="__blank"
            className="w-fit rounded-xs border-[1px] border-border bg-black p-3"
          >
            <Icons.telegram width={40} height={40} />
          </Link>
        </div>
        <div className="absolute right-0 z-[-1]">
          <img
            className=" w-full rounded-t-lg "
            src={`${cloudinaryUrl}/Station/Community_rvpwo5.png`}
            alt="bg-dark"
          />
        </div>
      </div>
    </div>
  );
};
