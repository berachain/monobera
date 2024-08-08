export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container min-h-minimum pb-16">{children}</section>
  );
}
