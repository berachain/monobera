import { useContext } from "react";

import { BeraJsContext } from "./context";

const useBeraJs = () => {
  const beraJsContext = useContext(BeraJsContext);

  if (beraJsContext === undefined) {
    throw new Error("bera js context undefined");
  }

  return beraJsContext;
};

export default useBeraJs;
