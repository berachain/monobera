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
    <div className={cn("ml-2 flex w-fit items-center", className)}>
      {tagList.map((tag) => (
        <Badge
          key={tag}
          variant={"info"}
          className="pr-1/2 -ml-2 flex h-6 w-6 items-center justify-center rounded-full p-0 text-[10px]"
        >
          {getBadgeContent(tag)}
        </Badge>
      ))}
    </div>
  );
}
