import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function Hero() {
	return (
		<div className="flex min-h-[70vh] items-center justify-center py-16">
			<div className="max-w-xl lg:text-center">
				<Image
					src="/kingBear.png"
					alt="King Bear"
					width={500}
					height={311.72}
					className="width-[500px] mx-auto"
				/>
				<h1 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-foreground sm:text-4xl">
					Earn Interest And Reward By{" "}
					<span className="bg-gradient-to-b from-yellow-300 to-orange-600 bg-clip-text text-transparent">
						Supplying
					</span>{" "}
					Your Assets And{" "}
					<span className="bg-gradient-to-b from-yellow-300 to-orange-600 bg-clip-text text-transparent">
						Borrowing
					</span>{" "}
					Honey
				</h1>
				<Link href={"/dashboard"}>
					<Button
						className="rounded-18 mt-8 w-full text-lg font-semibold leading-7 sm:w-auto"
						size={"lg"}
					>
						<Icons.helpingHand className="mr-1 h-6 w-6" /> Borrow Honey
					</Button>
				</Link>
			</div>
		</div>
	);
}
