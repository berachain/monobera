import { FooterSM } from "@bera/shared-ui";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="dex-background relative">
      <div className="container relative z-10 min-h-[calc(100vh-144px)] max-w-1280 pb-16">
        {children}
      </div>
    </section>
  );
}
