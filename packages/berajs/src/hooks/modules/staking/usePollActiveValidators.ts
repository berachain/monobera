import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { STAKING_PRECOMPILE_ABI, STAKING_PRECOMPILE_ADDRESS } from "~/config";

const REFRESH_INTERVAL = 2000;

export interface Validator {
  operator_address: string;
  consensus_pubkey: {
    type: string;
    key: string;
  };
  delegator_shares: string;
  jailed: boolean;
  description: ValidatorDescription;
  commission: ValidatorCommission;
  min_self_delegation: string;
  status: string;
  tokens: string;
  unbonding_height: number;
  unbonding_time: Date;
}
export interface ValidatorDescription {
  moniker: string;
  identity: string;
  website: string;
  security_contact: string;
  details: string;
}

export interface ValidatorCommission {
  commission_rates: {
    rate: string;
    max_rate: string;
    max_change_rate: string;
  };
  update_time: Date;
}

export const usePollRawValidators = () => {
  const publicClient = usePublicClient();
  const method = "getActiveValidators";
  const QUERY_KEY = [method];
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: STAKING_PRECOMPILE_ADDRESS,
        abi: STAKING_PRECOMPILE_ABI,
        functionName: method,
        args: [],
      });

      return result;
    },
    {
      refreshInterval: REFRESH_INTERVAL,
    },
  );
  const useValidators = (): Validator[] => {
    const { data = [] } = useSWRImmutable(QUERY_KEY);
    return data as Validator[];
  };
  return {
    useValidators,
  };
};
