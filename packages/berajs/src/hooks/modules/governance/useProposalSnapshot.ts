import { governorAddress } from "@bera/config";
import { SWRResponse } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { GOVERNANCE_ABI } from "~/abi";

export const useProposalSnapshot = ({
  proposalId,
}: {
  proposalId: number | bigint | string | undefined;
}): SWRResponse<string> => {
  const publicClient = usePublicClient();

  const QUERY_KEY =
    publicClient && proposalId ? ["useProposalSnapshot", proposalId] : null;

  return useSWRImmutable(QUERY_KEY, async () => {
    if (!publicClient) {
      throw new Error("public client is not defined");
    }

    const snapshot = await publicClient.readContract({
      abi: GOVERNANCE_ABI,
      address: governorAddress,
      functionName: "proposalSnapshot",
      args: [BigInt(proposalId!)],
    });

    return snapshot.toString();
  });
};
