import { Icons } from "@bera/ui/icons";
import { Component } from "lucide-react";

export const siteConfig = {
  github: "https://github.com/juliusmarminge/acme-corp",
  twitter: "https://twitter.com/jullerino",
};

export const navItems = [
  {
    href: "/",
    title: "Overview",
  },
  {
    href: "/swap",
    title: "Swap",
  },
];

export const ctaFeatures = [
  {
    icon: <Component />,
    title: "Swap",
    href: "/swap",
  },
  {
    icon: <Icons.billing />,
    title: "Rewards",
    href: "/swap",
  },
  {
    icon: <Icons.add />,
    title: "Pool",
    href: "/swap",
  },
];
