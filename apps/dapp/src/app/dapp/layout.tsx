import Sidebar from "../../components/Sidebar";

export default function DappLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <div className="h-full bg-white">
      <Sidebar />
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
