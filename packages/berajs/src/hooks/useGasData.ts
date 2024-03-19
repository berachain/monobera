import { useEffect, useMemo, useState } from "react";
import { ContractFunctionArgs, EstimateContractGasParameters } from "viem";
import { usePublicClient } from "wagmi";

export const useGasData = ({
  contractArgs,
}: {
  contractArgs?: EstimateContractGasParameters;
}): any => {
  const publicClient = usePublicClient();

  const [gasData, setGasData] = useState<bigint | undefined>();
  useEffect(() => {
    if (!contractArgs) {
      setGasData(undefined);
      return;
    }
    publicClient?.estimateContractGas({ ...contractArgs }).then((data) => {
      setGasData(data);
    });
  }, [contractArgs]);

  return gasData;
};
