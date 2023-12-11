"use client";

import Image from "next/image";
import { Button } from "@bera/ui/button";

export function ErrorPage({
	onBack,
	reset,
}: {
	onBack?: () => void;
	reset?: () => void;
}) {
	return (
		<div className="m-auto flex w-fit flex-col justify-center gap-4">
			<Image
				src="https://res.cloudinary.com/duv0g402y/image/upload/f_auto,q_auto/v1/bears/hlt8meamxdaayj8qjyqs"
				alt="404"
				width={240}
				height={150}
				className="mx-auto"
			/>
			<div className="text-center text-lg font-semibold leading-7">
				Oh no! Something went wrong
			</div>
			<div className="text-center text-sm font-medium leading-tight text-muted-foreground">
				This page either doesn’t exist or we messed up.
				<br />
				Would you like to return to the homepage?
			</div>

			{onBack && (
				<Button onClick={onBack} className="mx-auto w-fit">
					{" "}
					Go back
				</Button>
			)}
			{reset && (
				<Button onClick={reset} className="mx-auto w-fit">
					Refresh
				</Button>
			)}
		</div>
	);
}
