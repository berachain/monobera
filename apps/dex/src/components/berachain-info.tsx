import { useEffect } from "react";
import Image from "next/image";
import { cloudinaryUrl, docsUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { useLocalStorage } from "usehooks-ts";

const BerachainInfo = () => {
	const [hasVisitedBefore, setHasVisitedBefore] = useLocalStorage<
		boolean | undefined
	>("hasVisitedBefore", undefined);

	useEffect(() => {
		if (!hasVisitedBefore) {
			setHasVisitedBefore(false);
		}
	}, []);

	if (hasVisitedBefore || hasVisitedBefore === undefined) return null;

	return (
		<Card className="relative h-fit w-full rounded-xl bg-opacity-95 px-6 pb-3 pt-9 ">
			<Icons.close
				className="absolute right-3 top-4 h-4 w-4 text-muted-foreground hover:cursor-pointer"
				onClick={() => setHasVisitedBefore(true)}
			/>
			<Image
				src={`${cloudinaryUrl}/bears/qsmspkwyjoeh1cwb6fz7`}
				className="absolute -left-4 bottom-0 mx-auto hidden self-start sm:block md:mx-0"
				alt="bidness"
				width={150}
				height={200}
			/>

			<CardHeader className="flex w-full items-end space-y-0 p-0">
				<CardTitle className="whitespace-nowrap text-2xl ">
					🌱 New to 🐻 Berachain?
				</CardTitle>
				<Button
					variant="ghost"
					className="w-fit p-1"
					onClick={() =>
						window.open(
							`${docsUrl}/learn/how-to-connect-a-wallet-with-berachain`,
						)
					}
				>
					<CardDescription>
						Kick off your journey with these helpful tips.{" "}
						<Icons.externalLink className="inline-block h-4 w-4" />
					</CardDescription>
				</Button>
			</CardHeader>
		</Card>
	);
};

export default BerachainInfo;
