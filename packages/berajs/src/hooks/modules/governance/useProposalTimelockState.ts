import useSWR, { SWRResponse } from "swr";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import POLLING from "~/enum/polling";
import { governanceTimelockAbi } from "../../../abi";

enum OperationState {
  Unset = 0,
  Waiting = 1,
  Ready = 2,
  Done = 3,
}

const OperationStateMap: Record<OperationState, string> = {
  [OperationState.Unset]: "unset",
  [OperationState.Waiting]: "waiting",
  [OperationState.Ready]: "ready",
  [OperationState.Done]: "done",
};

export const useProposalTimelockState = ({
  proposalTimelockId,
  timelockAddress,
}: {
  proposalTimelockId: Address | undefined;
  timelockAddress: Address;
}): SWRResponse<string> => {
  const publicClient = usePublicClient();

  const QUERY_KEY =
    timelockAddress && publicClient && proposalTimelockId
      ? ["useProposalTimelockState", proposalTimelockId]
      : null;

  return useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) {
        throw new Error("public client is not defined");
      }

      const snapshot = (await publicClient.readContract({
        abi: governanceTimelockAbi,
        address: timelockAddress,
        functionName: "getOperationState",
        args: [proposalTimelockId!],
      })) as OperationState;

      console.log({ snapshot, state: OperationStateMap[snapshot] });

      return OperationStateMap[snapshot];
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );
};
