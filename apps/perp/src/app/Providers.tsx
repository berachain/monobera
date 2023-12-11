"use client";

import React from "react";
import { BeraConfig } from "@bera/berajs";
import { ThemeProvider } from "next-themes";

import { beraJsConfig } from "./config";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
			<BeraConfig autoConnect={true} networkConfig={beraJsConfig}>
				{children}
			</BeraConfig>
		</ThemeProvider>
	);
}
