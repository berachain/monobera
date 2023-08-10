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

export const BerachainInfo = () => {
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
    <Card className="h-fit w-full rounded-xl p-2 md:w-fit">
      <div className="flex w-full justify-end">
        <Icons.close
          className="h-4 w-4"
          onClick={() => setHasVisitedBefore(true)}
        />
      </div>
      <CardHeader className="px-2 pb-3 pt-0">
        <CardTitle className="center flex justify-between whitespace-nowrap text-2xl">
          🌱 New to 🐻 Berachain?
        </CardTitle>
        <CardDescription>
          Here’s a few things you can do to get started.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-2">
        <div className="flex flex-row items-center gap-2">
          <Icons.userPlus className="h-6 w-6" />
          <span className="text-lg font-semibold">Create a Wallet</span>
          <Icons.arrowRight className="h-4 w-4" />
        </div>
        <div className="flex flex-row items-center gap-2">
          <Icons.hammer className="h-6 w-6" />
          <span className="text-lg font-semibold">Mint Honey</span>
          <Icons.arrowRight className="h-4 w-4" />
        </div>
        <div className="flex flex-row items-center gap-2">
          <Icons.helpingHand className="h-6 w-6" />
          <span className="text-lg font-semibold">Stake on BGT Station</span>
          <Icons.arrowRight className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
};
