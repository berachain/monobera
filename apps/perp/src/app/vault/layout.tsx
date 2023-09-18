import { UpTimeStatus } from "@bera/shared-ui";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative">
      {children}
      <UpTimeStatus />
    </section>
  );
}
