import { useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

import {
	DEADLINE_TYPE,
	DEADLINE_VALUE,
	DEFAULT_DEADLINE,
	TRANSACTION_MODE,
} from "../settings";

export const useDeadline = () => {
	const [deadlineMode] = useLocalStorage<TRANSACTION_MODE>(
		DEADLINE_TYPE,
		TRANSACTION_MODE.AUTO,
	);
	const [deadline] = useLocalStorage<number>(DEADLINE_VALUE, DEFAULT_DEADLINE);

	return useMemo(() => {
		if (deadlineMode === TRANSACTION_MODE.AUTO) {
			return DEFAULT_DEADLINE;
		}
		if (deadlineMode === TRANSACTION_MODE.CUSTOM) {
			return deadline;
		}
		if (deadlineMode === TRANSACTION_MODE.INFINITY) {
			return 100000;
		}
	}, [deadlineMode, deadline]);
};
