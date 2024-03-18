import React from "react";
import { SSRSpinner } from "@bera/shared-ui";

export const LoadingContainer = ({
  style,
}: { style?: React.CSSProperties }) => {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center bg-background rounded-md "
      style={style}
    >
      <SSRSpinner
        size={12}
        className={"hidden dark:block rounded-md p-2 bg-background"}
        spinnerClassName="fill-white"
      />
      <SSRSpinner
        size={12}
        className={"block dark:hidden rounded-md p-2 bg-background"}
        spinnerClassName="fill-black"
      />
    </div>
  );
};
