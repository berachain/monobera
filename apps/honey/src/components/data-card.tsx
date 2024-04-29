import { cn } from "@bera/ui";
import { Skeleton } from "@bera/ui/skeleton";

export default function DataCard({
  icon,
  title,
  value,
  isLoading,
}: {
  icon: React.ReactNode;
  title: string;
  value: any;
  isLoading?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col rounded-2xl border-2 border-border-secondary bg-card bg-opacity-20 p-6 backdrop-blur-xl dark:border-[3px] dark:border-dashed dark:bg-opacity-100 dark:py-4",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 text-sm text-muted-foreground dark:text-xs dark:text-foreground",
        )}
      >
        <div>{icon}</div>
        <div>{title}</div>
      </div>
      {!isLoading ? (
        <div
          className={
            "mt-2 text-2xl font-semibold dark:font-medium leading-9 dark:text-2xl dark:leading-7 sm:text-3xl"
          }
        >
          {value}
        </div>
      ) : (
        <Skeleton className="mt-2 h-12 w-full" />
      )}
    </div>
  );
}
