import Link from "next/link";
import React from "react";

interface ILinkButtonProps extends React.PropsWithChildren {
  href: string;
}

export default function LinkButton({ href, children }: ILinkButtonProps) {
  return (
    <div className="rounded-md ">
      <Link href={href}>
        <div className="ui-flex ui-w-full ui-items-center ui-justify-center ui-rounded-md ui-border ui-border-transparent ui-bg-white ui-px-8 ui-py-3 ui-text-base ui-font-medium ui-text-black ui-no-underline hover:ui-bg-gray-300 md:ui-px-10 md:ui-py-3 md:ui-text-lg md:ui-leading-6">
          {children}
        </div>
      </Link>
    </div>
  );
}
