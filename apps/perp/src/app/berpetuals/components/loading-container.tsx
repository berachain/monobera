import React from "react";
import { SSRSpinner } from "@bera/shared-ui";

export const LoadingContainer = () => {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full justify-center items-center rounded-md bg-background">
      <SSRSpinner
        size={12}
        className={"hidden bg-background p-2 dark:block"}
        spinnerClassName="fill-white"
      />
      <SSRSpinner
        size={12}
        className={"block bg-background p-2 dark:hidden"}
        spinnerClassName="fill-black"
      />
    </div>
  );
};
