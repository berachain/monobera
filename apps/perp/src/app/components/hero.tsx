import React from "react";
import Link from "next/link";
import { Button } from "@bera/ui/button";

export default function Hero() {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-4">
			<h1 className="md:leading-14 text-center text-3xl font-extrabold leading-9 md:text-5xl">
				The{" "}
				<span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
					Tools
					<br /> You Need
				</span>{" "}
				for
				<br /> Your Next Trade{" "}
			</h1>
			<div className="text-center font-medium leading-normal text-muted-foreground">
				Trade All Your Favourite Pairs
				<br />
				With Deep Liquidity and Market Diversity
			</div>
			<div className="mb-6 text-center md:text-left">
				<Link href="/berpetuals">
					<Button className="mr-4">Start Trading</Button>
				</Link>
				<Link href="/markets">
					<Button variant="secondary">Explore Markets</Button>
				</Link>
			</div>
		</div>
	);
}
