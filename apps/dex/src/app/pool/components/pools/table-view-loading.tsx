import { Skeleton } from "@bera/ui/skeleton";

export default function TableViewLoading() {
  return (
    <div className="mt-16 flex flex-col items-center gap-4">
      <Skeleton className="h-[150px] w-[238px]" />
      <Skeleton className="h-7 w-[300px]" />
      <Skeleton className="h-7 w-[451px]" />
      <Skeleton className="h-7 w-[130px]" />
    </div>
  );
}
