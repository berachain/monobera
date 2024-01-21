import { cn } from "@bera/ui";

export const LaunchBanner = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <header
      className={cn(
        "top-[72px] z-50 flex h-12 w-[100vw] items-center justify-center gap-2 bg-destructive-foreground px-1 py-3 text-white",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <div className="md:text-md text-sm font-semibold leading-tight">
        We are currently upgrading our infrastructure to meet the increased demand. Please bear with us; we will be back shortly.
        </div>
      </div>
    </header>
  );
};
