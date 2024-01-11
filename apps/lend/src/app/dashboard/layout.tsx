import { lendName } from "@bera/config";
import { LaunchBanner } from "@bera/shared-ui";
import { FooterSM } from "@bera/shared-ui/src/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <LaunchBanner appName={lendName} className="-mt-8 mb-8" />
      <div className="container min-h-minimun max-w-[1440px] pb-16">
        {children}
      </div>
      <FooterSM />
    </section>
  );
}
