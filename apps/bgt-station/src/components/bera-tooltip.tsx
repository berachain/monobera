import React from "react";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@bera/ui/tooltip";

export default function BeraTooltip({
	text,
	children,
}: {
	text: string;
	children?: React.ReactNode;
}) {
	const [tooltipOpen, setTooltipOpen] = React.useState(false);
	return (
		<TooltipProvider>
			<Tooltip open={tooltipOpen} defaultOpen={false}>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						className="h-5 w-5 rounded-full p-0"
						onMouseEnter={() => setTooltipOpen(true)}
						onMouseLeave={() => setTooltipOpen(false)}
					>
						<Icons.tooltip className="h-3 w-3" />
						<span className="sr-only">Tooltip</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>{children ? children : <p>{text}</p>}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
