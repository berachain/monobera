import { bannerEnabled, perpsName } from "@bera/config";
import { UpTimeStatus } from "@bera/shared-ui";
import { BerpsBanner } from "@bera/shared-ui/src/launch-banner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative pb-[72px] ">
      {bannerEnabled && (
        <BerpsBanner appName={perpsName} className="mb-8 mt-0" />
      )}
      <div className="container min-h-minimun max-w-1280">{children}</div>
      <UpTimeStatus />
    </section>
  );
}
