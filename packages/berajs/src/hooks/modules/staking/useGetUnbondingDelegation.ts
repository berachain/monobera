import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import abi from "../../../config/abi/modules/staking/IStakingModule.abi";
import { useBeraJs } from "../../../contexts";
import { STAKING_PRECOMPILE_ADDRESS } from "./constants";

const REFRESH_INTERVAL = 2000;

export const usePollUnbondingDelegation = (validatorAddress: `0x${string}`) => {
  const { account: address, error } = useBeraJs();
  const publicClient = usePublicClient();
  useSWR(
    [address, validatorAddress, "getUnbondingDelegation"],
    async () => {
      console.log(address, validatorAddress);
      if (address && !error) {
        const result: any = await publicClient
          .readContract({
            address: STAKING_PRECOMPILE_ADDRESS,
            abi,
            functionName: "getUnbondingDelegation",
            args: [address, validatorAddress],
          })
          .catch((e) => {
            console.log(e);
          });
        console.log(result);
        return result.map((delegation) => ({
          ...delegation,
          initialBalance: formatUnits(delegation.initialBalance, 0).toString(),
          balance: formatUnits(delegation.balance, 0).toString(),
        }));
      }
      return undefined;
    },
    {
      refreshInterval: REFRESH_INTERVAL,
    },
  );
};

export const useGetUnbondingDelegation = (validatorAddress: `0x${string}`) => {
  const { account } = useBeraJs();

  const { data: unbondingDelegations = undefined } = useSWRImmutable([
    account,
    validatorAddress,
    "unbondingDelegations",
  ]);
  return unbondingDelegations;
};
