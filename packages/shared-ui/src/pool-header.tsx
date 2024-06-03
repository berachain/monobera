import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export const PoolHeader = ({
  back,
  title,
  subtitles,
  actions,
  center,
  className,
}: {
  back?: {
    backURL: string;
    backTitle: string;
  };
  title: ReactNode;
  subtitles: {
    title: string;
    content: any;
    color?: "success" | "warning" | "destructive";
    externalLink?: string;
    tooltip?: ReactNode;
  }[];
  actions?: ReactNode;
  center?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-between md:items-start md:justify-center lg:flex-row lg:items-end",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-full flex-col items-center gap-4",
          !center && "md:items-start",
        )}
      >
        {back && (
          <Link href={back.backURL} target="_self">
            <Button
              variant={"ghost"}
              size="sm"
              className="flex items-center gap-1"
            >
              <Icons.arrowLeft className="h-4 w-4" />
              <div className="text-sm font-medium"> {back.backTitle}</div>
            </Button>
          </Link>
        )}
        <span
          className={cn(
            "flex w-full justify-center gap-4 text-center text-2xl font-semibold md:text-left",
            !center && " md:justify-start",
          )}
        >
          {title}
        </span>
        <div
          className={cn(
            "flex w-full flex-row flex-wrap items-center justify-center gap-x-4 leading-7 text-muted-foreground",
            !center && "md:justify-start",
          )}
        >
          {subtitles.map((subtitle, index) => (
            <div className="flex w-fit items-center gap-1" key={index}>
              {subtitle.title} {subtitle.tooltip && subtitle.tooltip}:
              <span
                className={cn(
                  "flex items-center gap-1 text-sm",
                  subtitle.color
                    ? `text-${subtitle.color}-foreground`
                    : "text-foreground",
                  subtitle.externalLink && "cursor-pointer hover:underline",
                )}
                onClick={() =>
                  subtitle.externalLink && window.open(subtitle.externalLink)
                }
              >
                {subtitle.content}
                {subtitle.externalLink && (
                  <Icons.externalLink className="inline-block h-4 w-4 text-muted-foreground" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {actions && (
        <div className="mt-4 flex gap-2 md:mt-4 lg:mt-0">{actions}</div>
      )}
    </div>
  );
};
