import React from "react";
import { type Metadata } from "next";
import { lendName } from "@bera/config";

import DashboardPageContent from "./dashboard-page-content";

export const metadata: Metadata = {
  title: `Dashboard | ${lendName}`,
  description: `Welcome to ${lendName}!`,
};

export default function DashboardPage() {
  return <DashboardPageContent />;
}
