import { Skeleton } from "@bera/ui/skeleton";

export default function LoadingPortfolio() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="container flex w-full max-w-[1200px] flex-col gap-16 pt-[32px]">
      <div className="flex w-full flex-col gap-2 lg:flex-row">
        {/* Current open positions + stats */}
        <div className="flex h-full w-full flex-col gap-4 md:flex-row lg:w-[270px] lg:flex-col">
          <Skeleton className="h-[148px] w-full rounded-md lg:w-[270px]" />
          <Skeleton className="h-[148px] w-full rounded-md lg:w-[270px]" />
        </div>
        <div />
        {/* Berachart */}
        <div className="h-[350px] w-full md:h-[310px]">
          <Skeleton className="h-[350px] w-full rounded-md md:h-[310px]" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {[0, 0, 0].map((_: any, i: number) => (
          <Skeleton className="h-[75px] w-full rounded-md" key={i} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {[0, 0, 0].map((_: any, i: number) => (
          <Skeleton className="h-[75px] w-full rounded-md" key={i} />
        ))}
      </div>
    </div>
  );
}
