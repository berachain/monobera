import React from "react";

import { TokenIcon } from "./token-icon";

interface ITokenIconList {
	tokenList: string[];
	size?: "3xl" | "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
	showCount?: number;
}

export function TokenIconList({
	tokenList,
	showCount = 3,
	size = "lg",
}: ITokenIconList) {
	const length = tokenList?.length;
	if (showCount && showCount < length) {
		tokenList = tokenList.slice(0, showCount);
	}

	return (
		<div className="ml-[5px] flex items-center">
			{tokenList?.map((icon) => (
				<TokenIcon
					key={icon}
					address={icon}
					fetch
					className="ml-[-5px]"
					size={size}
				/>
			))}
			{showCount && length > showCount && (
				<div className="ml-2 text-muted-foreground">+{length - showCount}</div>
			)}
		</div>
	);
}
