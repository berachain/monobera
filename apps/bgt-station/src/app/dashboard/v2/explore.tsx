import { ReactNode } from "react";
import Link from "next/link";
import {
  bgtUrl,
  blockExplorerUrl,
  cloudinaryUrl,
  dexUrl,
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
      className={`grid w-full cursor-pointer grid-cols-[minmax(110px,_1fr)_3fr] items-center justify-between gap-4 overflow-hidden rounded-xl border-[1px] border-border bg-transparent shadow-[0_10px_10px_0px_transparent] transition duration-300 hover:translate-y-[-1%] hover:scale-[1.02] hover:shadow-[${color}]`}
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
        <div className="text-sm text-[#868E96]">{subtitle}</div>
      </div>
    </Link>
  );
};
export const Explore = () => {
  const cards: ExploreCardProps[] = [
    {
      image: <Icons.FoundationPlain width={40} height={40} />,
      title: "Foundation",
      subtitle: <>Explore Berachain and learn more about the vision</>,
      color: "#E2C7B7",
      background:
        "radial-gradient(50% 50% at 50% 50%, #C7AA9A 0%, #775A49 100%), radial-gradient(50% 50% at 50% 50%, #B59065 0%, #69422B 100%), radial-gradient(50% 50% at 50% 50%, #E2C7B7 0%, #DB7E49 100%)",
      href: homepageUrl,
    },
    {
      image: <Icons.BgtPlain width={40} height={40} />,
      title: "BGT Station",
      subtitle: "The HUB for BGT Governance",
      color: "#DCB756",
      background:
        "radial-gradient(50% 50% at 50% 50%, #E9D9B2 0%, #EDBD42 100%), radial-gradient(50% 50% at 50% 50%, #E9D9B2 0%, #EDBD42 100%), radial-gradient(50% 50% at 50% 50%, #E0814A 0%, #DCB756 100%)",
      href: bgtUrl,
    },
    {
      image: <Icons.HoneyPlain width={40} height={40} />,
      title: "Honey",
      subtitle: "Mint or redeem Berachain’s native stablecoin",
      background:
        "radial-gradient(50% 50% at 50% 50%, #E9D0B4 0%, #EC8A19 100%), radial-gradient(50% 50% at 50% 50%, #E9D0B4 0%, #DA7E13 100%)",
      href: honeyUrl,
    },
    {
      image: <Icons.BexPlain width={40} height={40} />,
      title: "BEX",
      subtitle: "Swap Tokens and provide liquidity",
      background:
        "radial-gradient(50% 50% at 50% 50%, #E29686 0%, #E96042 100%), radial-gradient(50% 50% at 50% 50%, #E2C7B7 0%, #DB7E49 100%)",
      href: dexUrl,
    },
    {
      image: <Icons.FaucetPlain width={40} height={40} />,
      title: "Faucet",
      subtitle: "Fund your testnet wallet with BERA tokens",
      background:
        "radial-gradient(50% 50% at 50% 50%, #C0D5ED 0%, #326FE5 100%), radial-gradient(50% 50% at 50% 50%, #E1EAF7 0%, #0D5BD1 100%)",
      href: faucetUrl,
    },
    {
      image: <Icons.BeratailPlain width={40} height={40} />,
      title: "Beratrails",
      subtitle: "Blockchain Explorer",
      background:
        "radial-gradient(50% 50% at 50% 50%, #D5AC94 0%, #96532C 100%), radial-gradient(50% 50% at 50% 50%, #652F10 0%, #C99070 100%)",
      href: blockExplorerUrl,
    },
    {
      image: <Icons.BerpsPlain width={40} height={40} />,
      title: "BERPS",
      subtitle: "Trade your favorite pairs",
      background:
        "radial-gradient(50% 50% at 50% 50%, #AEE4E7 0%, #41D6E0 100%), radial-gradient(50% 50% at 50% 50%, #AF95AB 0%, #4F3737 100%), radial-gradient(50% 50% at 50% 50%, #B9581F 0%, #D8A180 100%), radial-gradient(50% 50% at 50% 50%, #E2C7B7 0%, #DB7E49 100%)",
      href: perpsUrl,
    },
    {
      image: <Icons.BendPlain width={40} height={40} />,
      title: "BEND",
      subtitle: "Supply assets and borrow honey",
      background:
        "radial-gradient(50% 50% at 50% 50%, #C7C2EB 0%, #7464E5 100%), radial-gradient(50% 50% at 50% 50%, #EBE6D4 0%, #ECC127 100%)",
      href: lendUrl,
    },
  ];
  return (
    <div>
      <p className=" leading-15 mb-6 gap-2 text-4xl font-bold">
        Explore the
        <br />
        <span className="flex flex-row items-center gap-2">
          <Icons.logo width={52} height={52} />
          Berachain Ecosystem.
        </span>
      </p>
      <div className="grid w-full auto-rows-[116px] grid-cols-1 justify-around gap-4 lg:grid-cols-3">
        {cards.map((card, index) => (
          <ExploreCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};
