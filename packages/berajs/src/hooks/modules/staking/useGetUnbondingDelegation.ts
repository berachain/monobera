import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import abi from "~/config/abi/modules/staking/IStakingModule.abi";
import { useBeraJs } from "~/contexts";
import { STAKING_PRECOMPILE_ADDRESS } from "./constants";

const REFRESH_INTERVAL = 2000;

export const usePollUnbondingDelegation = (validatorAddress: `0x${string}`) => {
  const { account: address, error } = useBeraJs();
  const publicClient = usePublicClient();
  useSWR(
    [address, validatorAddress, "getUnbondingDelegation"],
    async () => {
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
        return result.map((delegation: any) => ({
          ...delegation,
          initialBalance: formatUnits(delegation.initialBalance, 18).toString(),
          creationHeight: formatUnits(delegation.creationHeight, 0).toString(),
          unbondingId: formatUnits(delegation.initialBalance, 18).toString(),
          balance: formatUnits(delegation.balance, 18).toString(),
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
    "getUnbondingDelegation",
  ]);
  return unbondingDelegations;
};
