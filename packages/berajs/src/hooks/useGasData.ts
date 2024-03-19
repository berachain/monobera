import { useEffect, useMemo, useState } from "react";
import { ContractFunctionArgs, EstimateContractGasParameters } from "viem";
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
      });
  }, [contractArgs, generalGasPriceEstimate]);

  return gasData;
};
