import Link from "next/link";
import { Icons } from "@bera/ui/icons";

const NativeDapps = [
  {
    color: "#E6B434",
    icon: <Icons.hubFav className="h-16 w-16" />,
    name: "BeraHub",
    link: "berahub",
  },
  {
    color: "#EC8A19",
    icon: <Icons.honeyFav className="h-16 w-16" />,
    name: "Honey",
    link: "honey",
  },
  {
    color: "#7464E5",
    icon: <Icons.bendFav className="h-16 w-16" />,
    name: "BEND",
    link: "bend",
  },
  {
    color: "#41D6E0",
    icon: <Icons.berpsFav className="h-16 w-16" />,
    name: "BERPS",
    link: "berps",
  },
];

const Others = [
  {
    color: "#2F2F2F",
    icon: <Icons.ecoFav className="h-16 w-16" />,
    name: "General",
    link: "general",
  },
];

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <div className="font-bold leading-6  tracking-wider text-muted-foreground">
          GOVERNANCE
        </div>
        <div className="text-5xl font-bold">
          Berachain <br /> Governance Forum
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="font-semibold leading-6  tracking-wider text-muted-foreground">
          NATIVE dAPPS
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {NativeDapps.map((dapp) => (
            <Link
              className="w-full cursor-pointer overflow-hidden rounded-lg border border-border transition-all hover:scale-105"
              key={dapp.name}
              href={`governance/${dapp.link}`}
            >
              <div
                className="flex justify-center border-b border-border p-1"
                style={{ background: dapp.color }}
              >
                {dapp.icon}
              </div>
              <div className="p-4 text-xl font-semibold">{dapp.name}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="font-semibold leading-6 tracking-wider text-muted-foreground">
          OTHER
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Others.map((dapp) => (
            <Link
              className="w-full cursor-pointer overflow-hidden rounded-lg border border-border transition-all hover:scale-105"
              key={dapp.name}
              href={`governance/${dapp.link}`}
            >
              <div
                className="flex justify-center border-b border-border p-1"
                style={{ background: dapp.color }}
              >
                {dapp.icon}
              </div>
              <div className="p-4 text-xl font-semibold">{dapp.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
