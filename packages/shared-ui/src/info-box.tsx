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
};

export const InfoBoxListItem = ({
  title,
  value,
  color = "text-muted-foreground",
  children,
}: InfoBoxListItemProps) => {
  return (
    <div className="flex w-full flex-row justify-between">
      <p className="text-xs font-medium text-muted-foreground sm:text-sm w-full">
        {title}
      </p>
      <p
        className={`whitespace-nowrap text-right text-xs font-medium sm:text-sm w-full justify-end items-end max-w-[350px] truncate ${color}`}
      >
        {value}
      </p>
    </div>
  );
};
