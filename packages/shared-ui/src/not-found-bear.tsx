import { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";

export function NotFoundBear({
	title,
	subtitle,
	actionTitle,
	actionLink,
	external = false,
}: {
	title?: ReactNode;
	subtitle?: ReactNode;
	actionTitle?: ReactNode;
	actionLink?: string;
	external?: boolean;
}) {
	return (
		<div className="mx-auto mt-8 flex w-fit flex-col justify-center gap-4">
			<Image
				src={
					"https://res.cloudinary.com/duv0g402y/image/upload/f_auto,q_auto/v1/bears/e6monhixzv21jy0fqes1"
				}
				alt="not found bear"
				width={345.35}
				height={200}
				className="mx-auto"
			/>
			<div>
				{title && (
					<div className="mt-4 w-full text-center text-xl font-semibold leading-7 text-foreground">
						{title}
					</div>
				)}
				{subtitle && (
					<div className="text-center font-medium leading-7 text-muted-foreground">
						{subtitle}
					</div>
				)}
			</div>
			{actionTitle && actionLink && (
				<Link
					href={actionLink}
					target={external ? "_blank" : "_self"}
					className="mx-auto"
				>
					{" "}
					<Button variant={"outline"}>{actionTitle}</Button>
				</Link>
			)}
		</div>
	);
}
