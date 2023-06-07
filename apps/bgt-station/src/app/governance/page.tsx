import { ListProposals } from "~/app/governance/components/list-proposals";
import { StatusEnum } from "~/app/governance/types";

export default function Governance() {
  return (
    <div className="container">
      <ListProposals status={StatusEnum.Voting} />
    </div>
  );
}
