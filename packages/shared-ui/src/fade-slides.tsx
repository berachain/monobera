"use client";


import { FC, ReactNode, useEffect, useState } from "react";

export const FadeSlides: FC<{
  slides: ReactNode[];
  speed?: number;
  currentSlide?: number;
}> = ({ slides, speed = 1000, currentSlide }) => {
  const [_currentSlide, set_CurrentSlide] = useState(currentSlide ?? 0);
  const [isSlide1Shown, setIsSlide1Shown] = useState(true);
  const [slide1Content, setSlide1Content] = useState(slides[0]);
  const [slide2Content, setSlide2Content] = useState(slides[1] ?? slides[0]);
  const [shouldHide, setShouldHide] = useState(false);

  const handleSetSlide = (slideNumber: number) => {
    setShouldHide(slides[slideNumber] === undefined);
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

  return (
    <div
      className={`relative h-full w-full transition transition-opacity duration-500 ${
        !shouldHide ? "" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 z-[2] bg-background transition transition-opacity duration-500 ${
          isSlide1Shown ? "" : "pointer-events-none opacity-0"
        }`}
      >
        {slide1Content}
      </div>
      {!shouldHide && (
        <div
          className={
            "absolute bottom-0 left-0 right-0 top-0 z-[1] bg-background"
          }
        >
          {slide2Content}
        </div>
      )}
    </div>
  );
};
