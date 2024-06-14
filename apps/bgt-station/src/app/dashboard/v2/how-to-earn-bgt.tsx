import { FC, ReactNode, useEffect, useState } from "react";
import { Shadows_Into_Light } from "next/font/google";
import Link from "next/link";
import { cloudinaryUrl, dexUrl, lendUrl, perpsUrl } from "@bera/config";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";

const shadowsIntoLight = Shadows_Into_Light({
  weight: ["400"],
  subsets: ["latin"],
});

export interface HowToEarnCardProps {
  image: string;
  title: string;
  subtitle: string | ReactNode;
}

export const HowToEarnCard: React.FC<HowToEarnCardProps> = ({
  image,
  title,
  subtitle,
}) => {
  return (
    <div className="flex h-full w-full grid-cols-1 flex-col justify-between overflow-hidden rounded-xl border-[1px] border-border bg-transparent px-4 py-3">
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            "font-weight-[400] text-2xl text-[#8B8B8B]",
            shadowsIntoLight.className,
          )}
        >
          {title}
        </div>
        <div className="font-bold italic text-muted-foreground">{subtitle}</div>
      </div>
      <div className="flex flex-grow flex-col justify-self-end">
        <img src={image} alt={title} className="h-[160px] object-contain" />
      </div>
    </div>
  );
};

const FadeSlides: FC<{
  slides: ReactNode[];
  speed?: number;
  currentSlide?: number;
}> = ({ slides, speed = 1000, currentSlide }) => {
  const [_currentSlide, set_CurrentSlide] = useState(currentSlide ?? 0);
  const [isSlide1Shown, setIsSlide1Shown] = useState(true);
  const [slide1Content, setSlide1Content] = useState(slides[0]);
  const [slide2Content, setSlide2Content] = useState(slides[1] ?? slides[0]);

  const handleSetSlide = (slideNumber: number) => {
    if (!isSlide1Shown) {
      setSlide1Content(slides[slideNumber]);
      setIsSlide1Shown(true);
    } else {
      setSlide2Content(slides[slideNumber]);
      setIsSlide1Shown(false);
    }
  };

  useEffect(() => {
    handleSetSlide(_currentSlide);
  }, [_currentSlide]);

  // This section is the logic for self controlled fade slides, if no currentSlide prop passed, it will cycle through given slides with the speed prop
  const handleNextSlide = (nextSlide: number) => {
    set_CurrentSlide(nextSlide);
    setTimeout(() => {
      handleNextSlide((nextSlide + 1) % slides.length);
    }, speed);
  };

  useEffect(() => {
    if (currentSlide !== undefined) return;
    setTimeout(() => {
      handleNextSlide(1);
    }, speed);
  }, []);

  // This section is the logic for externally controlled fade slides, this allows the passing of a currentSlide prop to navigate to that slide index, if out of bounds will return null
  useEffect(() => {
    if (currentSlide === undefined) return;
    set_CurrentSlide(currentSlide);
  }, [currentSlide]);

  if (
    (isSlide1Shown && slide1Content === null) ||
    (!isSlide1Shown && slide2Content === null)
  )
    return null;

  return (
    <div className="relative h-full w-full">
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 z-[2] bg-background transition transition-opacity duration-500 ${
          isSlide1Shown ? "" : "pointer-events-none opacity-0"
        }`}
      >
        {slide1Content}
      </div>
      <div
        className={"absolute bottom-0 left-0 right-0 top-0 z-[1] bg-background"}
      >
        {slide2Content}
      </div>
    </div>
  );
};

export const HowToEarn = () => {
  const step1Cards: HowToEarnCardProps[] = [
    {
      image: `${cloudinaryUrl}/Station/52525252_rnz5dj.jpg`,
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
      image: `${cloudinaryUrl}/Station/btd6rcfpatj2jljwommn.jpg`,
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
      image: `${cloudinaryUrl}/Station/pkq96nsxdkdlw4o5d8zg.jpg`,
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
      image: `${cloudinaryUrl}/Station/5252352_q3bwdt.jpg`,
      title: "Step 2",
      subtitle: "Receive receipt tokens",
    },
    {
      image: `${cloudinaryUrl}/Station/yeyrlwag0mqbg9ratcys.jpg`,
      title: "Step 2",
      subtitle: "Receive receipt tokens",
    },
    {
      image: `${cloudinaryUrl}/Station/d5nomljrhyjvg53ul4eu.jpg`,
      title: "Step 2",
      subtitle: "Receive receipt tokens",
    },
  ];
  const step3Cards: HowToEarnCardProps[] = [
    {
      image: `${cloudinaryUrl}/Station/241414141_minavu.jpg`,
      title: "Step 3",
      subtitle: (
        <>
          Stake receipt tokens in{" "}
          <Link
            href={"/gauge"}
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
      <span className="leading-15 mb-6 flex flex-row items-center gap-2 text-4xl font-bold">
        How to earn{" "}
        <Icons.bgt className=" drop-shadow-[0_5px_5px_rgba(251,191,36,0.5)] md:h-10 md:w-10" />{" "}
        BGT
      </span>
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
          slides={[<HowToEarnCard {...step3Cards[0]} />]}
        />
      </div>
    </div>
  );
};
