import { useFeeData } from "wagmi";

export const useGasData = (): any => {
	const { data: gasData } = useFeeData();
	return gasData;
};
