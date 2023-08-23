import { useEffect } from "react";
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
        <div className="flex flex-row items-center gap-1 hover:cursor-pointer hover:text-foreground">
          {/* <Icons.userPlus className="h-4 w-4" /> */}
          <span className="text-lg font-semibold">Create a Wallet</span>
          <Icons.external className="h-4 w-4" />
        </div>
        <div className="flex flex-row items-center gap-1 hover:cursor-pointer hover:text-foreground">
          {/* <Icons.hammer className="h-4 w-4" /> */}
          <span className="text-lg font-semibold">Mint Honey</span>
          <Icons.external className="h-4 w-4" />
        </div>
        <div className="flex flex-row items-center gap-1 hover:cursor-pointer hover:text-foreground">
          {/* <Icons.helpingHand className="h-4 w-4" /> */}
          <span className="text-lg font-semibold">Stake on BGT Station</span>
          <Icons.external className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BerachainInfo;
