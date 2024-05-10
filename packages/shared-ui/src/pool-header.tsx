import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export const PoolHeader = ({
  back: { backURL, backTitle },
  title,
  subtitles,
  actions,
  className,
}: {
  back: {
    backURL: string;
    backTitle: string;
  };
  title: ReactNode;
  subtitles: {
    title: string;
    content: any;
    color?: "success" | "warning" | "destructive";
    externalLink?: string;
  }[];
  actions?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-between md:items-start md:justify-center lg:flex-row lg:items-end",
        className,
      )}
    >
      <div className="flex w-full flex-col items-center gap-4 md:items-start">
        <Link href={backURL} target="_self">
          <Button
            variant={"ghost"}
            size="sm"
            className="flex items-center gap-1"
          >
            <Icons.arrowLeft className="h-4 w-4" />
            <div className="text-sm font-medium"> {backTitle}</div>
          </Button>
        </Link>
        <span className="flex w-full justify-center gap-4 text-center text-2xl font-semibold md:justify-start md:text-left">
          {title}
        </span>
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-x-4 leading-7 text-muted-foreground md:justify-start">
          {subtitles.map((subtitle, index) => (
            <div className="flex w-fit items-center gap-1" key={index}>
              {subtitle.title}:
              <span
                className={cn(
                  "text-sm",
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
                  <Icons.externalLink className="-mt-1 ml-1 inline-block h-4 w-4 text-muted-foreground" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-2 md:mt-4 lg:mt-0">{actions}</div>
    </div>
  );
};
