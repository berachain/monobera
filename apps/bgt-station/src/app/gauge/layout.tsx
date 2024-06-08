import { Footer, FooterSM } from "@bera/shared-ui/src/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="container min-h-minimun pb-16">{children}</div>
      <Footer />
    </section>
  );
}
