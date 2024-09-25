import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { cloudinaryUrl, dexUrl, lendUrl, perpsUrl } from "@bera/config";
import { FadeSlides } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { cn } from "@bera/ui";
export interface HowToEarnCardProps {
  image: string;
  title: string;
  subtitle: string | ReactNode;
  className?: string;
}

export const HowToEarnCard: React.FC<HowToEarnCardProps> = ({
  image,
  title,
  subtitle,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex h-full w-full grid-cols-1 flex-col justify-between overflow-hidden rounded-xl border-[1px] border-border bg-transparent px-4 py-3",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold text-muted-foreground">{title}</div>
        <div className="font-bold text-muted-foreground">{subtitle}</div>
      </div>
      <div className="flex flex-grow flex-col justify-self-end">
        <img src={image} alt={title} className="h-[160px] object-contain" />
      </div>
    </div>
  );
};

export const HowToEarn = () => {
  const step1Cards: HowToEarnCardProps[] = [
    {
      image: `${cloudinaryUrl}/Station/wjejdpxjbufqqk6dmezv`,
      title: "Step 1",
      subtitle: (
        <>
          Deposit tokens in a{" "}
          <a
            href={dexUrl}
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            BEX liquidity Pool
          </a>
        </>
      ),
    },
    {
      image: `${cloudinaryUrl}/Station/qwfu0axkx04krmt35nag`,
      title: "Step 1",
      subtitle: (
        <>
          Borrow HONEY from{" "}
          <a
            href={lendUrl}
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            BEND
          </a>
        </>
      ),
    },
    {
      image: `${cloudinaryUrl}/Station/rvibpqls211afcxyb2wc`,
      title: "Step 1",
      subtitle: (
        <>
          Deposit HONEY in{" "}
          <a
            href={perpsUrl}
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            BERPS
          </a>
        </>
      ),
    },
  ];
  const step2Cards: HowToEarnCardProps[] = [
    {
      image: `${cloudinaryUrl}/Station/j1awylj5pprulkrcr3f1`,
      title: "Step 2",
      subtitle: "Receive receipt tokens",
    },
    {
      image: `${cloudinaryUrl}/Station/wzkj1hximsuf2ahx3cde`,
      title: "Step 2",
      subtitle: "Receive receipt tokens",
    },
    {
      image: `${cloudinaryUrl}/Station/frbmavtjzg0lkapzp2pa`,
      title: "Step 2",
      subtitle: "Receive receipt tokens",
    },
  ];
  const step3Cards: HowToEarnCardProps[] = [
    {
      image: `${cloudinaryUrl}/Station/ukuiqbegdvxxouovyo6h.jpg`,
      title: "Step 3",
      subtitle: (
        <>
          Stake receipt tokens in{" "}
          <Link
            href={"/vaults"}
            target="_self"
            className="underline"
            rel="noreferrer"
          >
            Rewards Vaults
          </Link>
        </>
      ),
    },
    {
      image: `${cloudinaryUrl}/Station/ukuiqbegdvxxouovyo6h.jpg`,
      title: "Step 3",
      subtitle: (
        <>
          Stake receipt tokens in{" "}
          <Link
            href={"/gauges"}
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            Gauge Vault
          </Link>
        </>
      ),
    },
    {
      image: `${cloudinaryUrl}/Station/ukuiqbegdvxxouovyo6h.jpg`,
      title: "Step 3",
      subtitle: (
        <>
          Stake receipt tokens in{" "}
          <Link
            href={"/gauges"}
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            Gauge Vault
          </Link>
        </>
      ),
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [numSlides] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % numSlides);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className="leading-15 mb-6 text-5xl font-bold">
        How to earn{" "}
        <Icons.bgt className="inline-block drop-shadow-[0_5px_5px_rgba(251,191,36,0.5)] md:h-10 md:w-10" />{" "}
        BGT
      </div>
      <div className="grid w-full  auto-rows-[215px] grid-cols-1 justify-between gap-4 lg:grid-cols-3">
        <FadeSlides
          currentSlide={currentSlide}
          slides={[
            <HowToEarnCard {...step1Cards[0]} />,
            <HowToEarnCard {...step1Cards[1]} />,
            <HowToEarnCard {...step1Cards[2]} />,
          ]}
        />

        <FadeSlides
          currentSlide={currentSlide}
          slides={[
            <HowToEarnCard {...step2Cards[0]} />,
            <HowToEarnCard {...step2Cards[1]} />,
            <HowToEarnCard {...step2Cards[2]} />,
          ]}
        />
        <FadeSlides
          currentSlide={currentSlide}
          slides={[
            <HowToEarnCard {...step3Cards[0]} />,
            <HowToEarnCard {...step3Cards[0]} />,
            <HowToEarnCard {...step3Cards[0]} />,
          ]}
        />
      </div>
    </div>
  );
};
