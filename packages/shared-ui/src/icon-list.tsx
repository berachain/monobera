import React from "react";
import Image from "next/image";

interface IconsListProps {
  iconList: string[];
  size?: number;
  showCount?: number;
}

export function IconList({ iconList, size = 32, showCount }: IconsListProps) {
  const length = iconList.length;
  if (showCount && showCount < length) {
    iconList = iconList.slice(0, showCount);
  }

  return (
    <div className="ml-[5px] flex items-center">
      {iconList.map((icon, index) => (
        <Image
          key={index}
          width={size}
          height={size}
          src={icon}
          alt="icon"
          className="ml-[-5px]"
        />
      ))}
      {showCount && length > showCount && (
        <div className="ml-2 text-muted-foreground">+{length - showCount}</div>
      )}
    </div>
  );
}
