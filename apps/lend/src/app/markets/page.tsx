import React from "react";
import { type Metadata } from "next";
import { lendName } from "@bera/config";

import MarketsPageContent from "./markets-page-content";

export const metadata: Metadata = {
	title: `Markets | ${lendName}`,
	description: `Welcome to ${lendName}!`, // need text
};

export default function MarketsPage() {
	return <MarketsPageContent />;
}
