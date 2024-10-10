import {
  useProposalState,
  useProposalTimelockState,
  type Vote,
} from "@bera/berajs";
import { VoteDialog } from "../../components/vote-dialog";
import { CancelButton } from "./components/cancel-button";
import { QueueButton } from "./components/queue-button";
import { useGovernance } from "../../components/governance-provider";
import { wagmiConfig, useTransactionReceipt } from "@bera/wagmi";
import { Address, parseEventLogs } from "viem";
import { governanceTimelockAddress } from "@bera/config";
import { ExecuteButton } from "./components/execute-button";
import { parseProposalBody } from "~/app/governance/helper";
import {
  ProposalStatus,
  ProposalWithVotesFragment,
} from "@bera/graphql/governance";

export const StatusAction = ({
  proposal,
  userVote,
  frontmatter,
}: {
  proposal: ProposalWithVotesFragment;
  userVote: Vote | false | undefined;
  frontmatter?: ReturnType<typeof parseProposalBody>;
}) => {
  const status = proposal.status;

  const { governorAddress } = useGovernance();

  const { data: onChainState } = useProposalState({
    proposalId: proposal.id,
    governorAddress,
  });

  // THIS WILL BE REMOVED WHEN WE HAVE A TIMELOCK ID ON SUBGRAPH

  // const queueTxHash = proposal.events?.find((e) => e.type === "queued")
  //   ?.txHash as Address | undefined;

  // const { data: receipt } = useTransactionReceipt({
  //   hash: queueTxHash,
  //   // @ts-ignore
  //   config: wagmiConfig,
  // });

  // const logs = parseEventLogs({
  //   abi: governanceTimelockAbi,
  //   logs: receipt?.logs || [],
  // });

  // This will be replaced with the actual timelockId when we have it on subgraph
  // @ts-ignore - I'd might be missing on a type. we dont care, it;ll just be undefined.
  const timelockId = undefined; //logs.find((l) => l.eventName === "CallScheduled")?.args.id;

  const { data: proposalTimelockState } = useProposalTimelockState({
    proposalTimelockId: timelockId,
    timelockAddress: governanceTimelockAddress,
  });

  if (!proposal || !proposal.id) {
    return null;
  }
  return (
    <div className="flex items-center gap-3 font-medium">
      {status === ProposalStatus.InQueue &&
        (proposalTimelockState === "ready" ? (
          <ExecuteButton
            proposal={proposal}
            title={frontmatter?.data.title || ""}
          />
        ) : (
          <CancelButton
            title={frontmatter?.data.title || ""}
            proposal={proposal}
            proposalTimelockId={timelockId}
          />
        ))}
      {status === ProposalStatus.Pending && (
        <CancelButton
          title={frontmatter?.data.title || ""}
          proposal={proposal}
        />
      )}
      {status === ProposalStatus.Active && (
        <VoteDialog
          proposal={proposal}
          disable={userVote && !!userVote.support}
        />
      )}
      {status === ProposalStatus.PendingQueue && (
        <QueueButton
          proposal={proposal}
          title={frontmatter?.data.title || ""}
        />
      )}
    </div>
  );
};
