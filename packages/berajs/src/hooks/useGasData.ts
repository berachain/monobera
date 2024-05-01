import { useEffect, useState } from "react";
import { EstimateContractGasParameters } from "viem";
import { usePublicClient } from "wagmi";

export const useGasData = ({
  contractArgs,
}: {
  contractArgs?: EstimateContractGasParameters<any> | null;
} = {}): any => {
  const publicClient = usePublicClient();

  const [gasData, setGasData] = useState<bigint | undefined>();
  useEffect(() => {
    if (contractArgs === undefined) {
      publicClient
        ?.getGasPrice()
        .then((generalGasPrice) => {
          setGasData(BigInt(parseFloat(`${generalGasPrice}`)));
        })
        .catch();
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
      .catch((e: unknown) => {
        setGasData(undefined);

        const isFalseAlarm =
          `${e}`.includes("Unable to decode signature") ||
          `${e}`.includes("insufficient allowance");

        if (!isFalseAlarm) {
          console.error("useGasData: ", e);
        }
      });
  }, [contractArgs]);

  return gasData;
};
