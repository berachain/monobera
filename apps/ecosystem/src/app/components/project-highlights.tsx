import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

const highlights = [
  {
    title: "Bera Bera",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Validator"],
    description:
      "Lorem Ipsum Saint Dolar set amet avec, adios bibbas Lorem Ipsum Saint Dolar set amet avec, adios bibbas ",
  },
  {
    title: "Hello Bera world",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Bera"],
    description: "Lorem Ipsum Saint",
  },
  {
    title: "Ooga booga",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Bera"],
    description: "Lorem Ipsum Saint",
  },
  {
    title: "The Future of DAOs",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Bera"],
    description: "Lorem Ipsum Saint",
  },
  {
    title: "The Future of Bera",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Bera"],
    description: "Lorem Ipsum Saint",
  },
  {
    title: "The Future of Honey",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Bera"],
    description: "Lorem Ipsum Saint",
  },
  {
    title: "The Future of BGT",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Bera"],
    description:
      "Lorem Ipsum Saint Dolar set amet avec, adios bibbas Lorem Ipsum Saint Dolar set amet avec, adios bibbas ",
  },
  {
    title: "Yayyyy",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Validator", "Staking", "Bera"],
    description: "this is a test",
  },
  {
    title: "Celestia",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Validator", "Bera"],
    description: "Lorem Ipsum Saint",
  },
  {
    title: "Henlo",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Validator", "Staking"],
    description: "Lorem Ipsum Saint",
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
      setCardsVisible(2);
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
    <div className="w-full px-4 pb-1 pt-16 xl:w-[1280px]">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
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
          className="my-8 flex gap-4 scroll-smooth transition-transform duration-200 ease-linear "
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {highlights.map((section, index) => (
            <Link href={section.link} key={index} target="_blank">
              <div
                key={section.title}
                className="card-hover mx-auto flex h-[368px] w-[234px] flex-col items-center justify-start rounded-md border border-solid bg-background p-4 hover:opacity-80 hover:shadow-xl"
              >
                <Image
                  src="/partnerships_placeholder.png"
                  alt="Project"
                  width={194}
                  height={148}
                  layout="intrinsic"
                  className="rounded-2 image-zoom h-[148px] w-[194px]"
                />
                <div className="flex w-full flex-col items-start justify-between gap-3 py-4">
                  <div className="text-xl font-semibold text-foreground">
                    {section.title}
                  </div>
                  <div className="flex flex-row gap-2 text-foreground">
                    {section.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="info"
                        className="flex items-center justify-center text-[10px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="self-stretch text-left text-sm text-muted-foreground">
                  {section.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
