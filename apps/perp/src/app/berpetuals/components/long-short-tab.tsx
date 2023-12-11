import { cn } from "@bera/ui";

export function LongShortTab({
	value = "long",
	valueOnChange,
}: {
	value?: "short" | "long";
	valueOnChange?: (value: "short" | "long") => void;
}) {
	return (
		<div className="flex h-12 cursor-pointer bg-muted text-muted-foreground">
			<div
				onClick={() => valueOnChange?.("long")}
				className={cn(
					"flex h-full w-1/2 flex-shrink-0 flex-grow-0 items-center justify-center border-b border-border hover:border-success-foreground",
					value === "long" &&
						"border-success-foreground bg-success text-lg font-semibold text-success-foreground",
				)}
			>
				Long
			</div>
			<div
				onClick={() => valueOnChange?.("short")}
				className={cn(
					"flex h-full w-1/2 flex-shrink-0 flex-grow-0 items-center justify-center border-b border-border hover:border-destructive-foreground",
					value === "short" &&
						"border-destructive-foreground bg-destructive text-lg font-semibold text-destructive-foreground",
				)}
			>
				Short
			</div>
		</div>
	);
}
