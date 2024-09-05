import { Icons } from "@bera/ui/icons";

export type PROPOSAL_GENRE = "berahub" | "honey" | "bend" | "berps" | "general";

export type Dapp = {
  color: string;
  icon: React.ReactNode;
  name: string;
  link: string;
};

export const NativeDapps: Dapp[] = [
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

export const Others: Dapp[] = [
  {
    color: "#2F2F2F",
    icon: <Icons.ecoFav className="h-16 w-16" />,
    name: "General",
    link: "general",
  },
];

export const getDappByGenre = (genre: PROPOSAL_GENRE) => {
  return (
    NativeDapps.find((dapp) => dapp.link === genre) ||
    Others.find((dapp) => dapp.link === genre)
  );
};

