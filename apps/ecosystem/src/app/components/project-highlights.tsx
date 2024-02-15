import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

const highlights = [
  {
    title: "Title 1",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Validator", "Staking", "Bera"],
  },
  {
    title: "Title 2",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Validator", "Staking", "Bera"],
  },
  {
    title: "Title 3",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Validator", "Staking", "Bera"],
  },
  {
    title: "Title 4",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Validator", "Staking", "Bera"],
  },
  {
    title: "Title 5",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Validator", "Staking", "Bera"],
  },
  {
    title: "Title 6",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Validator", "Staking", "Bera"],
  },
  {
    title: "Title 7",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Validator", "Staking", "Bera"],
  },
  {
    title: "Title 8",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Validator", "Staking", "Bera"],
  },
  {
    title: "Title 9",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Validator", "Staking", "Bera"],
  },
  {
    title: "Title 10",
    link: "",
    image: "https://via.placeholder.com/150",
    tags: ["Validator", "Staking", "Bera"],
  },
];

export default function ProjectHighlights() {
  const [currentIndex, setCurrentIndex] = useState(0); // Start from 1 because of the duplicated first item at the beginning
  const [itemWidth, setItemWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      console.log("sliderRef", sliderRef.current);
      const firstChild = sliderRef.current.children[0] as HTMLElement;
      setItemWidth(firstChild.offsetWidth);
    }
  }, []);

  useEffect(() => {
    console.log("currentIndex", currentIndex);
    // Adjust the scroll position for the looping effect
    if (sliderRef.current) {
      const lastChildIndex = highlights.length + 1;
      const firstChildWidth = itemWidth;
      if (currentIndex === 0) {
        // If it's the first item (duplicated last item), jump to the actual last item
        sliderRef.current.style.transition = "none";
        setCurrentIndex(highlights.length);
        sliderRef.current.scrollLeft = firstChildWidth * highlights.length;
      } else if (currentIndex === lastChildIndex - 1) {
        // If it's the duplicated first item at the end, jump to the actual first item
        sliderRef.current.style.transition = "none";
        setCurrentIndex(1);
        sliderRef.current.scrollLeft = firstChildWidth;
      }
    }
  }, [currentIndex, itemWidth, highlights.length]);

  const goToPrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = "scroll 1s ease-in-out";
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = "scroll 1s ease-in-out";
      setCurrentIndex(currentIndex + 1);
    }
  };

  const itemsForLooping = [
    highlights[highlights.length - 1],
    ...highlights,
    highlights[0],
  ];

  return (
    <div>
      <div className="text-center text-3xl font-bold leading-[48px] text-foreground sm:text-5xl">
        Project Spotlight
      </div>
      <div className="flex flex-col items-center justify-center space-y-4 p-4">
        <div className="flex space-x-4">
          <Button onClick={goToPrevious}>
            <Icons.arrowLeft />
          </Button>
          <Button onClick={goToNext}>
            <Icons.arrowRight />
          </Button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="mt-4 flex max-w-lg snap-x gap-4 scroll-smooth whitespace-nowrap transition-transform duration-300 ease-linear lg:flex"
        onTouchStart={(e) => e.stopPropagation()}
        style={{ transform: `translateX(-${currentIndex * itemWidth + 16}px)` }}
      >
        {itemsForLooping.map((section, index) => (
          <Link href={section.link} target="_blank">
            <div
              key={index}
              className="relative flex h-[266px] w-[266px] snap-center flex-col items-center justify-center rounded-xl border border-solid bg-background hover:opacity-80 hover:shadow-xl"
            >
              <Skeleton className="rounded-2 h-[148px] w-[240px]" />
              <div className="flex flex-col items-center gap-1 px-6 pb-4 pt-6">
                <div className="text-xl font-semibold text-foreground">
                  {section.title}
                </div>
              </div>
              <div className="item-center flex w-full justify-center gap-1 p-3 pt-6"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
