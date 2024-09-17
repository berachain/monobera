import { PROPOSAL_GENRE } from "../governance-genre-helper";
import { GovernanceProvider } from "./components/governance-provider";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { genre: PROPOSAL_GENRE };
}) {
  return (
    <GovernanceProvider genre={params.genre}>{children}</GovernanceProvider>
  );
}
