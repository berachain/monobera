import { UpTimeStatus } from "@bera/shared-ui";
import { OneClickBanner } from "./components/one-click-banner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative">
      <OneClickBanner/>
      {children}
      <UpTimeStatus />
    </section>
  );
}
