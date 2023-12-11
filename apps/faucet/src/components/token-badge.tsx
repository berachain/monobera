import { nativeTokenAddress } from "@bera/config";
import { TokenIcon } from "@bera/shared-ui";

export function TokenBadge() {
	return (
		<div className="mx-2 inline-flex h-8 w-fit items-center gap-1 rounded bg-neutral-900 bg-opacity-30 px-2 py-1 font-medium">
			<TokenIcon address={nativeTokenAddress} fetch />
			BERA
		</div>
	);
}
