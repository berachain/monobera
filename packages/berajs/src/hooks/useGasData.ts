import { useEffect, useState } from "react";
import { EstimateContractGasParameters } from "viem";
import { useGasPrice, usePublicClient } from "wagmi";

export const useGasData = ({
  contractArgs,
}: {
  contractArgs?: EstimateContractGasParameters<any> | null;
} = {}): any => {
  const publicClient = usePublicClient();

  const [gasData, setGasData] = useState<bigint | undefined>();
  const generalGasPriceEstimate = useGasPrice();
  useEffect(() => {
    if (contractArgs === undefined && generalGasPriceEstimate.data) {
      setGasData(BigInt(parseFloat(`${generalGasPriceEstimate.data}`)));
      return;
    }
    if (!contractArgs) {
      setGasData(undefined);
      return;
    }
    publicClient
      ?.estimateContractGas({ ...(contractArgs as any) })
      .then((data) => {
        setGasData(data);
      })
      .catch((e) => {
        setGasData(undefined);

        const isFalseAlarm =
          `${e}`.includes("Unable to decode signature") ||
          `${e}`.includes("insufficient allowance");

        if (!isFalseAlarm) {
          console.log(e);
        }
      });
  }, [contractArgs, generalGasPriceEstimate]);

  return gasData;
};
