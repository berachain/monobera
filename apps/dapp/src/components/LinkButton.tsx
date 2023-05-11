import Link from "next/link";
import React from "react";

interface ILinkButtonProps extends React.PropsWithChildren {
  href: string;
}

export default function LinkButton({ href, children }: ILinkButtonProps) {
  return (
    <div className="rounded-md ">
      <Link href={href}>
        <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-black no-underline hover:bg-gray-300 md:px-10 md:py-3 md:text-lg md:leading-6">
          {children}
        </div>
      </Link>
    </div>
  );
}
