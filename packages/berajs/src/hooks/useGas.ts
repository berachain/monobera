import { useFeeData } from "wagmi";

export const useGas = () => {
  const { data: gasData } = useFeeData();
  return gasData;
};
