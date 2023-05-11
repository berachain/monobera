import React from "react";
import { PageHeading } from "./PageHeading";

export function PageContent({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <PageHeading title={title} />
      {children}
    </div>
  );
}
