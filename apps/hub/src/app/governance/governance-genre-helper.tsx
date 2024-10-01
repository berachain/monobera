import { governanceSubgraphUrl } from "@bera/config";
import { Icons } from "@bera/ui/icons";

export type PROPOSAL_GENRE = "berahub" | "honey" | "bend" | "berps" | "general";

export type GovernanceTopic = {
  id: PROPOSAL_GENRE;
  color: string;
  icon: React.ReactNode;
  iconBackground?: string;
  name: string;
  slug: string;
  subgraph: string;
};

export const NativeDapps: GovernanceTopic[] = [
  {
    id: "berahub",
    color: "#E6B434",
    icon: <Icons.hubFav className="h-16 w-16" />,
    name: "BeraHub",
    slug: "berahub",
    // subgraph: governanceSubgraphUrl,
    subgraph:
      "https://api.goldsky.com/api/public/project_clq1h5ct0g4a201x18tfte5iv/subgraphs/governance-subgraph/v1/gn",
  },
  {
    id: "honey",
    color: "#EC8A19",
    icon: <Icons.honeyFav className="h-16 w-16" />,
    name: "Honey",
    slug: "honey",
    subgraph: governanceSubgraphUrl,
  },
  {
    id: "bend",
    color: "#7464E5",
    icon: <Icons.bendFav className="h-16 w-16" />,
    name: "BEND",
    slug: "bend",
    subgraph: governanceSubgraphUrl,
  },
  {
    id: "berps",
    color: "#41D6E0",
    icon: <Icons.berpsFav className="h-16 w-16" />,
    name: "BERPS",
    slug: "berps",
    subgraph: governanceSubgraphUrl,
  },
] as const;

export const Others: GovernanceTopic[] = [
  {
    id: "general",
    color: "#AFABAB",
    iconBackground: "#2F2F2F",
    icon: <Icons.ecoFav className="h-16 w-16" />,
    name: "General",
    slug: "general",
    subgraph: governanceSubgraphUrl,
  },
];

export const getDappByGenre = (genre: PROPOSAL_GENRE) => {
  return (
    NativeDapps.find((dapp) => dapp.id === genre) ||
    Others.find((dapp) => dapp.id === genre)
  );
};

export const isValidGenre = (genre: any): genre is PROPOSAL_GENRE => {
  return (
    NativeDapps.some((dapp) => dapp.id === genre) ||
    Others.some((dapp) => dapp.id === genre)
  );
};
