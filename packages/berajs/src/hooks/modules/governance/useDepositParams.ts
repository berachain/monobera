import { validatorEndpointUrl } from "@bera/config";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";

import { type DepositParamsResponse } from "./types";

export const useDepositParams = () => {
  const method = "params";
  const QUERY_KEY = [method];
  useSWRImmutable(QUERY_KEY, async () => {
    const temp = await fetch(
      `${validatorEndpointUrl}/cosmos/gov/v1beta1/params/deposit`,
    );
    const result: DepositParamsResponse = await temp.json();
    return result;
  });

  const useMinDeposit = (): number => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    if (data) {
      return Number(
        formatUnits(BigInt(data.deposit_params.min_deposit[0].amount), 18),
      );
    }
    return data;
  };
  return {
    useMinDeposit,
  };
};
