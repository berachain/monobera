import { useEffect, useState } from "react";
import { useAddRecentTransaction, useBeraContractWrite, type IContractWrite } from "@bera/berajs";
import toast from "react-hot-toast";

interface IUseTxn {
  message?: string;
}

interface UseTxnApi {
  write: (props: IContractWrite) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

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
export const useTxn = ({ message = "" }: IUseTxn): UseTxnApi => {
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
      console.log(error);
      toast.remove(`loading-${identifier}`);
      toast.remove(`submission-${identifier}`);
      toast.error("Error!", {
        duration: 3000,
        id: `error-${identifier}`,
      });
    },

    /**
     * Success callback function executed when a transaction is successful.
     *
     * @param {string} result - The transaction hash or result.
     */
    onSuccess: (result) => {
      console.log(result);
      toast.remove(`submission-${identifier}`);
      toast.success("Success!", {
        duration: 3000,
        id: `success-${identifier}`,
      });
      addRecentTransaction({
        hash: result,
        description: message,
        timestamp: Date.now(),
      });
    },

    /**
     * Loading callback function executed when a transaction is loading or in progress.
     */
    onLoading: () => {
      toast.loading("Waiting for wallet action.", {
        icon: "⏳",
        id: `loading-${identifier}`,
      });
    },

    /**
     * Submission callback function executed when a transaction is submitted.
     */
    onSubmission: () => {
      toast.remove(`loading-${identifier}`);
      toast("Transaction submitted!", {
        icon: "⬆️",
        id: `submission-${identifier}`,
      });
    },
  });

  return { write, isLoading, isSuccess, isError };
};
