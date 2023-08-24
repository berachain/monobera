"use client";

import * as React from "react";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  //   props: {
  //   align?: "center" | "start" | "end";
  //   side?: "top" | "bottom";
  // }

  const { setTheme, theme } = useTheme();

  const themeList = [
    { theme: "system", icon: <Icons.laptop className="h-4 w-4" /> },
    { theme: "light", icon: <Icons.sun className="h-4 w-4" /> },
    { theme: "dark", icon: <Icons.moon className="h-4 w-4" /> },
  ];
  return (
    <Tabs defaultValue={theme} className="hidden lg:block">
      <TabsList className="rounded-full">
        {themeList.map((t, index) => (
          <TabsTrigger
            value={t.theme}
            key={index}
            className="flex-1 rounded-full capitalize"
            onClick={() => setTheme(t.theme)}
          >
            {t.icon}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
