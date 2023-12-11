import { formatUsd } from "@bera/berajs";
import { formatUnits } from "viem";

export const formatBigIntUsd = (
	value: number | string | bigint,
	decimals = 18,
) => {
	return formatUsd(Number(formatUnits(BigInt(value), decimals)));
};
