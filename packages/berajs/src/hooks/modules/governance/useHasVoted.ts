import { governanceTokenAddress, governorAddress } from "@bera/config";
import { readContract } from "@wagmi/core";
import useSWR from "swr";
import { Address } from "viem";
import { usePublicClient, useReadContract } from "wagmi";

import { GOVERNANCE_ABI } from "~/abi";
import { useBeraJs } from "~/contexts";

export const useHasVoted = ({
  proposalId,
  wallet,
}: {
  proposalId: string;
  wallet?: Address;
}) => {
  const { account } = useBeraJs();
  const client = usePublicClient();

  return useSWR(
    client && (wallet || account)
      ? ["useHasVoted", proposalId, wallet || account]
      : null,
    () =>
      client!.readContract({
        address: governorAddress,
        abi: GOVERNANCE_ABI,
        functionName: "hasVoted",
        args: [BigInt(proposalId), wallet || account!],
      }),
  );
};
