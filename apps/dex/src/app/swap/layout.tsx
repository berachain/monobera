"use client";

import dynamic from "next/dynamic";
import { cloudinaryUrl } from "@bera/config";
import { FooterSM } from "@bera/shared-ui/src/footer";

const Gradient = dynamic(
  () => import("@bera/shared-ui").then((mod) => mod.Gradient),
  {
    ssr: false,
    loading: () => <></>,
  },
);

const BearBG = dynamic(
  () => import("@bera/shared-ui").then((mod) => mod.BearBG),
  {
    ssr: false,
    loading: () => <></>,
  },
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative">
      <div className="container relative z-10 min-h-minimun max-w-1280 pb-16">
        {children}
      </div>
      <Gradient
        lightUrl={`${cloudinaryUrl}/shared/xrvkmr8yhvvyckxznty2`}
        darkUrl={`${cloudinaryUrl}/shared/klszfo1j2sz9yk7lin87`}
      />
      <BearBG
        lightUrl={`${cloudinaryUrl}/shared/qfyewc7lo2ujtktbimd8`}
        darkUrl={`${cloudinaryUrl}/shared/banner-bears-dark`}
      />
      <FooterSM />
    </section>
  );
}
