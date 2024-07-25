import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cloudinaryUrl } from "@bera/config";

export interface HeroCardProps {
  image: string;
  title: string;
  subtitle: string;
  link: string;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  image,
  title,
  subtitle,
  link,
}) => {
  return (
    <Link
      className="group flex w-full flex-1 flex-col justify-end rounded-xl border-2 border-border transition duration-300 hover:border-accent"
      href={link}
      target="_self"
    >
      <div className="flex max-h-[230px] flex-grow flex-col items-center justify-center transition duration-300 group-hover:rotate-12">
        <Image
          src={image}
          alt={title}
          className="h-full w-full object-contain"
          width={400}
          height={200}
        />
      </div>
      <div className="mb-8 flex h-1/5 flex-col items-center justify-center text-center transition duration-300 ease-in-out group-hover:translate-y-[-12%]">
        <h3 className="text-3xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </Link>
  );
};

export const HeroCards: React.FC = () => {
  const cards: HeroCardProps[] = [
    {
      image: `${cloudinaryUrl}/Station/xso57in9nkp0oa05pybj.jpg`,
      title: "Swap",
      subtitle: "Swap Tokens or Redeem your BGT",
      link: "/swap",
    },
    {
      image: `${cloudinaryUrl}/Station/hqeqljkwii478qlegfma.jpg`,
      title: "Pools",
      subtitle: "View pools or create your own",
      link: "/pools",
    },
    {
      image: `${cloudinaryUrl}/Station/rgytgfadryf0gotnwkdi.jpg`,
      title: "Rewards Vaults",
      subtitle: "Deposit receipt tokens to earn rewards",
      link: "/vaults",
    },
    {
      image: `${cloudinaryUrl}/Station/ug8exzswd7l3acphln0g.jpg`,
      title: "Delegate",
      subtitle: "Delegate BGT to validators",
      link: "/validators",
    },
  ];

  return (
    <div className=" grid  w-full auto-rows-[330px] grid-cols-1 justify-around gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <HeroCard key={index} {...card} />
      ))}
    </div>
  );
};
