import React from "react";
import { SSRSpinner } from "@bera/shared-ui";

export const LoadingContainer = ({
  style,
}: {
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center rounded-md bg-background "
      style={style}
    >
      <SSRSpinner
        size={12}
        className={"hidden rounded-md bg-background p-2 dark:block"}
        spinnerClassName="fill-white"
      />
      <SSRSpinner
        size={12}
        className={"block rounded-md bg-background p-2 dark:hidden"}
        spinnerClassName="fill-black"
      />
    </div>
  );
};
