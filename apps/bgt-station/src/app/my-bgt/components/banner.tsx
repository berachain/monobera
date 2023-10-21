import Image from "next/image";
import Link from "next/link";
import { Icons } from "@bera/ui/icons";

export function Banner({
  img,
  title,
  subtitle,
  href,
}: {
  img: string;
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <div className="flex h-[174px] w-full items-end">
      <Link
        className="relative mx-auto flex w-full max-w-[569px] flex-col items-end gap-1 rounded-3xl border border-border bg-background p-4"
        href={href}
        target="_blank"
      >
        <Image
          src={img}
          alt={title}
          width={569}
          height={170}
          className="absolute bottom-0 left-0 h-[170px] w-auto"
        />
        <div className="text-2xl font-semibold leading-8">{title}</div>
        <div className="flex items-center gap-1 text-sm leading-7 text-muted-foreground">
          {subtitle} <Icons.externalLink className="h-4 w-4" />
        </div>
      </Link>
    </div>
  );
}
