"use client";

import {
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactElement,
} from "react";
import {
  useAddRecentTransaction,
  useOct,
  useOctContractWrite,
  useOctValueSend,
  type IContractWrite,
  type IValueSend,
  type TransactionActionType,
} from "@bera/berajs";
import toast from "react-hot-toast";
import { useMediaQuery } from "usehooks-ts";

import { ErrorToast, LoadingToast, SubmissionToast, SuccessToast } from "../";
import {
  ErrorModal,
  LoadingModal,
  SubmissionModal,
  SuccessModal,
} from "../txn-modals";
import {
  CLOSE_MODAL,
  OPEN_MODAL,
  initialState,
  modalReducer,
  type ModalName,
} from "../utils/modalsReducer";

interface IUseTxn {
  message?: string;
  actionType?: TransactionActionType;
  disableToast?: boolean;
  disableModal?: boolean;
  onSuccess?: (hash: string) => void;
  onError?: (e?: Error) => void;
  onLoading?: () => void;
  onSubmission?: (hash: string) => void;
}

interface UseTxnApi {
  write: (props: IContractWrite) => void;
  writeValueSend: (props: IValueSend) => void;
  isValueSendLoading: boolean;
  isValueSendSubmitting: boolean;
  isValueSendSuccess: boolean;
  isValueSendError: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  ModalPortal: ReactElement<any, any>;
}

const DURATION = 3000;

/**
 * @typedef {Object} IUseTxn
 * @property {string} [message] - The message to be displayed in the toast and transaction history.
 */

/**
 * @typedef {Object} UseTxnApi
 * @property {Function} write - Function to initiate a contract write operation.
 * @property {boolean} isLoading - Indicates if the transaction is currently loading.
 * @property {boolean} isSuccess - Indicates if the transaction was successful.
 * @property {boolean} isError - Indicates if the transaction encountered an error.
 */

/**
 * Custom React hook for handling transactions with toasts and transaction history.
 *
 * @param {IUseTxn} options - Options for the hook.
 * @returns {UseTxnApi} - An object containing transaction-related properties and functions.
 */
