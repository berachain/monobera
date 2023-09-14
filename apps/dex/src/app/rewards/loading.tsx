import { Skeleton } from "@bera/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex w-full max-w-[1000px] flex-col gap-4 ">
      <div className="flex justify-between">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-8 w-1/4" />
      </div>
      {[0, 0, 0, 0].map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-muted p-4 sm:p-8">
      <div className="flex flex-row-reverse gap-3 lg:flex-row">
        <div>
          <Skeleton className="h-8 w-[120px] lg:w-[150px]" />{" "}
          <Skeleton className="mt-3 h-8 w-[60px] lg:w-[150px]" />
        </div>
        <Skeleton className="hidden h-[72px] w-[120px] lg:block" />
        <Skeleton className="hidden h-[72px] w-[120px] md:block" />
        <Skeleton className="hidden h-[72px] w-[72px] sm:block md:w-[120px]" />
        <Skeleton className="h-[72px] w-[72px] md:w-[120px]" />
      </div>
      <Skeleton className="h-8 w-16 sm:w-[108px]" />
    </div>
  );
}
