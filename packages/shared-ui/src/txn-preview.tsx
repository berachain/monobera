"use client";

import React, { type PropsWithChildren } from "react";
import Image from "next/image";
import { Button } from "@bera/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";

import { ActionButton } from "./action-btn-wrapper";

interface Props extends PropsWithChildren {
	open: boolean;
	disabled?: boolean;
	title: string;
	imgURI: string;
	triggerText: string;
	setOpen: (open: boolean) => void;
}

export function TxnPreview({
	open,
	disabled,
	title,
	imgURI,
	triggerText,
	children,
	setOpen,
}: Props) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<ActionButton>
					<Button
						disabled={disabled}
						onClick={() => {
							setOpen(true);
						}}
						className="w-full gap-1"
						variant="outline"
					>
						{triggerText} <Icons.arrowRight className="h-3 w-3" />
					</Button>
				</ActionButton>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[420px]">
				<DialogHeader>
					<DialogTitle className="mb-3">{title}</DialogTitle>
					<Image
						alt="preview"
						src={imgURI}
						className="self-center"
						width={525}
						height={150}
					/>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
}
