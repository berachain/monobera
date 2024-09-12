import { GovernanceProvider } from "./components/governance-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GovernanceProvider>
      <section className="container">{children}</section>
    </GovernanceProvider>
  );
}
