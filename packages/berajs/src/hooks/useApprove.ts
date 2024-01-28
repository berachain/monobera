import { useState } from "react";

import { useCrocEnv } from "~/contexts/crocSwapEnvProvider";
import { useReceiptContext } from "~/contexts/receiptProvider";

export function useApprove() {
  const { crocEnv } = useCrocEnv();
  const { addPendingTx, addReceipt, addTransactionByType, removePendingTx } =
    useReceiptContext();
  const [isApprovalPending, setIsApprovalPending] = useState(false);

  const approve = async (tokenAddress: string, cb?: (b: boolean) => void) => {
    console.log("tokenAddress!!!!!!", tokenAddress);
    if (!crocEnv) return;
    try {
      setIsApprovalPending(true);
      const tx = await crocEnv.token(tokenAddress).approve();
      console.log("tx passed!!!!!!", tx);

      if (tx) addPendingTx(tx?.hash);
      if (tx?.hash)
        addTransactionByType({
          txHash: tx.hash,
          txType: "Approve",
          txDescription: `Approval of ${tokenAddress}`,
        });
      let receipt;
      try {
        if (tx) receipt = await tx.wait();
      } catch (e) {
        console.error({ e });
      }
      if (receipt) {
        addReceipt(JSON.stringify(receipt));
        removePendingTx(receipt.transactionHash);
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrrr");
      console.error({ error });
    } finally {
      setIsApprovalPending(false);
      cb && cb(true);
    }
  };

  return { approve, isApprovalPending };
}
