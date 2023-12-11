import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";

export const LoadingBee = () => {
	return (
		<div className="mx-auto flex w-screen max-w-[1000px] flex-col items-center justify-center overflow-x-hidden">
			<Image
				src={`${cloudinaryUrl}/animation/c0mn0v2qfk4uw72etj61`}
				width={1190}
				height={750}
				alt="loading bee"
				className="w-[1190px] object-none"
			/>
			<h1 className="text-center text-3xl font-semibold">Loading...</h1>
		</div>
	);
};
