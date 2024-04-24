import { Icon } from "@bera/ui/icons";
import { type PropsWithChildren } from "react";
interface InfoBoxListProps extends PropsWithChildren {
  background?: string;
  rounded?: string;
  border?: string;
}

export const InfoBoxList = ({
  children,
  background = "bg-muted",
  rounded = "rounded-lg",
  border = "border",
}: InfoBoxListProps) => {
  return (
    <div
      className={`flex w-full flex-col gap-1 ${rounded} ${background} ${border} p-3`}
    >
      {children}
    </div>
  );
};

type InfoBoxListItemProps = {
  title: string;
  value: string | number | undefined | React.ReactNode;
  color?: string;
  children?: React.ReactNode;
  icon?: string;
};

export const InfoBoxListItem = ({
  title,
  value,
  color = "text-muted-foreground",
  children,
  icon,
}: InfoBoxListItemProps) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <p className="text-xs font-medium text-muted-foreground sm:text-sm w-full">
        {title}
      </p>
      <span
        className={`flex whitespace-nowrap text-right text-md font-medium w-full gap-2 max-w-[350px] truncate ${color}`}
      >
        {value} <img src={icon} alt="" />
      </span>
    </div>
  );
};
