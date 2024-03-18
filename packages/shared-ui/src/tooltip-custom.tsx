"use client";

import { FC, PropsWithChildren, ReactNode, useMemo, useState } from "react";

type TooltipPosition =
  | "top-left"
  | "left"
  | "bottom-left"
  | "top-center"
  | "bottom-center"
  | "top-right"
  | "right"
  | "bottom-right"
  | "center";

/**
 * Shows a custom tooltip upon hover of the child component
 * @param tooltipContent - a string or a component that is placed in the content of the tooltip shown on hover
 * @param anchor - determines the position of the origin of the tooltip relative to the children
 * @param position - determines the tooltipContent's offset from the origin anchor
 */
export const TooltipCustom: FC<
  PropsWithChildren<{
    className?: string;
    tooltipContent?: string | ReactNode;
    anchor?: TooltipPosition;
    position?: TooltipPosition;
  }>
> = ({
  children,
  className,
  tooltipContent,
  anchor = "left",
  position = "bottom-left",
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipPositionStyle = useMemo(() => {
    let result = { transform: "translateX(-50%)" }; // bottom center
    switch (position) {
      case "top-left":
        result = {
          transform: "translateY(-100%)",
        };
        break;
      case "left":
        result = {
          transform: "translateY(-50%)",
        };
        break;
      case "bottom-left":
        result = {
          transform: "",
        };
        break;
      case "top-center":
        result = {
          transform: "translate(-50%,-100%)",
        };
        break;
      case "top-right":
        result = {
          transform: "translate(-100%, -100%)",
        };
        break;
      case "right":
        result = {
          transform: "translate(-100%,-50%)",
        };
        break;
      case "bottom-right":
        result = {
          transform: "translateX(-100%)",
        };
        break;
      case "center":
        result = {
          transform: "translate(-50%, -50%)",
        };
        break;
    }

    return result;
  }, [position]);

  const tooltipAnchorStyle = useMemo(() => {
    let result = { transform: "translateY(100%) translateX(50%)" }; // bottom center
    switch (anchor) {
      case "top-left":
        result = {
          transform: "",
        };
        break;
      case "left":
        result = {
          transform: "translateY(50%)",
        };
        break;
      case "bottom-left":
        result = {
          transform: "translateY(100%)",
        };
        break;
      case "top-center":
        result = {
          transform: "translateX(50%)",
        };
        break;
      case "top-right":
        result = {
          transform: "translateX(100%)",
        };
        break;
      case "right":
        result = {
          transform: "translateY(50%) translateX(100%)",
        };
        break;
      case "bottom-right":
        result = {
          transform: "translateY(100%) translateX(100%)",
        };
        break;
    }

    return result;
  }, [anchor]);

  const tooltipArrowStyle = useMemo(() => {
    // NOTE: Arrow positioning is not implement for all anchor/position combinations, feel free to implement your own
    let result: {
      className: null | string;
      transform: null | string;
    } = {
      className: null,
      transform: null,
    };
    if (anchor === "left" && position === "right") {
      result = {
        className: "items-center justify-end",
        transform: "translate(-13px,-9px) rotate(180deg)",
      };
    }
    if (anchor === "right" && position === "left") {
      result = {
        className: "items-center",
        transform: "translate(-3px,-25%)",
      };
    }
    if (anchor === "bottom-center" && position === "bottom-center") {
      result = {
        className: "justify-center items-start",
        transform: "translate(-9px,1px) rotate(-270deg)",
      };
    }
    if (anchor === "top-center" && position === "top-center") {
      result = {
        className: "justify-center items-end",
        transform: "translate(-3px,-17px) rotate(270deg)",
      };
    }
    return result;
  }, [anchor]);

  const TooltipArrow = () => {
    if (!tooltipArrowStyle.transform && !tooltipArrowStyle.className)
      return null;
    return (
      <div
        className={`absolute z-[999] flex h-full w-full ${
          tooltipArrowStyle.className ?? ""
        }`}
      >
        <div
          className="flex"
          style={{ transform: tooltipArrowStyle.transform ?? "" }}
        >
          <div
            className="border-1 z-[2] h-3 w-3 border bg-black"
            style={{
              transform: "translateY(20%) scaleX(1.3) rotate(45deg)",
            }}
          />
          <div
            className="z-[3] h-5 w-4 bg-black"
            style={{ transform: "translateX(-50%)" }}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="relative"
    >
      {/* Tooltip content container */}
      <div
        className={`${
          showTooltip ? "z-[999] opacity-100" : "z-[-1] opacity-0"
        } absolute flex h-full w-full ${className}`}
        style={{
          transform: tooltipAnchorStyle.transform,
          transition: "350ms",
        }}
        onMouseEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div
          className="border-1 relative h-fit w-fit p-2"
          style={{ transform: tooltipPositionStyle.transform }}
        >
          <TooltipArrow />
          <div className="rounded-md border bg-black p-4">{tooltipContent}</div>
        </div>
      </div>
      {/* Wrapped hover area */}
      <div className="z-1">{children}</div>
    </div>
  );
};
