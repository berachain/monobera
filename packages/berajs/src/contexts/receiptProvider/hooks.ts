import { useContext } from "react";

import { ReceiptContext } from "./context";

const useReceiptContext = () => {
  const receiptContext = useContext(ReceiptContext);

  if (receiptContext === undefined) {
    throw new Error("receipt context undefined");
  }

  return receiptContext;
};

export default useReceiptContext;
