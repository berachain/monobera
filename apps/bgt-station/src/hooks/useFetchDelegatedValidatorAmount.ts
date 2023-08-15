import {
  cosmosvaloperToEth,
  useBeraJs,
  usePollAccountDelegations,
  // usePollActiveValidators,
  // type Validator,
} from "@bera/berajs";
import useSWR from "swr";
import { parseEther } from "viem";

// export function useFetchDelegatedValidatorList() {
//   const { account, isConnected } = useBeraJs();
//   const { useActiveValidators } = usePollActiveValidators();
//   const validators: Validator[] = useActiveValidators();
//   const data = validators.map((validator) => ({
//     operatorAddress: validator.operatorAddress,
//     bgtDelegated: useFetchDelegatedValidatorAmount(validator.operatorAddress),
//   }));
//   return useSWR(
//     isConnected ? `${account}-useFetchDelegatedValidatorList` : null,
//     () => data,
//   );
// }

export function useFetchDelegatedValidatorAmount(
  operatorAddress: string | undefined,
) {
  const { useSelectedAccountDelegation } = usePollAccountDelegations(
    operatorAddress
      ? (cosmosvaloperToEth(operatorAddress) as `0x${string}`)
      : "0x00",
  );
  const bgtDelegated = parseEther(useSelectedAccountDelegation() ?? "");

  const { account, isConnected } = useBeraJs();

  return useSWR(
    isConnected && operatorAddress
      ? `${account}-useFetchDelegatedValidatorList-${operatorAddress}`
      : null,
    () => bgtDelegated,
  );
}
