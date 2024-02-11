import { bannerEnabled, perpsName } from "@bera/config";
import { UpTimeStatus, LaunchBanner, CustomizedBanner } from "@bera/shared-ui";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative pb-[72px] ">
      {bannerEnabled && <LaunchBanner appName={perpsName} className="mt-0" />}
      <CustomizedBanner
        className="mb-8 mt-0"
        text="Scheduled Maintenance: Berps will undergo system updates on Feb 13th, 7:00PM to 8:00PM UTC. Please wind down open positions."
      />
      <div className="container min-h-minimun max-w-1280">{children}</div>
      <UpTimeStatus />
    </section>
  );
}
