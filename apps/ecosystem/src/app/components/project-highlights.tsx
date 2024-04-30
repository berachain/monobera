"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import ComponentTransition from "./component-transition";

const highlights = [
  {
    img: "/gummi.png",
    title: "Gummi",
    content:
      "Gummi is a trading platform with an attached money market that supports any token by default including ERC20s, ERC721s, and ERC404s, with any amount of leverage.",
    url: "https://twitter.com/GummiFi",
    tags: ["DeFi", "GameFi"],
  },
  {
    img: "/iredbrand.png",
    title: "Infrared",
    content:
      "Infrared is a core infrastructure solution that abstracts aways the complexities of participating in Berachain's innovative PoL consensus mechanism.",
    url: "https://twitter.com/InfraredFinance",
    tags: ["DeFi", "GameFi"],
  },
  {
    img: "/kodiak.png",
    title: "Kodiak",
    content:
      "Foundational building block for liquidity on Berachain, embodying the core principles of modularity and extensibility to establish a cutting-edge swaps venue",
    url: "https://twitter.com/KodiakFi",
    tags: ["DeFi", "GameFi"],
  },
  {
    img: "/shogun.png",
    title: "Shogun",
    content:
      "Shogun uses intents across modular blockchains like Berachain and Celestia to turn MEV into TEV (trader extractable value)",
    url: "https://twitter.com/shogunfi",
    tags: ["DeFi", "GameFi"],
  },
  {
    img: "/beratone.png",
    title: "Beratone",
    content:
      "a captivating NFT game that invites players to unwind and nurture their virtual haven. Developed with a perfect blend of creativity and technology",
    url: "https://twitter.com/BeratoneGame",
    tags: ["DeFi", "GameFi"],
  },
];

export default function ProjectHighlights() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cardsVisible, setCardsVisible] = useState<number>(1);

  const updateCardsVisible = () => {
    if (window.innerWidth >= 1280) {
      setCardsVisible(5);
    } else if (window.innerWidth >= 1024) {
      setCardsVisible(4);
    } else if (window.innerWidth >= 640) {
      setCardsVisible(3);
    } else {
      setCardsVisible(1);
    }
  };

  useEffect(() => {
    updateCardsVisible();
    window.addEventListener("resize", updateCardsVisible);
    return () => window.removeEventListener("resize", updateCardsVisible);
  }, []);

  const goToPrevious = () => {
    if (!isAtStart) {
      setCurrentIndex((prev) => (prev <= 0 ? 0 : prev - 1));
    }
  };

  const goToNext = () => {
    if (!isAtEnd) {
      setCurrentIndex((prev) =>
        prev >= highlights.length - 1 ? highlights.length - 1 : prev + 1,
      );
    }
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd =
    currentIndex * cardsVisible >=
    highlights.length - currentIndex * cardsVisible;

  return (
    <ComponentTransition>
      <div className="w-full px-4 pb-1 xl:w-[1280px]">
        <div className="flex flex-col items-center justify-center gap-4 lg:flex-row xl:justify-between">
          <div className="text-center text-5xl font-bold text-foreground">
            Project Spotlight
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex">
              <Button
                onClick={goToPrevious}
                disabled={isAtStart}
                className="rounded-full"
                variant="ghost"
              >
                <Icons.arrowLeft onClick={goToPrevious} />
              </Button>
              <Button
                onClick={goToNext}
                disabled={isAtEnd}
                className="rounded-full"
                variant="ghost"
              >
                <Icons.arrowRight />
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <div
            onTouchStart={(e) => e.stopPropagation()}
            className="my-8 flex gap-4 scroll-smooth transition-transform duration-500 ease-linear "
            style={{
              transform: `translateX(-${currentIndex * cardsVisible * 10}%)`,
            }}
          >
            {highlights.map((section, index) => (
              <Link href={section.url} key={index} target="_blank">
                <div
                  key={section.title}
                  className="card-hover mx-auto flex h-[368px] w-[234px] flex-col items-center justify-start rounded-md border border-solid bg-background p-4 hover:opacity-80 hover:shadow-xl"
                >
                  <div className="justify-cente flex h-[96px] w-[96px] items-center ">
                    <Image
                      src={section.img}
                      alt="Project"
                      width={96}
                      height={96}
                      layout="intrinsic"
                      className="image-zoom items-center justify-center transition-all"
                    />
                  </div>
                  <div className="flex w-full flex-col items-start justify-between gap-3 py-4">
                    <div className="text-xl font-semibold text-foreground">
                      {section.title}
                    </div>
                    {/* <div className="flex flex-row gap-2 text-foreground">
                      {section.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="info"
                          className="flex items-center justify-center text-[10px]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div> */}
                  </div>

                  <div className="self-stretch text-left text-sm text-muted-foreground">
                    {section.content}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ComponentTransition>
  );
}
