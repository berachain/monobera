import { useContext } from "react";

import { CrocEnvContext } from "./context";

const useCroc = () => {
  const crocContext = useContext(CrocEnvContext);

  if (crocContext === undefined) {
    throw new Error("croc js context undefined");
  }

  return crocContext;
};

export default useCroc;
