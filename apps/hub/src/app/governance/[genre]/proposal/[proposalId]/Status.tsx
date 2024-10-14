import { useProposalTimelockState, type Vote } from "@bera/berajs";
import { VoteDialog } from "../../components/vote-dialog";
import { CancelButton } from "./components/cancel-button";
import { QueueButton } from "./components/queue-button";
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

  const { data: proposalTimelockState } = useProposalTimelockState({
    proposalTimelockId: proposal.timelockId,
    timelockAddress: governanceTimelockAddress,
  });

  if (!proposal || !proposal.id) {
    return null;
  }
  return (
    <div className="flex items-center gap-3 font-medium">
      {status === ProposalStatus.PendingExecution ||
      proposalTimelockState === "ready" ? (
        <ExecuteButton
          proposal={proposal}
          title={frontmatter?.data.title || ""}
        />
      ) : (
        status === ProposalStatus.InQueue && (
          <CancelButton
            title={frontmatter?.data.title || ""}
            proposal={proposal}
            proposalTimelockId={proposal.timelockId}
          />
        )
      )}
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
