import { ReactNode } from "react";
import Link from "next/link";
import {
  bgtUrl,
  blockExplorerUrl,
  faucetUrl,
  homepageUrl,
  honeyUrl,
  lendUrl,
  perpsUrl,
} from "@bera/config";
import { Icons } from "@bera/ui/icons";

export interface ExploreCardProps {
  image: ReactNode;
  title: string;
  background: string;
  subtitle: string | ReactNode;
  color?: string;
  href: string;
}
export const ExploreCard: React.FC<ExploreCardProps> = ({
  image,
  title,
  subtitle,
  background,
  color,
  href,
}) => {
  return (
    <Link
      href={href}
      target="__blank"
      className={`grid w-full cursor-pointer grid-cols-[minmax(90px,_1fr)_3fr] items-center justify-between gap-4 overflow-hidden rounded-xl border-[1px] border-border bg-transparent shadow-[0_10px_10px_0px_transparent] transition duration-300 hover:translate-y-[-1%] hover:scale-[1.02] hover:shadow-[${color}]`}
    >
      <div
        className="flex h-full flex-col items-center justify-center"
        style={{
          background,
        }}
      >
        {image}
      </div>
      <div className="flex flex-col gap-1 pr-2">
        <div className="font-bold">{title}</div>
        <div className="text-sm text-muted-foreground">{subtitle}</div>
      </div>
    </Link>
  );
};
export const Explore = () => {
  const cards: ExploreCardProps[] = [
    {
      image: <Icons.foundationFav className="h-16 w-16" />,
      title: "Foundation",
      subtitle: <>Explore Berachain and learn more about the vision</>,
      background: "#775A49",
      href: homepageUrl,
    },
    {
      image: <Icons.hubFav className="h-16 w-16" />,
      title: "BeraHub",
      subtitle: "The HUB for BGT Governance",
      background: "#E6B434",
      href: bgtUrl,
    },
    {
      image: <Icons.honeyFav className="h-16 w-16" />,
      title: "Honey",
      subtitle: "Mint or redeem Berachain's native stablecoin",
      background: "#EC8A19",
      href: honeyUrl,
    },
    {
      image: <Icons.faucetFav className="h-16 w-16" />,
      title: "Faucet",
      subtitle: "Fund your testnet wallet with BERA tokens",
      background: "#326FE5",
      href: faucetUrl,
    },
    {
      image: <Icons.berascanFav className="h-16 w-16" />,
      title: "Beratrails",
      subtitle: "Blockchain Explorer",
      background: "#96532C",
      href: blockExplorerUrl,
    },
    {
      image: <Icons.berpsFav className="h-16 w-16" />,
      title: "BERPS",
      subtitle: "Trade your favorite pairs",
      background: "#41D6E0",
      href: perpsUrl,
    },
    {
      image: <Icons.bendFav className="h-16 w-16" />,
      title: "BEND",
      subtitle: "Supply assets and borrow honey",
      background: "#7464E5",
      href: lendUrl,
    },
    {
      image: <Icons.ecoFav className="h-16 w-16" />,
      title: "Ecosystem",
      subtitle: "Browse Berachain Projects",
      background: "#2F2F2F",
      href: homepageUrl,
    },
  ];
  return (
    <div>
      <p className=" leading-15 mb-6 gap-2 text-4xl font-bold">
        Explore the
        <br />
        <Icons.logo className="inline-block" width={52} height={52} /> Berachain
        Ecosystem.
      </p>
      <div className="grid w-full auto-rows-[116px] grid-cols-1 justify-around gap-4 lg:grid-cols-3">
        {cards.map((card, index) => (
          <ExploreCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};
