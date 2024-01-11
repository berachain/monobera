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
          {`Validators can now point liquidity to ${appName}. Users may earn BGT after Artio Epoch 2.`}
        </div>
      </div>
    </header>
  );
};
