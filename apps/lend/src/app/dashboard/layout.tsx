import { CustomizedBanner } from "@bera/shared-ui";
import { FooterSM } from "@bera/shared-ui/src/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <CustomizedBanner
        className="-mt-8 mb-8"
        text="BEND balances are currently being migrated. Previously supplied assets will reappear thoon."
      />
      <div className="container min-h-minimun max-w-[1440px] pb-16">
        {children}
      </div>
      <FooterSM />
    </section>
  );
}
