import { FooterSM } from "@bera/shared-ui/src/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="container min-h-minimum max-w-[1440px] pt-8 pb-16">
        {children}
      </div>
      <FooterSM />
    </section>
  );
}
