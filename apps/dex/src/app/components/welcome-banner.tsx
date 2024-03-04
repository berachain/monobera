import { Icons } from "@bera/ui/icons";

export default function WelcomeBanner() {
  return (
    <div className="flex w-full items-center justify-center gap-1 py-3">
      <div className="w-fit text-2xl font-semibold leading-8">
        🌱 New to 🐻 Berachain?
      </div>
      <div className="flex w-fit items-center gap-1 text-sm text-muted-foreground">
        Kick off your journey with these helpful tips.
        <Icons.externalLink className="h-4 w-4" />
      </div>
    </div>
  );
}
