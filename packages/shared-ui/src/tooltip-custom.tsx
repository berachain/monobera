import { FC, PropsWithChildren, ReactNode, useState } from "react";

/**
 * Shows a custom tooltip upon hover of the child component
 * @param tooltipContent - a string or a component that is placed in the content of the tooltip shown on hover
 */
export const TooltipCustom: FC<
  PropsWithChildren<{ className?: string; tooltipContent?: string | ReactNode }>
> = ({ children, className, tooltipContent }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="relative"
    >
      <div
        className={`${
          showTooltip ? "opacity-100" : "opacity-0"
        } absolute z-[999] flex h-full w-full justify-center pt-1 ${className}`}
        style={{
          transform: "translateY(100%)",
          transition: "350ms",
        }}
      >
        <div className="border-1 h-fit w-fit rounded-md border bg-black p-4">
          {tooltipContent}
        </div>
      </div>
      <div className="z-1">{children}</div>
    </div>
  );
};
