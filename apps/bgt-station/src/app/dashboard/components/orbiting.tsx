import { ReactNode } from "react";
import { cn } from "@bera/ui";

export const OrbitingLeftToRight = ({
  classname,
  children,
}: {
  classname?: string;
  children?: ReactNode;
}) => {
  return (
    <div className={cn("h-[120px] w-fit", classname)}>
      <div className="relative flex h-[400px] w-[400px] items-center justify-center transform -translate-y-[60px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none relative h-full w-full"
        >
          <circle
            className="stroke-foreground stroke-2"
            cx="50%"
            cy="100%"
            r={320}
            fill="none"
            strokeDasharray="6 6"
          />
        </svg>
        <div
          style={
            {
              "--start": 180 - 50,
              "--end": 180 + 50,
              "--duration": 5,
              "--radius": 295,
              "--delay": 0,
            } as React.CSSProperties
          }
          className="animate-orbit absolute bottom-0 flex transform-gpu items-center justify-center rounded-full [animation-delay:calc(var(--delay)*1000ms)]"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const OrbitingRightToLeft = ({
  classname,
  children,
}: {
  classname?: string;
  children?: ReactNode;
}) => {
  return (
    <div className={cn("h-[120px] w-fit", classname)}>
      <div className="relative flex h-[400px] w-[400px] -translate-y-[220px] transform items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none relative h-full w-full"
        >
          <circle
            className="stroke-foreground stroke-2"
            cx="50%"
            cy="0%"
            r={320}
            fill="none"
            strokeDasharray="6 6"
          />
        </svg>

        <div
          style={
            {
              "--start": 360 - 50,
              "--end": 360 + 50,
              "--duration": 5,
              "--radius": 295,
              "--delay": 0,
            } as React.CSSProperties
          }
          className={
            "animate-orbit absolute top-0 flex transform-gpu items-center justify-center rounded-full [animation-delay:calc(var(--delay)*1000ms)]"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};
