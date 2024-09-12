import { cn } from "@bera/ui";
import { Fragment, MouseEventHandler } from "react";

export const Tabs = ({
  activeTab,

  tabs,
}: {
  activeTab: number;
  tabs: {
    title: string;
    disabled?: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }[];
}) => {
  return (
    <div className="">
      {tabs.map((tab, idx) => (
        <Fragment key={idx}>
          <button
            key={idx}
            role="tab"
            type="button"
            className={cn(
              "py-4 relative w-full text-left px-5 border border-border rounded-sm text-sm font-medium leading-none whitespace-nowrap overflow-hidden",
              activeTab === idx &&
                "before:content-[''] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1 before:h-full before:bg-info-foreground",
              tab.disabled
                ? "text-muted-foreground"
                : "text-muted-foreground hover:text-primary",
            )}
            onClick={tab.onClick}
            disabled={tab.disabled}
          >
            {tab.title}
          </button>
          {idx !== tabs.length - 1 && (
            <div className=" ml-1 h-4 border-r w-0.5 border-border" />
          )}
        </Fragment>
      ))}
    </div>
  );
};
