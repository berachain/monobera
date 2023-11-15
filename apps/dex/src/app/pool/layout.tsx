import { FooterSM } from "@bera/shared-ui/src/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="min-h-[calc(100vh-200px)]">{children}</div>
      <FooterSM />
    </section>
  );
}
