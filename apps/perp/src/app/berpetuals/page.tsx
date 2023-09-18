import React from "react";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col-reverse lg:flex-row ">
      <div className="h-full w-full flex-shrink-0 border-r border-border lg:w-[400px]">
        Left
      </div>{" "}
      <div className="h-full w-full">Right</div>
    </div>
  );
}
