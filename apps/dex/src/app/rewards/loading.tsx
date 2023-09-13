import { Skeleton } from "@bera/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-4">
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
    <div className="flex w-full items-center justify-between bg-muted p-8">
      <div className="flex gap-3">
        <div>
          <Skeleton className="h-8 w-[150px]" />{" "}
          <Skeleton className="mt-3 h-8 w-[150px]" />
        </div>
        <Skeleton className="h-[72px] w-[120px]" />
        <Skeleton className="h-[72px] w-[120px]" />
        <Skeleton className="h-[72px] w-[120px]" />
        <Skeleton className="h-[72px] w-[120px]" />
      </div>
      <Skeleton className="h-8 w-[108px]" />
    </div>
  );
}
