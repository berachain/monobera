import { useContext } from "react";

import { CrocEnvContext } from "./context";

const useCrocEnv = () => {
  const crocContext = useContext(CrocEnvContext);

  if (crocContext === undefined) {
    throw new Error("croc context undefined");
  }

  return crocContext;
};

export default useCrocEnv;
