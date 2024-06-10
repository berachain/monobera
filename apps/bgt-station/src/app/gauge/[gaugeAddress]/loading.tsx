import { Skeleton } from "@bera/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8">
      <HeaderLoading />
      <hr />
      <div className="flex gap-4">
        <ActionLoading />
        <UserLoading />
      </div>
      <TableLoading />
    </div>
  );
}

export const HeaderLoading = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-6 w-40 rounded-sm" />
    <div className="flex items-center gap-3">
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="h-6 w-80 rounded-sm" />
    </div>
    <Skeleton className="h-6 w-80 rounded-sm" />
  </div>
);

export const ActionLoading = () => (
  <div className="flex w-full flex-col gap-4">
    <Skeleton className="h-10 w-full rounded-sm" />
    <div className="flex w-full flex-col gap-4 rounded-sm border border-border p-4">
      <Skeleton className="h-6 w-40 rounded-sm" />
      <Skeleton className="h-6 w-80 rounded-sm" />
      <Skeleton className="h-24 w-full rounded-sm" />
      <Skeleton className="h-12 w-full rounded-sm" />
    </div>
  </div>
);

export const UserLoading = () => (
  <div className="flex w-[400px] flex-col gap-4">
    <div className="flex flex-col gap-8 rounded-sm border border-border p-4">
      <Skeleton className="h-6 w-40 rounded-sm" />
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-40 rounded-sm" />
        </div>
        <Skeleton className="h-6 w-32 rounded-sm" />
      </div>
    </div>

    <div className="flex flex-col gap-8 rounded-sm border border-border p-4">
      <Skeleton className="h-6 w-40 rounded-sm" />
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-40 rounded-sm" />
        </div>
        <Skeleton className="h-6 w-32 rounded-sm" />
      </div>
      <Skeleton className="h-12 w-full rounded-sm" />
    </div>
  </div>
);

export const TableLoading = () => (
  <div className="flex flex-col gap-4">
    <Skeleton className="h-11 w-full rounded-sm" />
    <Skeleton className="h-56 w-full rounded-sm" />
  </div>
);
