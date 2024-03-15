import { cn } from "@bera/ui";
import { Skeleton } from "@bera/ui/skeleton";

export default function DataCard({
  icon,
  title,
  value,
  arcade,
  isLoading,
}: {
  icon: React.ReactNode;
  title: string;
  value: any;
  arcade: boolean;
  isLoading?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl bg-card",
        arcade
          ? "border-[3px] border-dashed border-foregroundSecondary px-6 py-4 text-foregroundSecondary"
          : "border-2 border-white bg-opacity-20 p-6 backdrop-blur-xl",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 text-sm",
          arcade ? "text-xs" : "text-muted-foreground",
        )}
      >
        <div>{icon}</div>
        <div>{title}</div>
      </div>
      {!isLoading ? (
        <div
          className={
            arcade
              ? "mt-2 text-2xl leading-7"
              : "mt-2 text-2xl font-semibold leading-9 sm:text-3xl"
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
