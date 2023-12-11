"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export function Gradient({
	lightUrl,
	darkUrl,
}: {
	lightUrl: string;
	darkUrl: string;
}) {
	const { theme, systemTheme } = useTheme();
	const light = (theme === "system" ? systemTheme : theme) === "light";
	return light ? (
		<Image
			className="-z-1 fixed left-1/2 right-0 top-0 -translate-x-1/2"
			src={lightUrl}
			alt="bera banner"
			width={1078}
			height={820}
			priority
			loading="eager"
			style={{ height: "auto" }}
		/>
	) : (
		<Image
			className="-z-1 fixed left-1/2 right-0 top-0 -translate-x-1/2"
			src={darkUrl}
			alt="bera banner"
			width={1078}
			height={820}
			priority
			loading="eager"
			style={{ height: "auto" }}
		/>
	);
}
