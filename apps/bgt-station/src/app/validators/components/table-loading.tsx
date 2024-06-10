import { Skeleton } from "@bera/ui/skeleton";

export const TableLoading = () => {
  return (
    <div className="flex w-full flex-col gap-2 min-w-[900px] overflow-x-scroll">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
};
