import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-row">
      <div className="border-r-2 border-border px-4 py-12">Sidebar</div>
      <div className="flex-1 p-12">{children}</div>
    </div>
  );
}
