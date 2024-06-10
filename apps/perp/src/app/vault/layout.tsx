import { perpsName } from "@bera/config";
import { UpTimeStatus } from "@bera/shared-ui";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative pb-[72px]">
      <div className="container max-w-1280">{children}</div>
      <UpTimeStatus />
    </section>
  );
}
