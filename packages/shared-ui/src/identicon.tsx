"use client";

// @ts-nocheck
import { useEffect, useMemo, useRef } from "react";
import { cn } from "@bera/ui";

import "./types/jazzicon.d.ts";
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
    () =>
      account &&
      typeof window !== "undefined" &&
      jazzicon(iconSize, parseInt(account.slice(2, 10), 16)),
    [account, iconSize],
  );
  const iconRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const current = iconRef.current;
    if (icon && current) {
      current.appendChild(icon);
      return () => {
        try {
          current.removeChild(icon);
        } catch (e) {
          console.error("Avatar icon not found");
        }
      };
    }
    return;
  }, [icon, iconRef]);

  return (
    <span
      ref={iconRef}
      className={cn("flex items-center rounded-full", className)}
    />
  );
}
