import Image from "next/image";

import { ConnectButton } from "./connect-button";

export const ConnectWalletBear = ({ message }: { message: string }) => {
	return (
		<div className="container flex flex-col gap-4">
			<Image
				className="mx-auto"
				src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/bears/exrpxwn6fmll2x0c0jlr`}
				alt="wallet-connect-bear"
				width={535}
				height={285}
			/>
			<div className="text-center text-3xl font-bold leading-[48px] text-foreground md:text-5xl">
				Connect your wallet
			</div>
			<div className="text-center text-lg font-semibold leading-7 text-muted-foreground md:text-xl">
				{message}
			</div>
			<div className="max-w-[1=80px] self-center">
				<ConnectButton className="mx-auto w-full" />
			</div>
		</div>
	);
};
