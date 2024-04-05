import { bannerEnabled, perpsName } from "@bera/config";
import { LaunchBanner, UpTimeStatus } from "@bera/shared-ui";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative pb-[72px] ">
      {bannerEnabled && (
        <LaunchBanner appName={perpsName} className="mb-8 mt-0" />
      )}
      <div className="container min-h-minimun max-w-1280">{children}</div>
      <UpTimeStatus />
    </section>
  );
}
