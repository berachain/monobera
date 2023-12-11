export function formatPercentage(
	numerator: number | undefined,
	denominator: number | undefined,
	decimals?: number,
): string {
	if (numerator === undefined || denominator === undefined) {
		return "0.00%";
	}
	const percentage = (numerator / denominator) * 100;
	const formattedPercentage = percentage.toFixed(decimals ? decimals : 2); // Adjust the number of decimal places as needed

	return `${formattedPercentage}%`;
}
