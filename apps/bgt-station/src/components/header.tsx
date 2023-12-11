"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useBeraJs, usePollBgtBalance } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { MainNav } from "./main-nav";
import { MobileDropdown } from "./mobile-nav";

const ThemeToggle = dynamic(
	() => import("@bera/shared-ui").then((mod) => mod.ThemeToggle),
	{
		ssr: false,
		loading: () => (
			<Button
				variant="ghost"
				className="gap-1 px-2 text-lg font-semibold md:text-base"
			>
				<Icons.sun className="block dark:hidden" />
				<Icons.moon className="hidden dark:block" />
			</Button>
		),
	},
);

export const Connect = dynamic(
	() => import("@bera/shared-ui").then((mod) => mod.ConnectButton),
	{
		ssr: false,
		loading: () => <Button className="w-full">Loading...</Button>,
	},
);

export function Header() {
	const { isConnected } = useBeraJs();
	const { useBgtBalance, isLoading } = usePollBgtBalance();
	const userBalance = useBgtBalance();
	return (
		<nav className="bg-bg fixed left-0 right-0 z-50 bg-background">
			<div className="mx-auto flex h-16 w-full items-center justify-between px-4">
				<div className="mr-8 flex items-center">
					<span className="mr-10 text-lg font-bold tracking-tight">
						<Link href={"/"}>
							<Icons.logo className="h-12 w-12" />
						</Link>
					</span>
					<MainNav />
				</div>
				<div className="mr-2 flex items-center gap-2">
					{isConnected && (
						<div className="flex-no-wrap hidden h-10 w-fit gap-1 rounded-full border border-yellow-600 bg-yellow-50 px-4 py-2 text-sm font-medium md:flex">
							{isLoading ? (
								<Skeleton className="h-10 w-20" />
							) : (
								Number(userBalance).toFixed(2)
							)}{" "}
							<span>BGT</span>
						</div>
					)}
					<ThemeToggle />
					<Connect />
					<MobileDropdown />
				</div>
			</div>
		</nav>
	);
}
