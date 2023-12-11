"use client";

import * as React from "react";
import Link from "next/link";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
import { ScrollArea } from "@bera/ui/scroll-area";

import { navItems } from "~/app/config";

export function MobileDropdown() {
	const [isOpen, setIsOpen] = React.useState(false);

	React.useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, [isOpen]);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Icons.menu className="block h-8 w-8 text-secondary-foreground md:hidden " />
			</PopoverTrigger>
			<PopoverContent className="z-40 mt-2 h-[calc(100vh-4rem)] w-screen animate-none rounded-none border-none transition-transform">
				<ScrollArea className="py-8">
					{navItems.map(({ href, title }) => (
						<Link
							key={href}
							href={{ pathname: href }}
							className="flex py-1 text-base font-medium text-muted-foreground transition-colors hover:text-primary"
						>
							{title}
						</Link>
					))}
				</ScrollArea>
			</PopoverContent>
		</Popover>
	);
}
