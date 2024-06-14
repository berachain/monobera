import React from "react";
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
    // <div className="lg:h-68 xl:h-82 flex w-full flex-1 flex-col justify-end rounded-xl bg-[#111] lg:w-60 xl:w-72">
    <Link
      className="group flex w-full flex-1 flex-col justify-end rounded-xl border-2 border-[#111] bg-[#111] transition duration-300 hover:border-[#E6B63B]"
      href={link}
      target="__blank"
    >
      <div className="flex flex-grow flex-col items-center justify-center transition duration-300 group-hover:rotate-12">
        <img src={image} alt={title} className=" w-full object-cover" />
      </div>
      <div className="mb-8 flex h-1/5 flex-col items-center justify-center text-center transition duration-300 ease-in-out group-hover:translate-y-[-12%]">
        <h3 className="text-3xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </Link>
  );
};

export const HeroCards: React.FC = () => {
  const cards: HeroCardProps[] = [
    {
      image: `${cloudinaryUrl}/Station/Delegate_w7dgcg.jpg`,
      title: "Delegate",
      subtitle: "Delegate BGT to validators",
      link: "/delegate",
    },
    {
      image: `${cloudinaryUrl}/Station/Market_np5wrh.jpg`,
      title: "Gauge",
      subtitle: "View incentives and reward Gauges",
      link: "/gauge",
    },
    {
      image: `${cloudinaryUrl}/Station/Rewards_c6gfjc.jpg`,
      title: "Rewards",
      subtitle: "Claim incentives, fees and rewards",
      link: "/rewards",
    },
    {
      image: `${cloudinaryUrl}/Station/Redeem_pxz4zj.jpg`,
      title: "Redeem",
      subtitle: "Reedeem BGT for BERA",
      link: "/redeem",
    },
  ];

  return (
    <div className=" grid  w-full auto-rows-[330px] grid-cols-1 justify-around gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <HeroCard key={index} {...card} />
      ))}
    </div>
  );
};
