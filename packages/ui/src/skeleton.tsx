import { cn } from "./utils/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-border", className)}
      {...props}
    />
  );
}

export { Skeleton };
