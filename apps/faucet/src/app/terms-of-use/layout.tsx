export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-sky-600 pt-10">
      <div className="container min-h-minimun max-w-1280 rounded-lg bg-background pb-16 pt-10">
        {children}
      </div>
    </section>
  );
}
