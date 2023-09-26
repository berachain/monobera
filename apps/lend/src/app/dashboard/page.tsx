import React from "react";

import DashboardPageContent from "./dashboard-page-content";

export const metadata: Metadata = {
  title: `Home | ${lendName}`,
  description: `Welcome to ${lendName}!`,
};

export default function DashboardPage() {
  return (
    <div className="container my-28">
      <DashboardPageContent />
    </div>
  );
}
