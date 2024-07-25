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
      <div className="z-3 relative flex w-full flex-1 flex-col justify-center gap-6 rounded-xl border border-border px-4 py-3">
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
          <Image
            className=" w-full rounded-t-lg "
            src={`${cloudinaryUrl}/Station/Developer_Docs_xffp1c.png`}
            alt="bg-dark"
            width={214}
            height={154}
          />
        </div>
      </div>
      <div className="z-3 relative flex w-full flex-1 flex-col justify-center gap-6 rounded-xl border border-border px-4 py-3">
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
            className="border-borde w-fit rounded-sm border p-3"
          >
            <Icons.discord className="h-8 w-8" />
          </Link>
          <Link
            href={twitter}
            target="__blank"
            className="border-borde w-fit rounded-sm border p-3"
          >
            <Icons.elonMusk className="h-8 w-8" />
          </Link>
          <Link
            href={telegram}
            target="__blank"
            className="border-borde w-fit rounded-sm border p-3"
          >
            <Icons.telegram className="h-8 w-8" />
          </Link>
        </div>
        <div className="absolute right-0 z-[-1]">
          <Image
            className="w-full rounded-t-lg "
            src={`${cloudinaryUrl}/Station/Community_rvpwo5.png`}
            alt="bg-dark"
            height={289}
            width={272}
          />
        </div>
      </div>
    </div>
  );
};
