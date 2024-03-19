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
  useEffect(() => {
    if (contractArgs === undefined) {
      setGasData(BigInt(parseFloat(`${useGasPrice()}`)));
      return;
    }
    if (contractArgs === null) {
      setGasData(undefined);
      return;
    }
    publicClient?.estimateContractGas({ ...contractArgs }).then((data) => {
      setGasData(data);
    });
  }, [contractArgs]);

  return gasData;
};
