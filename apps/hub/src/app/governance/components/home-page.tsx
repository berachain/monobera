import Link from "next/link";

import {
  GovernanceTopic,
  NativeDapps,
  Others,
} from "../governance-genre-helper";

const GovernanceSection = ({
  title,
  dapps,
}: {
  title: string;
  dapps: GovernanceTopic[];
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold leading-6 tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-4">
        {dapps.map((dapp: GovernanceTopic) => (
          <Link
            className="w-full cursor-pointer overflow-hidden rounded-lg border border-border transition-all hover:scale-105"
            key={dapp.name}
            href={`/governance/${dapp.slug}`}
          >
            <div
              className="flex justify-center border-b border-border p-1"
              style={{ background: dapp.color }}
            >
              {dapp.icon}
            </div>
            <h3 className="p-4 text-xl font-semibold">{dapp.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-12 pb-32">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold leading-6 tracking-wider text-muted-foreground">
          GOVERNANCE
        </h1>
        <h2 className="text-5xl font-bold">
          Berachain <br /> Governance Forum
        </h2>
      </div>

      <GovernanceSection title="NATIVE dAPPS" dapps={NativeDapps} />
      <GovernanceSection title="OTHER" dapps={Others} />
    </div>
  );
};
