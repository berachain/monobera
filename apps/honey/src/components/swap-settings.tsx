import React from "react";
import { Switch } from "@bera/ui/switch";
import { useLocalStorage } from "usehooks-ts";

import { LOCAL_STORAGE_KEYS } from "~/utils/constants";
import BeraTooltip from "./bera-tooltip";

export default function SwapSettings() {
	const [useSignatures, setUseSignatures] = useLocalStorage(
		LOCAL_STORAGE_KEYS.USE_SIGNATURES,
		false,
	);
	return (
		<div className="grid gap-4">
			<div className="space-y-2">
				<h4 className="flex items-center gap-1 font-medium leading-none">
					Use signatures
					<BeraTooltip text="Add to library" />
				</h4>
			</div>
			<div className="flex items-center space-x-2">
				<Switch
					id="use-signatures"
					checked={useSignatures}
					onCheckedChange={(checked) => setUseSignatures(checked)}
				/>
			</div>
		</div>
	);
}
