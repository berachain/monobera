import { useEffect } from "react";
import Link from "next/link";
import { bgtUrl, docsUrl, honeyUrl } from "@bera/config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { useLocalStorage } from "usehooks-ts";

const BerachainInfo = () => {
  const [hasVisitedBefore, setHasVisitedBefore] = useLocalStorage<
    boolean | undefined
  >("hasVisitedBefore", undefined);

  useEffect(() => {
    if (!hasVisitedBefore) {
      setHasVisitedBefore(false);
    }
  }, []);

  if (hasVisitedBefore || hasVisitedBefore === undefined) return null;

  return (
    <Card className="relative h-fit w-full rounded-xl bg-opacity-95 p-8 md:w-fit">
      <Icons.close
        className="absolute right-3 top-4 h-4 w-4 text-secondary-foreground hover:cursor-pointer"
        onClick={() => setHasVisitedBefore(true)}
      />

      <CardHeader className="px-2 pb-3 pt-0">
        <CardTitle className="center flex justify-between whitespace-nowrap text-2xl">
          🌱 New to 🐻 Berachain?
        </CardTitle>
        <CardDescription>
          Here’s a few things you can do to get started.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 p-2 text-muted-foreground">
        <Link
          className="flex flex-row items-center gap-1 hover:cursor-pointer hover:text-foreground"
          href={`${docsUrl}/learn/how-to-connect-a-wallet-with-berachain`}
          target="_blank"
        >
          <span className="text-lg font-semibold">Create a Wallet</span>
          <Icons.external className="h-4 w-4" />
        </Link>
        <Link
          href={honeyUrl}
          target="_blank"
          className="flex flex-row items-center gap-1 hover:cursor-pointer hover:text-foreground"
        >
          <span className="text-lg font-semibold">Mint Honey</span>
          <Icons.external className="h-4 w-4" />
        </Link>
        <Link
          href={bgtUrl}
          target="_blank"
          className="flex flex-row items-center gap-1 hover:cursor-pointer hover:text-foreground"
        >
          <span className="text-lg font-semibold">Stake on BGT Station</span>
          <Icons.external className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default BerachainInfo;
