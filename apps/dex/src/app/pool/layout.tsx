import { FooterSM } from "@bera/shared-ui/src/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="container min-h-minimun max-w-1280 pb-16 pt-8">
        {children}
      </div>
      <FooterSM />
    </section>
  );
}
