import { UpTimeStatus } from "@bera/shared-ui";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container relative max-w-1280 pb-[72px]">
      {children}
      <UpTimeStatus />
    </section>
  );
}
