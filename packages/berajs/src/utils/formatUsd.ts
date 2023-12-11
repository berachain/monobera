export function formatUsd(input: string | number): string {
	const isNumber = (value: any): value is number => typeof value === "number";
	const isString = (value: any): value is string => typeof value === "string";

	if (!isNumber(input) && !isString(input)) {
		throw new Error("Invalid input: input must be a string or a number.");
	}

	let num: number;

	if (isString(input)) {
		num = parseFloat(input);
		if (Number.isNaN(num)) {
			num = 0;
			// throw new Error(
			//   "Invalid input: string input must be convertible to a number.",
			// );
		}
	} else {
		num = input;
	}

	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	return formatter.format(num);
}
