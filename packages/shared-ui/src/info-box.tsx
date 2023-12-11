import { type PropsWithChildren } from "react";

export const InfoBoxList = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex w-full flex-col gap-2 rounded-lg bg-muted p-3">
			{children}
		</div>
	);
};

interface InfoBoxListItemProps {
	title: string;
	value: string | number | undefined;
}
export const InfoBoxListItem = ({ title, value }: InfoBoxListItemProps) => {
	return (
		<div className="flex w-full flex-row justify-between">
			<p className="text-xs font-medium text-muted-foreground sm:text-sm">
				{title}
			</p>
			<p className="whitespace-nowrap text-right text-xs font-medium sm:text-sm">
				{value}
			</p>
		</div>
	);
};
