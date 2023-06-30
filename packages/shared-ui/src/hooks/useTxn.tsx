"use client";

import { useEffect, useState } from "react";
import {
  useAddRecentTransaction,
  useBeraContractWrite,
  type IContractWrite,
} from "@bera/berajs";
import toast from "react-hot-toast";

import { ErrorToast, LoadingToast, SubmissionToast, SuccessToast } from "../";

interface IUseTxn {
  message?: string;
  disableToast?: boolean;
  onSuccess?: (hash: string) => void;
  onError?: (e?: Error) => void;
  onLoading?: () => void;
  onSubmission?: (hash: string) => void;
}

interface UseTxnApi {
  write: (props: IContractWrite) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
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
export const useTxn = ({
  message = "",
  disableToast = false,
  onSuccess,
  onError,
  onLoading,
  onSubmission,
}: IUseTxn): UseTxnApi => {
  const [identifier, setIdentifier] = useState("");

  /**
   * Generate a unique identifier for the transaction based on the message.
   */
  useEffect(() => {
    setIdentifier(message + Math.random().toString(6));
  }, [message]);

  const addRecentTransaction = useAddRecentTransaction();

  const { write, isLoading, isSuccess, isError } = useBeraContractWrite({
    /**
     * Error callback function executed when a transaction encounters an error.
     *
     * @param {Error} error - The error object.
     */
    onError: (error) => {
      if (!disableToast) {
        const toastId = `error-${identifier}`;
        toast.remove(`loading-${identifier}`);
        toast.remove(`submission-${identifier}`);
        toast.custom(
          <ErrorToast
            title={"Transaction failed"}
            message={error?.message || "unknown error"}
            onClose={() => toast.remove(toastId)}
          />,
          {
            duration: DURATION,
            id: toastId,
          },
        );
      }
      onError && onError(error);
    },

    /**
     * Success callback function executed when a transaction is successful.
     *
     * @param {string} result - The transaction hash or result.
     */
    onSuccess: (result) => {
      if (!disableToast) {
        const toastId = `success-${identifier}`;
        toast.remove(`submission-${identifier}`);
        toast.custom(
          <SuccessToast
            onClose={() => toast.remove(toastId)}
            title={"Transaction Success"}
            message="transaction successfully submitted"
          />,
          {
            duration: DURATION,
            id: toastId,
          },
        );
      }
      addRecentTransaction({
        hash: result,
        description: message,
        timestamp: Date.now(),
      });
      onSuccess && onSuccess(result);
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
          },
        );
      }
      onLoading && onLoading();
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
          />,
          {
            id: toastId,
          },
        );
      }
      onSubmission && onSubmission(result);
    },
  });

  return { write, isLoading, isSuccess, isError };
};
