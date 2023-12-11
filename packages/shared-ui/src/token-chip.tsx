import React, { type PropsWithChildren } from "react";
import { cn } from "@bera/ui";

type Props = {
	selected?: boolean;
	className?: string;
	onClick?: () => void;
};

export function TokenChip({
	selected,
	className,
	onClick,
	children,
	...props
}: PropsWithChildren<Props>) {
	return (
		<div
			className={cn(
				"flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold leading-tight hover:cursor-pointer hover:bg-hover hover:bg-opacity-90",
				selected ? "bg-hover" : "bg-muted",
				className,
			)}
			onClick={onClick}
			{...props}
		>
			{children}
		</div>
	);
}
