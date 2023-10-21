import { Skeleton } from "@bera/ui/skeleton";

export default function LoadingPortfolio() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="container flex w-full flex-col gap-16 pt-[32px]">
      <div className="flex flex-col gap-4 lg:flex-row">
        <Skeleton className="flex h-[300px] w-full flex-shrink-0 flex-col gap-8 rounded-xl border border-border bg-muted px-4 py-6 lg:w-[270px]" />
        <Skeleton className="flex h-[300px] w-full flex-col justify-between rounded-xl border border-border bg-muted px-4  py-6" />
      </div>
      <div className="flex flex-col gap-4">
        {[0, 0, 0].map((_: any, i: number) => (
          <Skeleton className="h-[75px] w-full rounded-2xl" key={i} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {[0, 0, 0].map((_: any, i: number) => (
          <Skeleton className="h-[75px] w-full rounded-2xl" key={i} />
        ))}
      </div>
    </div>
  );
}
