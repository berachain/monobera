// @ts-nocheck
import { useLayoutEffect, useMemo, useRef } from "react";
import { cn } from "@bera/ui";
import jazzicon from "@metamask/jazzicon";

export default function Identicon({
  account,
  size,
  className,
}: {
  account: string;
  size?: number;
  className?: string;
}) {
  const iconSize = size ?? 24;

  const icon = useMemo(
    () => account && jazzicon(iconSize, parseInt(account.slice(2, 10), 16)),
    [account, iconSize],
  );
  const iconRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const current = iconRef.current;
    if (icon) {
      current?.appendChild(icon);
      return () => {
        try {
          current?.removeChild(icon);
        } catch (e) {
          console.error("Avatar icon not found");
        }
      };
    }
    return;
  }, [icon, iconRef]);

  return <span ref={iconRef} className={cn("rounded-full", className)} />;
}
