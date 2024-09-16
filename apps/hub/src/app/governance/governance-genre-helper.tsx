import { governanceSubgraphUrl } from "@bera/config";
import { Icons } from "@bera/ui/icons";

export type PROPOSAL_GENRE = "berahub" | "honey" | "bend" | "berps" | "general";

export type DappConfig = {
  id: PROPOSAL_GENRE;
  color: string;
  icon: React.ReactNode;
  name: string;
  link: string;
  subgraph: string;
};

export const NativeDapps: DappConfig[] = [
  {
    id: "berahub",
    color: "#E6B434",
    icon: <Icons.hubFav className="h-16 w-16" />,
    name: "BeraHub",
    link: "berahub",
    subgraph: governanceSubgraphUrl,
  },
  {
    id: "honey",
    color: "#EC8A19",
    icon: <Icons.honeyFav className="h-16 w-16" />,
    name: "Honey",
    link: "honey",
    subgraph: governanceSubgraphUrl,
  },
  {
    id: "bend",
    color: "#7464E5",
    icon: <Icons.bendFav className="h-16 w-16" />,
    name: "BEND",
    link: "bend",
    subgraph: governanceSubgraphUrl,
  },
  {
    id: "berps",
    color: "#41D6E0",
    icon: <Icons.berpsFav className="h-16 w-16" />,
    name: "BERPS",
    link: "berps",
    subgraph: governanceSubgraphUrl,
  },
];

export const Others: DappConfig[] = [
  {
    id: "general",
    color: "#2F2F2F",
    icon: <Icons.ecoFav className="h-16 w-16" />,
    name: "General",
    link: "general",
    subgraph: governanceSubgraphUrl,
  },
];

export const getDappByGenre = (genre: PROPOSAL_GENRE) => {
  return (
    NativeDapps.find((dapp) => dapp.link === genre) ||
    Others.find((dapp) => dapp.link === genre)
  );
};

export const isValidGenre = (genre: any): genre is PROPOSAL_GENRE => {
  return (
    NativeDapps.some((dapp) => dapp.link === genre) ||
    Others.some((dapp) => dapp.link === genre)
  );
};
