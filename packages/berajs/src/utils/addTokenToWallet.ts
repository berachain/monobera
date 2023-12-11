import { type Token } from "../api/currency/tokens";

export async function addTokenToWallet(token: Token | undefined) {
	if (token) {
		try {
			// 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
			//@ts-ignore
			const wasAdded = await window.ethereum.request({
				method: "wallet_watchAsset",
				params: {
					type: "ERC20",
					options: {
						address: token?.address, // The address of the token.
						symbol: token?.symbol, // A ticker symbol or shorthand, up to 5 characters.
						decimals: token?.decimals, // The number of decimals in the token.
						image: token?.logoURI, // A string URL of the token logo.
					},
				},
			});

			if (wasAdded) {
				console.log("added");
			} else {
				console.log("already did");
			}
		} catch (error) {
			console.log(error);
		}
	}
}
