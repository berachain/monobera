import { useState } from "react";
import {
  IContractWrite,
  TransactionActionType,
  useBgtUnstakedBalance,
  useUserValidatorsSubgraph,
} from "@bera/berajs";
import { useTxn } from "@bera/shared-ui";

export const useHandleConfirmation = () => {
  const { refresh } = useUserValidatorsSubgraph();
  const { refresh: refreshBalance } = useBgtUnstakedBalance();
  const [hasSubmittedTxn, setHasSubmittedTxn] = useState<
    Record<number, boolean>
  >({} as any);

  const {
    write: activateWrite,
    isLoading: isActivationLoading,
    ModalPortal: ActivateModalPortal,
  } = useTxn({
    message: "Activating queued BGT to Validator",
    actionType: TransactionActionType.DELEGATE,
    onSuccess: () => {
      setTimeout(() => {
        refresh();
        refreshBalance();
        setHasSubmittedTxn({} as any);
      }, 5000);
    },
  });

  const {
    write: cancelWrite,
    isLoading: isCancelLoading,
    ModalPortal: CancelModalPortal,
  } = useTxn({
    message: "Cancelling queued BGT to Validator",
    actionType: TransactionActionType.DELEGATE,
    onSuccess: () => {
      setTimeout(() => {
        refresh();
        refreshBalance();
        setHasSubmittedTxn({} as any);
      }, 5000);
    },
  });

  const handleTransaction = (
    index: number,
    isActivate: boolean,
    props: IContractWrite,
  ) => {
    setHasSubmittedTxn({ ...hasSubmittedTxn, [index]: true } as any);
    if (isActivate) {
      activateWrite(props);
    } else {
      cancelWrite(props);
    }
  };

  return {
    hasSubmittedTxn,
    setHasSubmittedTxn,
    activateWrite,
    isActivationLoading,
    ActivateModalPortal,
    cancelWrite,
    isCancelLoading,
    CancelModalPortal,
    handleTransaction,
  };
};