export const useOctTxn = ({
  message = "",
  actionType,
  disableToast = false,
  disableModal = false,
  onSuccess,
  onError,
  onLoading,
  onSubmission,
}: IUseTxn = {}): UseTxnApi => {
  const [identifier, setIdentifier] = useState("");
  const isMd = useMediaQuery("(min-width: 768px)");
  const { isOctReady } = useOct();

  const [modalState, dispatch] = useReducer(modalReducer, initialState);
  const openModal = (modalName: ModalName, modalData: any) => {
    dispatch({ type: OPEN_MODAL, modalName, modalData });
  };

  const closeModal = (modalName: ModalName) => {
    dispatch({ type: CLOSE_MODAL, modalName });
  };
  /**
   * Generate a unique identifier for the transaction based on the message.
   */
  useEffect(() => {
    setIdentifier(message + Math.random().toString(6));
  }, [message]);

  const addRecentTransaction = useAddRecentTransaction();

  const { write, isLoading, isSubmitting, isSuccess, isError } =
    useOctContractWrite({
      /**
       * Error callback function executed when a transaction encounters an error.
       *
       * @param {Error} error - The error object.
       */
      onError: (error: any) => {
        if (!disableToast) {
          const toastId = `error-${identifier}`;
          toast.remove(`loading-${identifier}`);
          toast.remove(`submission-${identifier}`);
          if (error?.message?.includes("User rejected the request.")) {
            toast.custom(
              <ErrorToast
                title={"User rejected transaction"}
                onClose={() => toast.remove(toastId)}
                hash={error?.hash}
              />,
              {
                duration: DURATION,
                id: toastId,
                position: isMd ? "bottom-right" : "top-center",
              },
            );
          } else {
            toast.custom(
              <ErrorToast
                title={"Transaction failed"}
                message={error?.message || "unknown error"}
                onClose={() => toast.remove(toastId)}
                hash={error?.hash}
              />,
              {
                duration: DURATION,
                id: toastId,
                position: isMd ? "bottom-right" : "top-center",
              },
            );
          }
        }
        if (!disableModal) {
          closeModal("loadingModal");
          closeModal("submissionModal");
          if (error?.message?.includes("User rejected the request.")) {
            openModal("errorModal", {
              errorHash: error?.hash ?? "0x",
              errorMessage: "User rejected transaction",
            });
          } else {
            openModal("errorModal", {
              errorHash: error?.hash ?? "0x",
              errorMessage:
                error?.message || "Something went wrong. Please Try Again.",
            });
          }
        }
        onError?.(error);
      },

      /**
       * Success callback function executed when a transaction is successful.
       *
       * @param {string} result - The transaction hash or result.
       */
      onSuccess: (result: string) => {
        if (!disableToast) {
          const toastId = `success-${identifier}`;
          toast.remove(`submission-${identifier}`);
          toast.custom(
            <SuccessToast
              onClose={() => toast.remove(toastId)}
              title={"Transaction Success"}
              message="transaction successfully submitted"
              hash={result}
            />,
            {
              duration: DURATION,
              id: toastId,
              position: isMd ? "bottom-right" : "top-center",
            },
          );
        }
        if (!disableModal) {
          closeModal("loadingModal");
          closeModal("submissionModal");
          openModal("successModal", { successHash: result });
        }
        addRecentTransaction({
          hash: result,
          description: message,
          timestamp: Date.now(),
          actionType,
        });
        onSuccess?.(result);
      },

      /**
       * Loading callback function executed when a transaction is loading or in progress.
       */
      onLoading: () => {
        if (!disableToast) {
          const toastId = `loading-${identifier}`;
          toast.custom(
            <LoadingToast
              title={"Submitting transaction"}
              message="waiting for submission"
              onClose={() => toast.remove(toastId)}
            />,
            {
              id: toastId,
              duration: Infinity,
              position: isMd ? "bottom-right" : "top-center",
            },
          );
        }
        if (!disableModal) {
          openModal("loadingModal", undefined);
        }
        onLoading?.();
      },

      /**
       * Submission callback function executed when a transaction is submitted.
       */
      onSubmission: (result: string) => {
        if (!disableToast) {
          const toastId = `submission-${identifier}`;
          toast.remove(`loading-${identifier}`);
          toast.custom(
            <SubmissionToast
              title={"Transaction submitted"}
              message="waiting for confirmation"
              onClose={() => toast.remove(toastId)}
              hash={result}
            />,
            {
              id: toastId,
              duration: Infinity,
              position: isMd ? "bottom-right" : "top-center",
            },
          );
        }
        if (!disableModal) {
          closeModal("loadingModal");
          openModal("submissionModal", {
            submissionHash: result,
          });
        }
        onSubmission?.(result);
      },
    });

  const {
    write: writeValueSend,
    isLoading: isValueSendLoading,
    isSubmitting: isValueSendSubmitting,
    isSuccess: isValueSendSuccess,
    isError: isValueSendError,
  } = useOctValueSend({
    /**
     * Error callback function executed when a transaction encounters an error.
     *
     * @param {Error} error - The error object.
     */
    onError: (error: any) => {
      if (!disableToast) {
        const toastId = `error-${identifier}`;
        toast.remove(`loading-${identifier}`);
        toast.remove(`submission-${identifier}`);
        if (error?.message.includes("User rejected the request.")) {
          toast.custom(
            <ErrorToast
              title={"User rejected transaction"}
              onClose={() => toast.remove(toastId)}
            />,
            {
              duration: DURATION,
              id: toastId,
              position: isMd ? "bottom-right" : "top-center",
            },
          );
        } else {
          toast.custom(
            <ErrorToast
              title={error?.message || "Transaction Failed"}
              message={error?.message || "unknown error"}
              onClose={() => toast.remove(toastId)}
              hash={error?.hash}
            />,
            {
              duration: DURATION,
              id: toastId,
              position: isMd ? "bottom-right" : "top-center",
            },
          );
        }
      }
      if (!disableModal) {
        closeModal("loadingModal");
        closeModal("submissionModal");
        if (error?.message.includes("User rejected the request.")) {
          openModal("errorModal", {
            errorHash: "0x",
            errorMessage: "User rejected transaction",
          });
        } else {
          openModal("errorModal", {
            errorHash: "0x",
            errorMessage: error?.message || "unknown error",
          });
        }
      }
      onError?.(error);
    },

    /**
     * Success callback function executed when a transaction is successful.
     *
     * @param {string} result - The transaction hash or result.
     */
    onSuccess: (result: string) => {
      if (!disableToast) {
        const toastId = `success-${identifier}`;
        toast.remove(`submission-${identifier}`);
        toast.custom(
          <SuccessToast
            onClose={() => toast.remove(toastId)}
            title={"Transaction Success"}
            message="transaction successfully submitted"
            hash={result}
          />,
          {
            duration: DURATION,
            id: toastId,
            position: isMd ? "bottom-right" : "top-center",
          },
        );
      }
      if (!disableModal) {
        closeModal("loadingModal");
        closeModal("submissionModal");
        openModal("successModal", { successHash: result });
      }
      // addRecentTransaction({
      //   hash: result,
      //   description: message,
      //   timestamp: Date.now(),
      // });
      onSuccess?.(result);
    },

    /**
     * Loading callback function executed when a transaction is loading or in progress.
     */
    onLoading: () => {
      if (!disableToast) {
        const toastId = `loading-${identifier}`;
        toast.custom(
          <LoadingToast
            title={"Waiting for wallet"}
            message="waiting for wallet action"
            onClose={() => toast.remove(toastId)}
          />,
          {
            id: toastId,
            duration: Infinity,
            position: isMd ? "bottom-right" : "top-center",
          },
        );
      }
      if (!disableModal) {
        openModal("loadingModal", undefined);
      }
      onLoading?.();
    },

    /**
     * Submission callback function executed when a transaction is submitted.
     */
    onSubmission: (result: string) => {
      if (!disableToast) {
        const toastId = `submission-${identifier}`;
        toast.remove(`loading-${identifier}`);
        toast.custom(
          <SubmissionToast
            title={"Transaction submitted"}
            message="waiting for confirmation"
            onClose={() => toast.remove(toastId)}
            hash={result}
          />,
          {
            id: toastId,
            position: isMd ? "bottom-right" : "top-center",
          },
        );
      }
      if (!disableModal) {
        closeModal("loadingModal");
        openModal("submissionModal", {
          submissionHash: result,
        });
      }
      onSubmission?.(result);
    },
  });
  const ModalPortal = () => {
    return (
      <>
        <ErrorModal
          title="Error"
          onClose={() => closeModal("errorModal")}
          open={modalState.errorModal?.isOpen ?? false}
          message={modalState.errorModal?.errorMessage}
          hash={modalState.errorModal?.errorHash}
        />
        <LoadingModal
          title="Waiting for wallet"
          onClose={() => closeModal("loadingModal")}
          open={modalState.loadingModal?.isOpen ?? false}
          message={message}
          hash={undefined}
        />
        <SubmissionModal
          title="Transaction submitted"
          onClose={() => closeModal("submissionModal")}
          open={modalState.submissionModal?.isOpen ?? false}
          message={message}
          hash={modalState.submissionModal?.submissionHash}
        />
        <SuccessModal
          title="Transaction Success"
          onClose={() => closeModal("successModal")}
          open={modalState.successModal?.isOpen ?? false}
          message={message}
          hash={modalState.successModal?.successHash}
        />
      </>
    );
  };
  const memoizedModalPortal = useMemo(
    () => (!isOctReady ? <ModalPortal /> : false),
    [isLoading, isSubmitting, isSuccess, isError, modalState],
  );

  return {
    write,
    writeValueSend,
    isValueSendLoading,
    isValueSendSubmitting,
    isValueSendSuccess,
    isValueSendError,
    isLoading,
    isSubmitting,
    isSuccess,
    isError,
    ModalPortal: memoizedModalPortal as ReactElement<any, any>,
  };
};
