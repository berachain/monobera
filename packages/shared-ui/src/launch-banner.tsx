import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";

export const LaunchBanner = ({
  appName,
  className,
}: {
  appName: string;
  className?: string;
}) => {
  return (
    <header
      className={cn(
        "top-[72px] z-50 flex h-12 w-[100vw] items-center justify-center gap-2 bg-warning-foreground px-1 py-3 text-white",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Icons.clock8 className="h-4 w-4" />
        <div className="md:text-md text-sm font-semibold leading-tight">
          {`Validators can now point liquidity to ${appName}. Users may earn BGT after Artio Epoch 9.`}
        </div>
      </div>
    </header>
  );
};

export const RPCBanner = ({ className }: { className?: string }) => {
  return (
    <header
      className={cn(
        "top-[72px] z-50 flex h-12 w-[100vw] items-center justify-center gap-2 bg-destructive-foreground px-1 py-3 text-white",
        className,
      )}
    >
      <div className="md:text-md text-center text-xs font-semibold leading-tight md:text-sm">
        {/* We are currently upgrading our infrastructure to meet the increased
        demand. Please bear with us; we will be back shortly. */}
        We are currently performing system-wide updates. Our services will be
        temporarily unavailable, but we&apos;ll be back up shortly.
      </div>
    </header>
  );
};

export const BerpsBanner = ({
  className,
}: {
  appName: string;
  className?: string;
}) => {
  return (
    <header
      className={cn(
        "top-[72px] z-50 flex h-12 w-[100vw] items-center justify-center gap-2 bg-warning-foreground px-1 py-3 text-white",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Icons.clock8 className="h-4 w-4" />
        <div className="md:text-md text-sm font-semibold leading-tight">
          {`Berps will undergo an upgrade on Sunday, January 28th, 2024, at 02:15 AM UTC. Please close your positions and withdraw HONEY`}
        </div>
      </div>
    </header>
  );
};