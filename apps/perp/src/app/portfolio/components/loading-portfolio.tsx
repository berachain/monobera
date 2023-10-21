import { Skeleton } from "@bera/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="container flex flex-col gap-4 pt-[32px] lg:flex-row">
      <Skeleton className="flex h-[300px] w-full flex-shrink-0 flex-col gap-8 rounded-xl border border-border bg-muted px-4 py-6 lg:w-[270px]" />
      <Skeleton className="flex h-[300px] w-full flex-col justify-between rounded-xl border border-border bg-muted px-4  py-6" />
    </div>
  );
}
