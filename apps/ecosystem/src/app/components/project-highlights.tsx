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
  const [currentIndex, setCurrentIndex] = useState(1); // Start from 1 because of the duplicated first item at the beginning
  const [itemWidth, setItemWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      const firstChild = sliderRef.current.children[0] as HTMLElement;
      setItemWidth(firstChild.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (!sliderRef.current) return;

    const maxScrollPosition = itemWidth * highlights.length; // Calculate max scroll position
    const updatePosition = () => {
      let newPosition = currentIndex * itemWidth;
      if (newPosition >= maxScrollPosition) {
        newPosition = itemWidth; // Reset to first item position
        setCurrentIndex(1);
      } else if (newPosition <= 0) {
        newPosition = itemWidth * highlights.length; // Move to last item position
        setCurrentIndex(highlights.length);
      }
      sliderRef.current.style.transform = `translateX(-${newPosition}px)`;
    };

    updatePosition();
  }, [currentIndex, itemWidth]);

  const goToPrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 0.5s ease-in-out";
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 0.5s ease-in-out";
      setCurrentIndex(currentIndex + 1);
    }
  };

  const itemsForLooping = [
    highlights[highlights.length - 2],
    highlights[highlights.length - 1],
    ...highlights,
    highlights[0],
    highlights[1],
  ];

  return (
    <div className="w-full px-4 pb-16 pt-16 xl:w-[1280px]">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center text-5xl font-bold leading-[48px] text-foreground">
          Project Spotlight
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex">
            <Button
              onClick={goToPrevious}
              className="rounded-full"
              variant="ghost"
            >
              <Icons.arrowLeft onClick={goToPrevious} />
            </Button>
            <Button onClick={goToNext} className="rounded-full" variant="ghost">
              <Icons.arrowRight />
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="mt-4 flex w-full max-w-lg snap-x gap-4 scroll-smooth transition-transform duration-300 ease-linear lg:flex"
        onTouchStart={(e) => e.stopPropagation()}
        style={{
          transform: `translateX(-${currentIndex * itemWidth + 596}px)`,
        }}
      >
        {itemsForLooping.map((section, index) => (
          <Link href={section.link} key={index} target="_blank">
            <div className="card-hover mx-auto flex h-[308px] w-[298px] flex-col items-center justify-start rounded-md border border-solid bg-background p-4 hover:opacity-80 hover:shadow-xl">
              <Image
                src="/partnerships_placeholder.png"
                alt="Project"
                width={266}
                height={148}
                className="rounded-2 image-zoom"
              />
              <div className="flex w-[266px] items-center justify-between py-4">
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

              <div className="self-stretch text-center text-sm leading-5 text-muted-foreground">
                {section.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
