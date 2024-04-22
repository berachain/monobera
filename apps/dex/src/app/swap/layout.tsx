import { FooterSM } from "@bera/shared-ui/src/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="dex-background relative -mt-12">
      <div className="container relative z-10 min-h-[calc(100vh-144px)] max-w-1280 pb-16 pt-24">
        {children}
      </div>
      <FooterSM />
    </section>
  );
}
