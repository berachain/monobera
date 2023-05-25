import { useContext } from "react";

import { BeraConfigContext } from "./context";

const useBeraConfig = () => {
  const beraConfigContext = useContext(BeraConfigContext);

  if (beraConfigContext === undefined) {
    throw new Error("bera js context undefined");
  }

  return beraConfigContext;
};

export default useBeraConfig;
