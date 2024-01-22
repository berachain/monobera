import React, { type PropsWithChildren } from "react";

export const HoverState = ({ children }: PropsWithChildren) => {
  return (
    <div className="z-100 absolute bottom-full hidden w-max rounded-sm text-sm text-white opacity-0 shadow-lg group-hover:block group-hover:opacity-100">
      <div className="flex flex-col items-start gap-2 rounded-sm border bg-background p-4">
        {children}
      </div>
    </div>
  );
};
