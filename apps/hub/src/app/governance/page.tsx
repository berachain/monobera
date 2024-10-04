import React from "react";

import { HomePage } from "./components/home-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Governance",
};

export default function Page() {
  return <HomePage />;
}
