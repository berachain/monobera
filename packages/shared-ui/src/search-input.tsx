import React from "react";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, onChange, type, ...props }, ref) => {
		return (
			<Input
				startAdornment={<Icons.search className="h-4 w-4" />}
				type={type}
				className={cn("pl-9 text-foreground", className)}
				ref={ref}
				onChange={onChange}
				{...props}
			/>
		);
	},
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
