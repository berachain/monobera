import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";

import { getBadgeContent } from "~/utils/badge";

export function TagList({
  tagList,
  className,
}: {
  tagList: string[];
  className?: string;
}) {
  return (
    <div className={cn("ml-2 flex h-12 w-fit items-center", className)}>
      {tagList.map((tag) => (
        <Badge
          key={tag}
          variant={"info"}
          className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full p-0 text-xs"
        >
          {getBadgeContent(tag)}
        </Badge>
      ))}
    </div>
  );
}
