export const useFees = (): [number, number] => {
	// will do some sort of API calls here
	const fee = 1 - 0.005;
	const fee2 = 1 + 0.005;
	return [fee, fee2];
};
