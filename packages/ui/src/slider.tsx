"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "./utils/cn";

interface SliderProps
	extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
	markers?: number[];
	max?: number;
	value: number[];
}

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	SliderProps
>(({ className, markers, value, max = 100, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex h-10 w-full touch-none select-none items-center",
			className,
		)}
		value={value}
		{...props}
	>
		<SliderPrimitive.Track className="relative h-2 w-full grow rounded-full bg-muted">
			<SliderPrimitive.Range className="absolute h-full rounded-full bg-warning-foreground" />
			{markers?.map((point, index) => {
				const ratio = (point / max) * 100;
				return (
					<div key={index}>
						<div
							key={`${index}label`}
							style={{ left: `calc(${ratio}% - 8px)` }}
							className="absolute bottom-3 text-xs text-foreground"
						>
							{point}
						</div>
						{index !== markers.length - 1 && (
							<div
								key={`${index}dot`}
								style={{ left: `calc(${ratio}% - 8px)` }}
								className={cn(
									"absolute -bottom-[1px] h-[10px] w-[10px] rounded-full border-2",
									value[0]! >= ratio
										? "border-accent bg-warning-foreground"
										: " border-border bg-muted",
								)}
							/>
						)}
					</div>
				);
			})}
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className="block h-[14px] w-[14px] rounded-full border-2 border-warning-foreground bg-accent transition-colors focus:outline-none disabled:opacity-50" />
	</SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
